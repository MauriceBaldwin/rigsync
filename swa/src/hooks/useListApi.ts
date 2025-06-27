import useApi, { UseApi } from "./useApi";

interface RigSyncListResponse<T> {
  page: number
  limit: number
  items: T[]
  count: number
}

export interface UseListApi<T> extends UseApi<RigSyncListResponse<T>> {
  append: (item: T) => void
}

/**
 * Custom hook for making list API requests.
 * A wrapper around useApi hook, adding some useful methods to update the list
 * data without making full new request.
 * @returns Everything from useApi, plus methods to update the list.
 */
const useListApi = <T>(): UseListApi<T> => {
  const api = useApi<RigSyncListResponse<T>>();

  const append = (item: T) => {
    api.setResponse((prevResponse) => {
      if (prevResponse) {
        return {
          page: prevResponse.page,
          limit: prevResponse.limit,
          items: [...prevResponse.items, item],
          count: prevResponse.count + 1,
        };
      }

      return {
        page: 1,
        limit: 1,
        items: [item],
        count: 1,
      };
    });
  };

  return {
    ...api,
    append,
  };
};

export default useListApi;