import MovieCard from "@/components/movie_card/MovieCard";
import { useMoviesProfile } from "@/hooks/useMovies";
import MoviesGridContainer from "../movies/_components/MoviesGridContainer";
import MoviesGridSkeletons from "../movies/_components/MoviesGridSkeletons";

const ProfilePage = () => {
  const { data: moviesLiked, isLoading, error } = useMoviesProfile("liked");
  return (
    <div className="flex flex-col items-start p-6 w-full">
      <div className="flex gap-2">
        <div className="text-2xl font-semibold">Recently Liked Movies </div>
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
              {moviesLiked?.results.map((moviesLiked) => {
                return (
                  <MovieCard
                    movie={moviesLiked.movie_data}
                    key={moviesLiked.movie_data.id}
                    isLiked={moviesLiked.isLiked}
                    isSaved={moviesLiked.isSaved}
                  />
                );
              })}
              {/* Sentinel element for triggering next page fetch */}
            </MoviesGridContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
