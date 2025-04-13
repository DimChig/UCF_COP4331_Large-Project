import MovieCard from "@/components/movie_card/MovieCard";
import { useMovies } from "@/hooks/useMovies";
import MoviesGridContainer from "@/pages/movies/_components/MoviesGridContainer";
import MoviesGridSkeletons from "@/pages/movies/_components/MoviesGridSkeletons";

interface Props {
  label: string;
  endpoint: string;
}

const MoviesHorizontalSection = ({ label, endpoint }: Props) => {
  const { data: movies, isLoading, error } = useMovies(endpoint);
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-2">
        <div className="text-2xl font-semibold">{label}</div>
      </div>
      <div className="flex w-full h-full gap-4 pt-4">
        <div className="flex w-full h-fit">
          {isLoading && <MoviesGridSkeletons isGrid={false} />}
          {error && (
            <div className="flex w-full h-full justify-center items-center text-xl text-red-500">
              {error.message}
            </div>
          )}
          {!isLoading && !error && (
            <MoviesGridContainer isGrid={false}>
              {movies?.results.map((movie) => {
                return (
                  <MovieCard
                    movie={movie.movie_data}
                    key={movie.movie_data.id}
                    isLiked={movie.isLiked}
                    isSaved={movie.isSaved}
                  />
                );
              })}
              {(!movies || !movies.results || movies.results.length == 0) && (
                <div>You haven't {endpoint} any movies yet.</div>
              )}
            </MoviesGridContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesHorizontalSection;
