import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MovieCardSkeletonSearch = () => {
  return (
    <Card className="w-full shadow-md p-0 overflow-hidden gap-4">
      {/* Movie Poster */}
      <div className="flex">
        <div className="relative">
          <Skeleton className="absolute h-full w-full rounded-none" />
          <div className="h-32 aspect-[2/3] rounded-none bg-none" />
        </div>

        <div className="p-4 w-full">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-2">
              <CardTitle className="text-lg font-bold truncate">
                <Skeleton className="w-64 h-4 mt-1" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="w-48 h-4 " />
              </CardDescription>
            </div>
            <CardFooter className="p-0 pt-4 m-0 text-md mt-2 mb-1">
              <div className="flex flex-col w-full gap-2">
                <Skeleton className="w-3/5 h-4" />
                <Skeleton className="w-full h-4" />
              </div>
            </CardFooter>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MovieCardSkeletonSearch;
