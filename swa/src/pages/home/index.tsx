import { useContext } from "react";
import { Typography, Container, Stack } from '@mui/material';
import RigSyncAuthContext from "../../context/RigSyncAuthContext";
import AuthorisedContent from './AuthorisedContent';
import UnauthorisedContent from './UnauthorisedContent';

const Home = () => {
  const authContext = useContext(RigSyncAuthContext);

  return (
    <Container>
      <Stack alignItems="center" spacing={8}>
        <Stack alignItems="center">
          <Typography variant="h1" color="primary" gutterBottom>
            RigSync
          </Typography>

          <Typography variant="body1">
            RigSync helps keep your rigs organised and jump-ready.
          </Typography>
          <Typography variant="body2">
            Because flight line isn&apos;t the place to discover paperwork
            problems.
          </Typography>
        </Stack>

        {authContext?.userId
          ? <AuthorisedContent />
          : <UnauthorisedContent />
        }

      </Stack>
    </Container>
  );
};

export default Home;