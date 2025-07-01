import { useEffect, useState } from "react";
import { AxiosResponse, isAxiosError } from "axios";
import { StandardErrorResponse } from "../api/generated/models";
import useSuccessTimer from "./useSuccess";

type Request<T> = () => Promise<AxiosResponse<T>>;

export interface UseApi<T> {
  response: T | undefined,
  isLoading: boolean,
  error: string | undefined,
  showSuccess: boolean,
  makeRequest: (request: Request<T>, onSuccess?: (data: T) => void) => void
  setResponse: React.Dispatch<React.SetStateAction<T | undefined>>
}

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

  useEffect(() => {
    if (response && !error) setShowSuccess(true);
    else setShowSuccess(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, error]);

  const makeRequest = (request: Request<T>, onSuccess?: (data: T) => void) => {
    setResponse(undefined);
    setError(undefined);
    setIsLoading(true);

    void (async () => {
      try {
        await request()
          .then((response) => {
            setResponse(response.data);
            setIsLoading(false);

            if (onSuccess) onSuccess(response.data);
          });
      }
      catch (error) {
        if (isAxiosError<StandardErrorResponse>(error)) {
          setError(
            error.response?.data.message ||
            'The request failed. Check your network connection and try again.',
          );
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