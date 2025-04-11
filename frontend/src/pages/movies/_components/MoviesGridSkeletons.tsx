import MovieCardSkeleton from "@/components/movie_card/MovieCardSkeleton";
import MoviesGridContainer from "./MoviesGridContainer";

const MoviesGridSkeletons = ({ isGrid }: { isGrid?: boolean }) => {
  return (
    <MoviesGridContainer isGrid={isGrid}>
      {Array.from({ length: 8 }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </MoviesGridContainer>
  );
};

export default MoviesGridSkeletons;
