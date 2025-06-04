import axiosInstance from "./axiosInstance";

const path = 'main-canopy';

export type MainCanopy = {
  id: string
  manufacturer: string
  model: string
  size: number
  description: string | null
}

type ListMainCanopiesResponse = {
  items: MainCanopy[]
  page: number
  limit: number
  count: number
}

export const getMainCanopies = () =>
  axiosInstance.get<ListMainCanopiesResponse>(path);
