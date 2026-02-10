import { Stack, Typography } from "@mui/material";

const Unauthorized = () => {
  return (
    <Stack spacing={4} alignItems="baseline">
      <Typography variant="h1" color="error">401 Unauthorized</Typography>

      <Typography>Uh oh... You must be logged in to view this page.</Typography>
    </Stack>
  );
};

export default Unauthorized;