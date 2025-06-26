import { useState } from "react";
import { AxiosResponse, isAxiosError } from "axios";
import { StandardErrorResponse } from "../api/generated/models";

type Request<T> = () => Promise<AxiosResponse<T>>;

/**
 * Custom hook for making API requests.
 * @returns The response data, loading state, error message, and a function to
 * make requests.
 */
const useApi = <T>(): [
  T | undefined,
  boolean,
  string | undefined,
  (request: Request<T>) => void
] => {
  const [response, setResponse] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const makeRequest = (request: Request<T>) => {
    setResponse(undefined);
    setError(undefined);
    setIsLoading(true);

    void (async () => {
      try {
        await request()
          .then((response) => {
            setResponse(response.data);
            setIsLoading(false);
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

  return [
    response,
    isLoading,
    error,
    makeRequest,
  ];
};

export default useApi;