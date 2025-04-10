import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MovieCardSkeleton = () => {
  return (
    <Card className="w-full shadow-md p-0 overflow-hidden gap-4">
      {/* Movie Poster */}
      <Skeleton className="w-full aspect-[2/3]" />

      {/* Header with title and release date */}
      <CardHeader className="px-3 pb-4">
        <CardTitle className="text-md font-bold">
          <Skeleton className="w-1/2 h-4 mt-1" />
        </CardTitle>
        <CardDescription className="flex justify-between">
          <Skeleton className="w-3/5 h-4 mt-1" />
          <Skeleton className="w-[38px] h-[22px]" />
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default MovieCardSkeleton;
