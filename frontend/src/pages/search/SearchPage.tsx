import { isAuthenticated } from "@/api/apiClient";
import { useInfiniteMoviesSearch, useUserSettings } from "@/hooks/useMovies";
import { useSearchParams } from "react-router-dom";
import MoviesGrid from "../movies/_components/MoviesGrid";
import MoviesGridSkeletons from "../movies/_components/MoviesGridSkeletons";

const SearchPage = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  if (!query || query.length == 0) {
    return <div className="text-2xl p-8">No search query provided</div>;
  }

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMoviesSearch(query);

  const { data: userSettings } = isAuthenticated()
    ? useUserSettings()
    : { data: [] };

  const movies = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div className="flex flex-col items-start p-6 w-full">
      <div className="flex gap-2">
        <div className="text-2xl font-semibold">Search results for </div>
        <div className="text-2xl font-semibold text-blue-500 italic">
          {query}
        </div>
      </div>
      <div className="flex w-full h-full gap-4 pt-4">
        <div className="flex w-full">
          {isLoading && <MoviesGridSkeletons />}
          {error && (
            <div className="flex w-full h-full justify-center items-center text-xl text-red-500">
              {error.message}
            </div>
          )}
          {!isLoading && !error && (
            <MoviesGrid
              movies={movies}
              userSettings={userSettings}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
