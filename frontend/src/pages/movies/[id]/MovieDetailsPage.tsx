import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMovie } from "@/hooks/useMovies";
import ErrorPage from "@/pages/error/ErrorPage";
import { AlertCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import MovieDetailsContainer from "./_components/MovieDetailsContainer";

const MovieDetailsPage = () => {
  const params = useParams();

  if (!params.movieId || !parseInt(params.movieId)) return <ErrorPage />;

  const movieId = Number(params.movieId);

  const { data, isLoading, error } = useMovie(movieId);

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (!data || error) {
    return (
      <div className="flex w-full h-full mt-16 justify-center">
        <Alert variant="destructive" className="w-sm h-fit">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Movie details not found.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return <MovieDetailsContainer movie={data} />;
};

export default MovieDetailsPage;
