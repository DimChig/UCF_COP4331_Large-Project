import { Badge } from "@/components/ui/badge";

interface Props {
  rating: number;
  voteCount: number;
}

const RatingBadge = ({ rating, voteCount }: Props) => {
  if (voteCount == 0) return null;
  return (
    <Badge className={`rounded-full ${getRatingBadgeColor(rating)}`}>
      {rating.toFixed(1)}
    </Badge>
  );
};

const getRatingBadgeColor = (rating: number): string => {
  if (rating >= 7) return "bg-green-500";
  if (rating >= 6) return "bg-lime-500";
  if (rating >= 5) return "bg-yellow-500";
  if (rating >= 4) return "bg-amber-500";
  if (rating >= 3) return "bg-orange-500";
  return "bg-red-500";
};

export default RatingBadge;
