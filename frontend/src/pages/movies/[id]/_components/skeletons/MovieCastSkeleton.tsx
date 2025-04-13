import { Skeleton } from "@/components/ui/skeleton";
import MemberCardSkeleton from "./MemberCardSkeleton";
import FadeScrollArea from "@/pages/movies/_components/FadeScrollArea";

const MovieCastSkeleton = () => {
  return (
    <div className="flex w-full h-full flex-col gap-4">
      {/* Header Skeleton */}
      <Skeleton className="h-8 w-[160px]" />

      {/* Scroll Area with at least 10 skeleton member cards */}
      <FadeScrollArea>
        <div className="flex gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <MemberCardSkeleton key={index} />
          ))}
        </div>
      </FadeScrollArea>
    </div>
  );
};

export default MovieCastSkeleton;
