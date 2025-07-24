import { useContext, useState } from "react";
import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  isAxiosError,
} from "axios";
import { StandardErrorResponse } from "../api/generated/models";
import useSuccessTimer from "./useSuccess";
import RigSyncAuthContext from "../context/RigSyncAuthContext";

export type Request<T> = (options?: AxiosRequestConfig)
  => Promise<AxiosResponse<T>>;

export interface UseApi<T> {
  response: T | undefined,
  isLoading: boolean,
  error: string | undefined,
  showSuccess: boolean,
  makeRequest: (request: Request<T>, onSuccess?: (data: T) => void) => void
  setResponse: React.Dispatch<React.SetStateAction<T | undefined>>
}

const getAxiosErrorMessage = (
  error: AxiosError<StandardErrorResponse>,
): string => {
  if (error.response?.data.message) {
    return error.response.data.message;
  }

  switch (error.status) {
    case (401):
      return 'Authentication error. You must be logged in to take this action.';

    default:
      return 'The request failed. Check your network connection and try again.';
  }
};

/**
 * Custom hook for making API requests.
 * @returns The response data, loading state, error message, and a function to
 * make requests.
 */
const useApi = <T>(): UseApi<T> => {
  const [response, setResponse] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { showSuccess, setShowSuccess } = useSuccessTimer();
  const authContext = useContext(RigSyncAuthContext);

  const makeRequest = (request: Request<T>, onSuccess?: (data: T) => void) => {
    setResponse(undefined);
    setError(undefined);
    setIsLoading(true);

    const options: AxiosRequestConfig = {};
    if (authContext?.authToken) {
      options.headers = { 'X-ZUMO-AUTH': authContext.authToken };
    }

    void (async () => {
      try {
        await request(options)
          .then((response) => {
            setResponse(response.data);
            setIsLoading(false);
            setShowSuccess(true);

            if (onSuccess) onSuccess(response.data);
          });
      }
      catch (error) {
        if (isAxiosError<StandardErrorResponse>(error)) {
          setError(getAxiosErrorMessage(error));
        } else {
          setError('An unexpected error occurred.');
        }

        setIsLoading(false);
      }
    })();
  };

  return {
    response,
    isLoading,
    error,
    showSuccess,
    makeRequest,
    setResponse,
  };
};

export default useApi;