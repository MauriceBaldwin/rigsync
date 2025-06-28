import { Container, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router";
import RigSyncPageLink from "../components/RigSyncPageLink";

const PageLayout = () => {
  return (
    <>
      <header>
        <Stack direction="row" alignItems="center" spacing={4}>
          <Typography variant="overline">Rig Sync</Typography>

          <RigSyncPageLink
            to="/"
            title="Home"
          />

          <RigSyncPageLink
            to="/main-canopies"
            title="Main canopies"
          />
        </Stack>
      </header>

      <main>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </main>

      <footer>
        <Typography variant="body1">Built by Mo.</Typography>
      </footer>
    </>
  );
};

export default PageLayout;