import { useMovie } from "@/hooks/useMovies";
import ErrorPage from "@/pages/error/ErrorPage";
import { useParams } from "react-router-dom";

const MovieDetailsPage = () => {
  const params = useParams();
  if (!params.movieId || !parseInt(params.movieId)) return <ErrorPage />;

  const movieId = Number(params.movieId);

  const { data, isLoading, error } = useMovie(movieId);

  return <div>{data?.title}</div>;
};

export default MovieDetailsPage;
