import { isAuthenticated } from "@/api/apiClient";
import { useInfiniteMovies, useUserSettings } from "@/hooks/useMovies";
import { useSearchParams } from "react-router-dom";
import ErrorPage from "../error/ErrorPage";
import GenresSelect from "./_components/GenresSelect";
import MoviesGrid from "./_components/MoviesGrid";
import MoviesGridSkeletons from "./_components/MoviesGridSkeletons";
import SortSelect from "./_components/SortSelect";

export const categories: {
  title: string;
  dropdownLabel: string;
  sortBy: string;
}[] = [
  {
    dropdownLabel: "Popular",
    title: "Popular Movies",
    sortBy: "popularity.desc",
  },
  {
    dropdownLabel: "Top Rated",
    title: "Top Rated Movies",
    sortBy: "vote_average.desc",
  },
  {
    dropdownLabel: "Most Rated",
    title: "Most Rated Movies",
    sortBy: "vote_count.desc",
  },
  {
    dropdownLabel: "Recently Released",
    title: "Recently Released Movies",
    sortBy: "release_date.desc",
  },
  {
    dropdownLabel: "Most Revenue",
    title: "Most Revenue Movies",
    sortBy: "revenue.desc",
  },
];

const MoviesPage = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const currentSortFilter = searchParams.get("sortBy") || "popularity.desc";
  const currentCategory = categories.find(
    (c) => c.sortBy === currentSortFilter
  );
  if (!currentCategory) {
    return <ErrorPage />;
  }

  const currentGenreFilter = searchParams.get("genres") || "";

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMovies(currentSortFilter, currentGenreFilter);

  const { data: userSettings } = isAuthenticated()
    ? useUserSettings()
    : { data: [] };

  // Flatten the movies array from the infinite pages:
  const movies = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div className="flex flex-col items-start p-6 w-full">
      <div className="text-2xl font-semibold">{currentCategory?.title}</div>
      <div className="flex w-full h-full gap-4 pt-4">
        <div className="flex flex-col items-center gap-4 max-w-[270px] ">
          <SortSelect currentFilter={currentSortFilter} />
          <GenresSelect />
        </div>
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

export default MoviesPage;
