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
  mainCanopies: MainCanopy[]
}

export const getMainCanopies = () =>
  axiosInstance.get<ListMainCanopiesResponse>(path);
