import { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import { isAxiosError } from 'axios';
import {
  Button,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import {
  mainCanopyList,
  type MainCanopyResponse,
  type StandardErrorResponse,
} from '../api';

const Examples = () => {
  const [mainCanopies, setMainCanopies] = useState<MainCanopyResponse[]>();
  const [isLoadingMainCanopies, setIsLoadingMainCanopies] = useState(false);
  const [mainCanopiesError, setMainCanopiesError] = useState<string>();

  const loadMainCanopies = () => {
    setMainCanopies(undefined);
    setMainCanopiesError(undefined);
    setIsLoadingMainCanopies(true);

    void (async () => {
      try {
        await mainCanopyList()
          .then((response) => {
            setMainCanopies(response.data.items);
            setIsLoadingMainCanopies(false);
          });
      }
      catch (error) {
        if (isAxiosError<StandardErrorResponse>(error)) {
          setMainCanopiesError(
            error.response?.data.message ||
            'An error occurred while fetching main canopies',
          );
        } else {
          setMainCanopiesError('An unexpected error occurred');
        }

        setIsLoadingMainCanopies(false);
      }
    })();
  };

  return (
    <>
      <Typography variant="h1">Examples</Typography>
      <Typography variant="body1">
        Example implementations of commonly used features
      </Typography>

      <Typography variant="h2">DB Query</Typography>
      <Button
        onClick={loadMainCanopies}
        loading={isLoadingMainCanopies}
      >
        Load main canopies
      </Button>
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