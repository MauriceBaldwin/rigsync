import { Typography, Stack, Grid } from '@mui/material';
import RigSyncCardLink from "../../components/RigSyncCardLink";

const AuthorisedContent = () => (
  <Stack alignItems="start">
    <Typography variant="h4" gutterBottom color="primary">
      Manage components
    </Typography>

    <Grid container spacing={2} justifyContent="center">
      <RigSyncCardLink
        title="Main Canopies"
        body="View, add and edit your main canopy inventory."
        to="/main-canopies"
      />
      <RigSyncCardLink
        title="Reserve Canopies"
        body="View, add and edit your reserve canopy inventory."
        to="/reserve-canopies"
      />
      <RigSyncCardLink
        title="Containers"
        body="View, add and edit your container inventory."
        to="/containers"
      />
      <RigSyncCardLink
        title="AADs"
        body="View, add and edit your AAD inventory."
        to="/aads"
      />
    </Grid>
  </Stack >
);

export default AuthorisedContent;