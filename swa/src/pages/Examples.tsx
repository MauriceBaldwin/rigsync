import { isAxiosError } from 'axios';
import { useState } from 'react';
import { Link } from "react-router";

import { postGreeting } from '../api/greeting';
import type StandardError from '../api/standardError';
import { getMainCanopies, type MainCanopy } from '../api/mainCanopy';

import '../styles/pages/Examples.css';

const Examples = () => {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState<string>();
  const [greetingError, setGreetingError] = useState<string>();
  const [mainCanopies, setMainCanopies] = useState<MainCanopy[]>();
  const [mainCanopiesError, setMainCanopiesError] = useState<string>();

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

  const loadMainCanopies = () => {
    setMainCanopies(undefined);
    setMainCanopiesError(undefined);

    void (async () => {
      await getMainCanopies()
        .then((response) => {
          setMainCanopies(response.data.mainCanopies);
        })
        .catch((err: unknown) => {
          if (isAxiosError<StandardError>(err)) {
            setMainCanopiesError(err.response?.data.message);
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
      <button onClick={loadMainCanopies}>Load main canopies</button>
      {mainCanopies &&
        <ul>
          {mainCanopies.map(mainCanopy => (
            <li key={mainCanopy.id}>
              {mainCanopy.manufacturer} {mainCanopy.model} {mainCanopy.size}
            </li>
          ))}
        </ul>
      }
      {mainCanopiesError && <p>Error: {mainCanopiesError}</p>}



      <div className='footer-link'>
        <Link to="/">Home</Link>
      </div>
    </>
  );
};

export default Examples;