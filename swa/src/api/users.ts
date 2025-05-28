import axiosInstance from "./axiosInstance";

const path = 'users';

export type User = {
  id: number
  name: string
}

type GetUsersResponse = {
  users: User[]
}

export const getUsers = () => axiosInstance.get<GetUsersResponse>(path);
