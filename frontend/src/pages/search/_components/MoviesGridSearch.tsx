import PandaNoResults from "@/components/PandaNoResults";
import MovieCardSearch from "@/pages/search/_components/MovieCardSearch";
import { MovieData, UserSettings } from "@/hooks/useMovies";
import { useEffect, useRef } from "react";

interface Props {
  movies: MovieData[] | undefined;
  userSettings: UserSettings[] | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

const MoviesGridSearch = ({
  movies,
  userSettings,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Props) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // If the sentinel is visible and there is a next page, fetch it
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  if (!movies || movies.length === 0) {
    return <PandaNoResults />;
  }

  return (
    <div className="flex w-full h-full flex-col">
      <div className="flex flex-col w-full p-4 gap-4 h-fit ">
        {movies.map((movie) => {
          const userSetting = userSettings?.find((s) => s.movieId === movie.id);
          return (
            <MovieCardSearch
              movie={movie}
              key={movie.id}
              isLiked={userSetting?.isLiked}
              isSaved={userSetting?.isSaved}
            />
          );
        })}
        {/* Sentinel element for triggering next page fetch */}
      </div>
      {hasNextPage && (
        <div ref={loadMoreRef} className="w-full text-center py-4 opacity-70">
          {isFetchingNextPage ? (
            <div className="flex items-center justify-center gap-2 text-lg animate-pulse">
              Loading more...
            </div>
          ) : (
            <div className="text-lg">Scroll to load more</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MoviesGridSearch;
