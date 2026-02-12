import { useContext } from "react";
import { Link, Outlet } from "react-router";
import { Container, Stack, Typography } from "@mui/material";
import RigSyncPageLink from "../components/RigSyncPageLink";
import RigSyncUserProfile from "../components/auth/RigSyncUserProfile";
import RigSyncAuthContext from "../context/RigSyncAuthContext";
import RigSyncIcon from "../components/icons/RigSyncIcon";

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
            <Stack
              direction="row"
              alignItems="center"
              component={Link}
              to={"/"}
              sx={{ textDecoration: "none" }}
            >
              <RigSyncIcon />

              <Typography
                variant="overline"
                color="textPrimary"

              >
                Rig Sync
              </Typography>
            </Stack>

            {authContext?.userId &&
              <>
                <RigSyncPageLink
                  link={{
                    to: "/main-canopies",
                    title: "Main canopies",
                  }}
                />
                <RigSyncPageLink
                  link={{
                    to: "/reserve-canopies",
                    title: "Reserve canopies",
                  }}
                />
                <RigSyncPageLink
                  link={{
                    to: "/containers",
                    title: "Containers",
                  }}
                />
              </>
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