import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { getAuthHeader, getAuthToken } from "@/api/apiClient";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
});

export interface MovieData {
  id: number;
  title: string;
  overview: string;
  tagline: string;
  popularity: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres:
    | {
        id: number;
        name: string;
      }[]
    | undefined;
  runtime: number;
}

export interface UserSettings {
  movieId: number;
  isLiked: boolean;
  isSaved: boolean;
  rating: number | null;
}

interface FetchResponseMovies {
  results: MovieData[];
  total_pages: number;
  total_results: number;
}

interface FetchResponseMoviesWithUserSettings {
  results: { movie_data: MovieData; isLiked: boolean; isSaved: boolean }[];
  total_pages: number;
  total_results: number;
}

interface FetchResponseAllUserComments {
  results: { movie_data: MovieData; text: string; createdAt: Date }[];
  total_results: number;
}

export const useInfiniteMovies = (sortBy: string, genres: string) =>
  useInfiniteQuery<FetchResponseMovies>({
    queryKey: ["movies", sortBy, genres],
    queryFn: ({ pageParam = 1 }) => {
      // Build the query parameters with the page argument
      const config = {
        params: { sortBy, genres, page: pageParam },
      };

      return axiosInstance
        .get<FetchResponseMovies>("/api/movies", config)
        .then((res) => res.data);
    },
    initialPageParam: 1,

    getNextPageParam: (lastPage, pages) => {
      // Assuming your API returns total_pages,
      // determine if there is another page to fetch.
      if (pages.length < lastPage.total_pages) {
        return pages.length + 1;
      }
      return undefined;
    },
    retry: 2,
  });

export const useInfiniteMoviesSearch = (query: string) =>
  useInfiniteQuery<FetchResponseMovies>({
    queryKey: ["movies", "search", query],
    queryFn: ({ pageParam = 1 }) => {
      const config: AxiosRequestConfig = {
        params: {
          query,
          page: pageParam,
        },
      };

      return axiosInstance
        .get<FetchResponseMovies>("/api/movies/search", config)
        .then((res) => res.data);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      // Check if there is a next page based on total_pages from your API response.
      if (pages.length < lastPage.total_pages) {
        return pages.length + 1;
      }
      return undefined;
    },
    retry: 2,
  });

export const useMovies = (endpoint: string) =>
  useQuery<FetchResponseMovies>({
    queryKey: ["movies", endpoint],
    queryFn: () => {
      // Build the axios config to pass query parameters.
      const config: AxiosRequestConfig = {
        params: {
          limit: 15,
        },
      };

      // Pass the config object as the second argument to axiosInstance.get
      return axiosInstance
        .get<FetchResponseMovies>(`/api/movies/${endpoint}`, config)
        .then((res) => res.data);
    },
    retry: 2,
  });

export interface MoviePayload {
  movie_data: MovieData;
  crew: {
    id: number;
    name: string;
    department: string;
    job: string;
    profile_path: string;
  }[];
  cast: {
    id: number;
    name: string;
    profile_path: string;
    character: string;
  }[];
  images: {
    file_path: string;
  }[];
  comments: {
    id: string;
    author: {
      firstName: string;
      lastName: string;
    };
    text: string;
    createdAt: Date;
    isMine: boolean;
  }[];
  similar: MovieData[];
}

export const useMovie = (movieId: number) =>
  useQuery<MoviePayload>({
    queryKey: ["movies", movieId],
    queryFn: () => {
      // Build the axios config to pass query parameters.
      const config: AxiosRequestConfig = {};

      // Pass the config object as the second argument to axiosInstance.get
      return axiosInstance
        .get<MoviePayload>(`/api/movies/${movieId}`, config)
        .then((res) => res.data);
    },
    retry: 2,
  });

export const useMoviesProfile = (endpoint: string) =>
  useQuery<FetchResponseMoviesWithUserSettings>({
    queryKey: ["movies", endpoint, getAuthToken()],
    queryFn: () => {
      // Build the axios config to pass query parameters.
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: getAuthHeader(),
        },
      };

      // Pass the config object as the second argument to axiosInstance.get
      return axiosInstance
        .get<FetchResponseMoviesWithUserSettings>(
          `/api/movies/${endpoint}`,
          config
        )
        .then((res) => res.data);
    },
    retry: 2,
  });

export const useUserSettings = () =>
  useQuery<UserSettings[]>({
    queryKey: ["userSettings", getAuthToken()],
    queryFn: () => {
      // Build the axios config to pass query parameters.
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: getAuthHeader(),
        },
      };

      // Pass the config object as the second argument to axiosInstance.get
      return axiosInstance
        .get<UserSettings[]>("/api/movies/raw", config)
        .then((res) => res.data);
    },
    staleTime: 0,
    retry: 2,
  });

export const useCommentsProfile = () =>
  useQuery<FetchResponseAllUserComments>({
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
