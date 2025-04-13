import MovieCastSkeleton from "./MovieCastSkeleton";
import MovieInfoBannerSkeleton from "./MovieInfoBannerSkeleton";

const MovieDetailsContainerSkeleton = () => {
  return (
    <div className="flex flex-col w-full">
      <MovieInfoBannerSkeleton />
      <div className="flex flex-col py-8 px-4">
        <MovieCastSkeleton />
      </div>
    </div>
  );
};

export default MovieDetailsContainerSkeleton;
