import { useContext } from 'react';
import { Button } from '@mui/material';
import RigSyncAuthContext from '../../context/RigSyncAuthContext';

const RigSyncLogoutButton = () => {
  const authContext = useContext(RigSyncAuthContext);

  return (
    <Button
      variant="outlined"
      color="primary"
      size="large"
      onClick={() => {
        void authContext?.logout();
      }}
    >
      Logout
    </Button>
  );
};

export default RigSyncLogoutButton;