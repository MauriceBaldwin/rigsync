import { useContext } from "react";
import { Link, Outlet } from "react-router";
import { Container, Stack, Typography } from "@mui/material";
import RigSyncPageLink from "../components/RigSyncPageLink";
import RigSyncUserProfile from "../components/auth/RigSyncUserProfile";
import RigSyncAuthContext from "../context/RigSyncAuthContext";

const PageLayout = () => {
  const authContext = useContext(RigSyncAuthContext);

  return (
    <>
      <header>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={4} >
            <Typography
              variant="overline"
              color="textPrimary"
              component={Link}
              to={"/"}
              sx={{ textDecoration: "none" }}
            >
              Rig Sync
            </Typography>

            {authContext?.userId &&
              <RigSyncPageLink
                link={{
                  to: "/main-canopies",
                  title: "Main canopies",
                }}
              />
            }

          </Stack>

          <RigSyncUserProfile />
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