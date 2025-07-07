import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? '';
const API_BASE_URL = `${BACKEND_URL}/api`;

const AXIOS_INSTANCE = Axios.create({
  baseURL: API_BASE_URL,
});

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const source = Axios.CancelToken.source();

  const promise = AXIOS_INSTANCE<T>({
    ...config,
    ...options,
    cancelToken: source.token,
  });

  // @ts-expect-error - Adding a cancel method to the promise
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};
