import MovieCardSkeletonSearch from "@/pages/search/_components/MovieCardSkeletonSearch";

const MoviesGridSkeletonsSearch = () => {
  return (
    <div className="flex w-full h-full flex-col">
      <div className="flex flex-col w-full p-4 gap-4 h-fit ">
        {Array.from({ length: 8 }).map((_, index) => (
          <MovieCardSkeletonSearch key={index} />
        ))}
      </div>
    </div>
  );
};

export default MoviesGridSkeletonsSearch;
