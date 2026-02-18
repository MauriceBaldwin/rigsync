import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import RigSyncAuthContext from '../../context/RigSyncAuthContext';

const RigSyncLogoutButton = () => {
  const authContext = useContext(RigSyncAuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    setIsLoading(true);
    void authContext?.logout();
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      size="large"
      loading={isLoading}
      onClick={logout}
    >
      Logout
    </Button>
  );
};

export default RigSyncLogoutButton;