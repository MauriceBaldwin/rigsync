import { AxiosRequestConfig } from 'axios';
import {
  Stack,
  Typography,
} from '@mui/material';
import { customInstance, customInstanceRoot } from '../../api/axiosInstance';
import { useEffect } from 'react';
import useApi from '../../hooks/useApi';

const Profile = () => {

  const {
    response: authTestResponse,
    isLoading: isAuthTestLoading,
    error: authTestError,
    makeRequest: makeAuthTestRequest,
  } = useApi();

  const {
    response: meResponse,
    isLoading: meIsLoading,
    error: meError,
    makeRequest: makeMeRequest,
  } = useApi();

  const fetchAuthTest = (
    options?: AxiosRequestConfig,
  ) => {
    return customInstance(
      { url: `/auth-test`, method: 'GET' },
      options,
    );
  };

  const fetchMe = (
    options?: AxiosRequestConfig,
  ) => {
    return customInstanceRoot(
      { url: `/.auth/me`, method: 'GET' },
      options,
    );
  };

  useEffect(() => {
    makeAuthTestRequest(fetchAuthTest);
    makeMeRequest(fetchMe);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack spacing={4} alignItems="baseline">
      <Typography variant="h1" color="primary">My profile</Typography>

      {isAuthTestLoading && <Typography>Loading auth test...</Typography>}

      {authTestError &&
        <Typography color="error">
          Error loading profile: {authTestError}
        </Typography>
      }

      <Typography>{JSON.stringify(authTestResponse)}</Typography>

      {meIsLoading && <Typography>Loading me...</Typography>}

      {meError &&
        <Typography color="error">
          Error loading me: {meError}
        </Typography>
      }

      <Typography>{JSON.stringify(meResponse)}</Typography>
    </Stack>
  );
};

export default Profile;