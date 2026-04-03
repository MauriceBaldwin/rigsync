import { Typography, Stack, Grid, CircularProgress } from '@mui/material';
import RigSyncCardLink from "../../components/links/RigSyncCardLink";
import RigSyncRigCard from '../../components/RigSyncRigCard';
import { rigList, RigResponse } from '../../api';
import CreateForm from '../../components/forms/rig/CreateForm';
import RigSyncAddCard from '../../components/RigSyncAddCard';
import useListApi from '../../hooks/useListApi';
import { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import useSuccessTimer from '../../hooks/useSuccess';

const AuthorisedContent = () => {
  const { showSuccess, setShowSuccess } = useSuccessTimer();

  const {
    response,
    isLoading,
    error,
    makeRequest,
    append,
  } = useListApi<RigResponse>();


  const onCreate = (item: RigResponse) => {
    setShowSuccess(true);
    append(item);
  };

  const fetchRigs = () => {
    makeRequest(
      (options?: AxiosRequestConfig) => rigList(
        {
          page: 1,
          limit: 10, // todo: implement pagination
        },
        options,
      ));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchRigs, []);

  return (
    <Stack alignItems="start" spacing={6}>

      <Stack alignItems="start" spacing={2}>
        <Typography variant="h4" gutterBottom color="primary">
          Rigs
        </Typography>
        <Grid container spacing={2}>
          {isLoading && <CircularProgress />}

          {response?.items.map((rig) => (
            <RigSyncRigCard key={rig.id} rig={rig} />
          ))}

          {error &&
            <Typography variant="body1" color="error">
              Error: {error}
            </Typography>
          }

          <RigSyncAddCard entityName="rig" showSuccess={showSuccess} >
            <CreateForm onCreate={onCreate} />
          </RigSyncAddCard>
        </Grid>
      </Stack>

      <Stack alignItems="start" spacing={2}>
        <Typography variant="h4" gutterBottom color="primary">
          Components
        </Typography>

        <Grid container spacing={2}>
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
    </Stack>
  );
};

export default AuthorisedContent;
