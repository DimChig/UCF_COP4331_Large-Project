import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieData } from "@/hooks/useMovies";
import { Badge } from "../ui/badge";

interface Props {
  movie: MovieData;
}

function formatReleaseDate(releaseDate: string): string {
  const date = new Date(releaseDate);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const getRatingBadgeColor = (rating: number): string => {
  if (rating >= 7) return "bg-green-500";
  if (rating >= 6) return "bg-lime-500";
  if (rating >= 5) return "bg-yellow-500";
  if (rating >= 4) return "bg-amber-500";
  if (rating >= 3) return "bg-orange-500";
  return "bg-red-500";
};

const MovieCard: React.FC<Props> = ({ movie }) => {
  const rating = movie.vote_average;
  // if (not loaded) return <MovieCardSkeleton />;
  return (
    <Card className="w-full shadow-md p-0 overflow-hidden gap-4">
      {/* Movie Poster */}
      <div className="relative w-full">
        <Skeleton className="w-full aspect-[2/3]" />
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            className="w-full object-cover"
          />
        </div>
      </div>

      {/* Header with title and release date */}
      <CardHeader className="px-3 pb-4">
        <CardTitle className="text-md font-bold">{movie.title}</CardTitle>
        <CardDescription className="flex justify-between">
          <div>{formatReleaseDate(movie.release_date)}</div>
          <Badge className={getRatingBadgeColor(rating)}>
            {rating.toFixed(1)}
          </Badge>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default MovieCard;
