import { useSearchParams } from "react-router-dom";
import ErrorPage from "../error/ErrorPage";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get("sortBy") || "popularity.desc";
  const currentCategory = categories.find((c) => c.sortBy === currentFilter);
  if (!currentCategory) {
    return <ErrorPage />;
  }
  return (
    <div className="flex flex-col items-center p-6">
      <div className="text-2xl font-semibold">{currentCategory?.title}</div>
    </div>
  );
};

export default MoviesPage;
