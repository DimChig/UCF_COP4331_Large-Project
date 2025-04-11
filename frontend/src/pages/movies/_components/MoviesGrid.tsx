import MovieCard from "@/components/movie_card/MovieCard";
import { MovieData, UserSettings } from "@/hooks/useMovies";
import pandaImage from "@/assets/panda.png";
import MoviesGridContainer from "./MoviesGridContainer";

interface Props {
  movies: MovieData[] | undefined;
  userSettings: UserSettings[] | undefined;
}

const MoviesGrid = ({ movies, userSettings }: Props) => {
  if (!movies || movies.length == 0)
    return (
      <div className="flex w-full h-full items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          <img src={pandaImage} className="w-32" />
          <div className="mt-3">
            <h5>Oops! No movies found.</h5>
          </div>
        </div>
      </div>
    );

  return (
    <MoviesGridContainer>
      {movies.map((movie) => {
        const userSetting = userSettings?.find((s) => s.movieId == movie.id);
        return (
          <MovieCard
            movie={movie}
            key={movie.id}
            isLiked={userSetting?.isLiked}
            isSaved={userSetting?.isSaved}
          />
        );
      })}
    </MoviesGridContainer>
  );
};

export default MoviesGrid;
