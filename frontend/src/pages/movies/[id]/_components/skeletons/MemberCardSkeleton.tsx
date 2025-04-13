import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MemberCardSkeleton = () => {
  return (
    <Card className="w-[160px] p-0 gap-2 overflow-hidden">
      <CardHeader className="w-full p-0">
        <Skeleton className="w-full aspect-[4/5] rounded" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Skeleton className="h-4 w-3/4 rounded mb-1" />
        <Skeleton className="h-3 w-11/12 rounded" />
      </CardContent>
    </Card>
  );
};

export default MemberCardSkeleton;
