import { Link as RouterLink } from 'react-router';
import {
  Button,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

import { type MainCanopiesResponse, mainCanopyList } from '../api';
import useApi from '../api/useApi';

const Examples = () => {
  const [response, isLoading, error, makeRequest] =
    useApi<MainCanopiesResponse>();

  const fetchMainCanopies = () => {
    makeRequest(() => mainCanopyList());
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h1">Examples</Typography>

      <Typography variant="body1">
        Example implementations of commonly used features
      </Typography>

      <Typography variant="h2">DB Query</Typography>

      <Button
        variant="outlined"
        onClick={fetchMainCanopies}
        loading={isLoading}
      >
        Load main canopies
      </Button>

      {response &&
        <List>
          {response.items.map(mainCanopy => (
            <ListItem key={mainCanopy.id}>
              <ListItemText>
                {mainCanopy.manufacturer} {mainCanopy.model} {mainCanopy.size}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      }

      {error && <Typography variant="body1">Error: {error}</Typography>}

      <Link variant="body1" component={RouterLink} to="/">Home</Link>
    </Stack>
  );
};

export default Examples;