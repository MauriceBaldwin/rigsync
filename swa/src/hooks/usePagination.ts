import { useReducer } from "react";

export const DEFAULT_PAGE = 1;
export const PAGINATION_LIMITS = [5, 10, 25];
export const DEFAULT_LIMIT = PAGINATION_LIMITS[0];

export interface UsePagination {
  page: number
  limit: number
  setPage: React.ActionDispatch<[newPage: number]>
  setLimit: React.ActionDispatch<[newPage: number]>
}

/**
 * Reducer function to handle number updates. Ensures the number remains >= 1.
 * @param state - Current number.
 * @param newPage - New number to set.
 * @returns Updated number if valid, otherwise returns the current state.
 */
const positiveNonZeroReducer = (state: number, newPage: number): number => {
  if (newPage >= 1) {
    return newPage;
  }

  return state;
};

/**
 * Reducer function to handle number updates. Ensures number is within
 * PAGINATION_LIMITS.
 * @param state - Current number.
 * @param newLimit - New number to set.
 * @returns New limit if valid, otherwise the current state.
 */
const paginationLimitReducer = (state: number, newLimit: number): number => {
  if (PAGINATION_LIMITS.includes(newLimit)) {
    return newLimit;
  }

  return state;
};

/**
 * Custom hook for managing pagination state.
 * @returns The current page, limit, and functions to set them.
 */
const usePagination = (): UsePagination => {
  const [page, setPage] = useReducer(positiveNonZeroReducer, DEFAULT_PAGE);
  const [limit, _setLimit] = useReducer(paginationLimitReducer, DEFAULT_LIMIT);

  const setLimit = (newLimit: number) => {
    setPage(1);
    _setLimit(newLimit);
  };

  return {
    page,
    limit,
    setPage,
    setLimit,
  };
};

export default usePagination;