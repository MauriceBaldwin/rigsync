import { useContext } from "react";
import { Outlet } from "react-router";
import { Container, Stack, Typography } from "@mui/material";
import RigSyncPageLink from "../components/RigSyncPageLink";
import RigSyncAuthContext from "../context/RigSyncAuthContext";

const PageLayout = () => {
  const authContext = useContext(RigSyncAuthContext);

  return (
    <>
      <header>
        <Stack direction="row" alignItems="center" spacing={4}>
          <Typography variant="overline">Rig Sync</Typography>

          <RigSyncPageLink link={{ to: "/", title: "Home" }} />

          <RigSyncPageLink
            link={{
              to: "/main-canopies",
              title: "Main canopies",
            }}
          />

          <Typography variant="caption">
            UserId: {authContext?.userId ?? 'undefined'}
          </Typography>
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