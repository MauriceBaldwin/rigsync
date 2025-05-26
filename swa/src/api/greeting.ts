import axiosInstance from "./axiosInstance";

const path = 'greeting';

type GetGreetingResponse = {
  greeting: string
}

export const getGreeting = (name?: string) =>
  axiosInstance.get<GetGreetingResponse>(
    path,
    {
      params: {
        name: name,
      },
    });

type PostGreetingRequest = {
  name: string
}

type PostGreetingResponse = {
  greeting: string
}

export const postGreeting = (body: PostGreetingRequest) =>
  axiosInstance.post<PostGreetingResponse>(
    path,
    body,
  );
