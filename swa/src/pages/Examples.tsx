import { isAxiosError } from 'axios';
import { useState } from 'react';
import { Link } from "react-router";

import { postGreeting } from '../api/greeting';
import type StandardError from '../api/standardError';
import { getUsers, type User } from '../api/users';

import '../styles/pages/Examples.css';

const Examples = () => {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState<string>();
  const [greetingError, setGreetingError] = useState<string>();
  const [users, setUsers] = useState<User[]>();
  const [usersError, setUsersError] = useState<string>();

  const onSubmit = async () => {
    setGreeting(undefined);
    setGreetingError(undefined);

    await postGreeting({ name: name })
      .then((response) => {
        setGreeting(response.data.greeting);
      })
      .catch((err: unknown) => {
        if (isAxiosError<StandardError>(err)) {
          setGreetingError(err.response?.data.message);
        }
      });
  };

  const loadUsers = () => {
    setUsers(undefined);
    setUsersError(undefined);

    void (async () => {
      await getUsers()
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((err: unknown) => {
          if (isAxiosError<StandardError>(err)) {
            setUsersError(err.response?.data.message);
          }
        });
    })();
  };

  return (
    <>
      <h1>Examples</h1>
      <p>
        Example implementations of commonly used features
      </p>

      <h2>API</h2>
      <form action={onSubmit}>
        <label>Name</label>
        <input value={name} onChange={(e) => { setName(e.target.value); }} />
        <button type="submit">Submit</button>
      </form>

      {greeting && <p>Greeting: {greeting}</p>}
      {greetingError && <p>Error: {greetingError}</p>}

      <h2>DB Query</h2>
      <button onClick={loadUsers}>Load users</button>
      {users &&
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      }
      {usersError && <p>Error: {usersError}</p>}



      <div className='footer-link'>
        <Link to="/">Home</Link>
      </div>
    </>
  );
};

export default Examples;