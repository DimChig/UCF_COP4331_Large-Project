import { useSearchParams } from "react-router-dom";
import MoviesGridSkeletons from "../movies/_components/MoviesGridSkeletons";
import { isAuthenticated } from "@/api/apiClient";
import { useMoviesSearch, useUserSettings } from "@/hooks/useMovies";
import MoviesGrid from "../movies/_components/MoviesGrid";

const SearchPage = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  if (!query || query.length == 0) {
    return <div className="text-2xl p-8">No search query provided</div>;
  }

  const { data, isLoading, error } = useMoviesSearch(query);

  const { data: userSettings } = isAuthenticated()
    ? useUserSettings()
    : { data: [] };

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
            <MoviesGrid movies={data?.results} userSettings={userSettings} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
