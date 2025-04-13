import { Skeleton } from "@/components/ui/skeleton";

const MovieInfoBannerSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-fit z-10">
      <div className="relative w-full h-full overflow-hidden">
        {/* Backdrop skeleton */}
        <Skeleton className="absolute inset-0 w-full h-full object-cover transform scale-140" />

        <div className="flex flex-row p-8 gap-8 h-full w-full">
          {/* Left Column: Poster Skeleton */}
          <div className="relative min-w-[300px] aspect-2/3">
            <Skeleton className="w-full aspect-[2/3] rounded-lg" />
          </div>

          {/* Right Column: Content Skeleton */}
          <div className="flex flex-col flex-1 gap-5">
            {/* Header Title and Description Skeleton */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-8 w-3/4 mt-1" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            {/* Average Rating Skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-10 rounded-full" />
            </div>

            {/* Interactive Buttons Group Skeleton */}
            <div className="flex gap-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-[245px] h-10 rounded-full" />
            </div>

            {/* Tagline & Overview Skeleton */}
            <div className="flex flex-col gap-2 mt-1">
              <Skeleton className="h-4 w-1/5" />
              <Skeleton className="h-6 w-[89px]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Crew Members Skeleton */}
            <div className="grid grid-cols-3 gap-10 mt-4 mb-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div className="flex flex-col gap-2" key={n}>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoBannerSkeleton;
