import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { type MovieData, type CommentData } from "./useMovies";
import { getAuthHeader, getAuthToken, baseUrl } from "@/api/apiClient";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

interface FetchResponseAllUserComments {
  results: { movie_data: MovieData; text: string; createdAt: Date }[];
  total_results: number;
}

interface FetchResponseMovieComments {
  results: CommentData[];
}

export const useMovieComments = (movieId: number) => {
  return useQuery<FetchResponseMovieComments>({
    queryKey: ["comments", movieId],
    queryFn: () => {
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: getAuthHeader(),
        },
      };

      return axiosInstance
        .get<FetchResponseMovieComments>(`/api/movies/${movieId}/comments`, config)
        .then((res) => res.data);
    },
    retry: 2,
  });
};

export const useCommentsProfile = () => {
  return useQuery<FetchResponseAllUserComments>({
    queryKey: ["comments", getAuthToken()],
    queryFn: () => {
      // Build the axios config to pass query parameters.
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: getAuthHeader(),
        },
      };

      // Pass the config object as the second argument to axiosInstance.get
      return axiosInstance
        .get<FetchResponseAllUserComments>(`/api/comments`, config)
        .then((res) => res.data);
    },
    retry: 2,
  });
};
