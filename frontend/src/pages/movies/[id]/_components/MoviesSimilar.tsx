import { MoviePayload } from "@/hooks/useMovies";
import FadeScrollArea from "../../_components/FadeScrollArea";
import MovieCard from "@/components/movie_card/MovieCard";

interface Props {
  moviePayload: MoviePayload;
}

const MoviesSimilar = ({ moviePayload }: Props) => {
  if (!moviePayload || !moviePayload.similar) return null;
  return (
    <div className="flex w-full h-full flex-col gap-4">
      <div className="text-2xl font-semibold">Similar Movies</div>
      <FadeScrollArea>
        <div className="w-full flex flex-nowrap gap-4">
          {moviePayload.similar.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </FadeScrollArea>
    </div>
  );
};

export default MoviesSimilar;
