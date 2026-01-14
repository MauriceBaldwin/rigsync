import { Typography, Container, Stack } from '@mui/material';
import RigSyncGoogleLoginButton
  from '../components/auth/RigSyncGoogleLoginButton';

const Home = () => {
  return (
    <Container>
      <Stack alignItems="center">
        <Typography variant="h1" gutterBottom color="primary">
          RigSync
        </Typography>

        <RigSyncGoogleLoginButton />
      </Stack>
    </Container>
  );
};

export default Home;