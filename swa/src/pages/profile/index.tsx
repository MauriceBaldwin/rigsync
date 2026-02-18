import { useContext } from 'react';
import {
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import RigSyncAuthContext from '../../context/RigSyncAuthContext';

const Profile = () => {
  const authContext = useContext(RigSyncAuthContext);

  return (
    <Stack spacing={4} alignItems="baseline">
      <Typography variant="h1" color="primary">My profile</Typography>

      <List>
        <ListItem>
          <Typography variant="body2" color="textSecondary">
            Id:&nbsp;
          </Typography>
          <Typography variant="body1">
            {authContext?.userId ?? '_'}
          </Typography>
        </ListItem>

        <ListItem>
          <Typography variant="body2" color="textSecondary">
            Name:&nbsp;
          </Typography>
          <Typography variant="body1">
            {authContext?.name ?? 'unknown'}
          </Typography>
        </ListItem>

        <ListItem>
          <Typography variant="body2" color="textSecondary">
            Email:&nbsp;
          </Typography>
          <Typography variant="body1">
            {authContext?.email ?? 'unknown'}
          </Typography>
        </ListItem>
      </List>
    </Stack>
  );
};

export default Profile;