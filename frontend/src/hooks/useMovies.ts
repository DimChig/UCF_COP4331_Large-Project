import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
});

export interface MovieData {
  id: number;
  title: string;
  overview: string;
  popularity: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

interface FetchResponseMovies {
  results: MovieData[];
  total_pages: number;
  total_results: number;
}

export const useMovies = (sortBy: string, genres: string) =>
  useQuery<FetchResponseMovies>({
    queryKey: ["movies", sortBy, genres],
    queryFn: () => {
      // Build the axios config to pass query parameters.
      const config: AxiosRequestConfig = {
        params: {
          sortBy, // same as sortBy: sortBy
          genres, // same as genres: genres
        },
      };

      // Pass the config object as the second argument to axiosInstance.get
      return axiosInstance
        .get<FetchResponseMovies>("/api/movies", config)
        .then((res) => res.data);
    },
    retry: 2,
  });
