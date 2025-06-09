import { isAxiosError } from 'axios';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import {
  Button,
  Link,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';

import { postGreeting } from '../api/greeting';
import type StandardError from '../api/standardError';
import { getMainCanopies, type MainCanopy } from '../api/mainCanopy';

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
          setMainCanopies(response.data.items);
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
      <Typography variant="h1">Examples</Typography>
      <Typography variant="body1">
        Example implementations of commonly used features
      </Typography>

      <Typography variant="h2">API</Typography>
      <form action={onSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => { setName(e.target.value); }}
        />
        <Button type="submit">Submit</Button>
      </form>

      {greeting &&
        <Typography variant="body1">Greeting: {greeting}</Typography>}

      {greetingError &&
        <Typography variant="body1">Error: {greetingError}</Typography>}

      <Typography variant="h2">DB Query</Typography>
      <Button onClick={loadMainCanopies}>Load main canopies</Button>
      {mainCanopies &&
        <List>
          {mainCanopies.map(mainCanopy => (
            <ListItem key={mainCanopy.id}>
              <ListItemText>
                {mainCanopy.manufacturer} {mainCanopy.model} {mainCanopy.size}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      }
      {mainCanopiesError &&
        <Typography variant="body1">Error: {mainCanopiesError}</Typography>}

      <Link variant="body1" component={RouterLink} to="/">Home</Link>
    </>
  );
};

export default Examples;