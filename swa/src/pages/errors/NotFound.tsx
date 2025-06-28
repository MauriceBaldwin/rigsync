import { Stack, Typography } from "@mui/material";
import { useLocation } from "react-router";

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <Stack spacing={4} alignItems="baseline">
      <Typography variant="h1" color="error">404 Not found</Typography>

      <Typography>Uh oh... Page {pathname} does not exist.</Typography>
    </Stack>
  );
};

export default NotFound;