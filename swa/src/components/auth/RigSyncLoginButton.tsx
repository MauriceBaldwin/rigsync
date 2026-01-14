import { Button } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router';

interface RigSyncLoginButtonProps extends PropsWithChildren {
  authUrl: string
  icon?: React.ReactNode
}

const RigSyncLoginButton = ({
  children,
  authUrl,
  icon,
}: RigSyncLoginButtonProps) => {
  return (
    <Button
      variant="outlined"
      color="primary"
      size="large"
      component={Link}
      to={authUrl}
      startIcon={icon}
    >
      {children}
    </Button>
  );
};

export default RigSyncLoginButton;