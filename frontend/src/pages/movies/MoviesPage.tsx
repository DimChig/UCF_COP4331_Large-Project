import { useSearchParams } from "react-router-dom";
import ErrorPage from "../error/ErrorPage";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get("sortBy") || "popularity.desc";
  const currentCategory = categories.find((c) => c.sortBy === currentFilter);
  if (!currentCategory) {
    return <ErrorPage />;
  }
  return (
    <div className="flex flex-col items-start p-6 w-full">
      <div className="text-2xl font-semibold">{currentCategory?.title}</div>
      <div className="flex w-full h-full gap-4">
        <div className="flex flex-col items-center py-4 ">
          <SortSelect currentFilter={currentFilter} />
        </div>
        <div className="grid grid-cols-4 w-full p-4 gap-4 bg-[green] h-fit">
          <div>Card1</div>
          <div>Card2</div>
          <div>Card3</div>
          <div>Card4</div>
          <div>Card5</div>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
