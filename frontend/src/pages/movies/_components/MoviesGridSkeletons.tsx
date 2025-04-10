import MovieCardSkeleton from "@/components/movie_card/MovieCardSkeleton";

const MoviesGridSkeletons = () => {
  return (
    <div className="grid grid-cols-4 w-full p-4 gap-4 h-fit">
      {Array.from({ length: 8 }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default MoviesGridSkeletons;
