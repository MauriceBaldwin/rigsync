import { isAxiosError } from 'axios';
import { useState } from 'react';
import { Link } from "react-router";

import { postGreeting } from '../api/greeting';
import type StandardError from '../api/standardError';

import '../styles/pages/Examples.css';

const Examples = () => {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState<string>();
  const [error, setError] = useState<string>();

  const onSubmit = async () => {
    setGreeting(undefined);
    setError(undefined);

    await postGreeting({ name: name })
      .then((response) => {
        setGreeting(response.data.greeting);
      })
      .catch((err: unknown) => {
        if (isAxiosError<StandardError>(err))
          setError(err.response?.data.message);
      });
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
      {error && <p>Error: {error}</p>}

      <div className='footer-link'>
        <Link to="/">Home</Link>
      </div>
    </>
  );
};

export default Examples;