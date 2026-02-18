import { AxiosRequestConfig } from 'axios';
import {
  Stack,
  Typography,
} from '@mui/material';
import { customInstance } from '../../api/axiosInstance';
import { useEffect } from 'react';
import useApi from '../../hooks/useApi';

const Profile = () => {

  const {
    response,
    isLoading,
    error,
    makeRequest,
  } = useApi();

  const fetchProfile = (
    options?: AxiosRequestConfig,
  ) => {
    return customInstance(
      { url: `/auth-test`, method: 'GET' },
      options,
    );
  };

  useEffect(() => {
    makeRequest(fetchProfile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack spacing={4} alignItems="baseline">
      <Typography variant="h1" color="primary">My profile</Typography>

      {isLoading && <Typography>Loading...</Typography>}

      {error &&
        <Typography color="error">
          Error loading profile: {error}
        </Typography>
      }


      <Typography>{JSON.stringify(response)}</Typography>

    </Stack>
  );
};

export default Profile;