import { MovieData } from "@/hooks/useMovies";

interface Props {
  movie: MovieData;
}

const MovieDetailsContainer = ({ movie }: Props) => {
  return <div>{movie.title}</div>;
};

export default MovieDetailsContainer;
