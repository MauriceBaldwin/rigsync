import { useContext } from 'react';
import {
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import RigSyncAuthContext from '../../context/RigSyncAuthContext';
import RigSyncLogoutButton from '../../components/auth/RigSyncLogoutButton';
import RigSyncTitle from '../../components/RigSyncTitle';
import { returnHomeLink } from '../../components/links/links';

const Profile = () => {
  const authContext = useContext(RigSyncAuthContext);

  return (
    <Stack spacing={4} alignItems="baseline">
      <RigSyncTitle title="My profile" link={returnHomeLink} />

      <List>
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

        <ListItem>
          <Typography variant="body2" color="textSecondary">
            Id:&nbsp;
          </Typography>
          <Typography variant="body1">
            {authContext?.userId ?? 'unknown'}
          </Typography>
        </ListItem>
      </List>

      <RigSyncLogoutButton />
    </Stack>
  );
};

export default Profile;