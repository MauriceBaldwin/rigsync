import { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import {
  Button,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import { mainCanopyList } from '../api/generated/endpoints/main-canopy';
import { MainCanopyResponse } from '../api/generated/models/mainCanopyResponse';

const Examples = () => {
  const [mainCanopies, setMainCanopies] = useState<MainCanopyResponse[]>();
  const [mainCanopiesError, setMainCanopiesError] = useState<string>();

  const loadMainCanopies = () => {
    setMainCanopies(undefined);
    setMainCanopiesError(undefined);

    void (async () => {
      await mainCanopyList()
        .then((response) => {
          setMainCanopies(response.items);
        });
    })();
  };

  return (
    <>
      <Typography variant="h1">Examples</Typography>
      <Typography variant="body1">
        Example implementations of commonly used features
      </Typography>

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