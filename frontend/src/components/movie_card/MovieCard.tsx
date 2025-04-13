import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieData } from "@/hooks/useMovies";
import {
  FaBookmark,
  FaCommentDots,
  FaHeart,
  FaRegBookmark,
  FaRegHeart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RatingBadge from "./RatingBadge";

interface Props {
  movie: MovieData;
  isLiked?: boolean;
  isSaved?: boolean;
  className?: string;
}

export function formatDate(releaseDate: string): string {
  const date = new Date(releaseDate);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const MovieCard: React.FC<Props> = ({ movie, isLiked, isSaved, className }) => {
  const navigate = useNavigate();

  return (
    <Card
      className={`w-full min-w-[200px] shadow-md p-0 overflow-hidden gap-4 ${className}`}
    >
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
        <div className="absolute inset-0">
          <div
            className="group w-full aspect-[2/3] bg-transparent hover:bg-black/30 cursor-pointer transition"
            onClick={() => navigate(`/movies/${movie.id}`)}
          >
            <div className="flex opacity-0 group-hover:opacity-100 flex-col gap-8 w-full h-full items-center justify-center transition">
              {isLiked ? (
                <FaHeart className="w-8 h-8 text-rose-500" />
              ) : (
                <FaRegHeart className="w-8 h-8 text-white" />
              )}
              {isSaved ? (
                <FaBookmark className="w-8 h-8 text-yellow-400" />
              ) : (
                <FaRegBookmark className="w-8 h-8 text-white" />
              )}

              <FaCommentDots className="w-8 h-8 text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Header with title and release date */}
      <CardHeader className="px-3 pb-4 w-full">
        <CardTitle className="text-md font-bold truncate">
          {movie.title}
        </CardTitle>
        <CardDescription className="flex justify-between">
          <div>{formatDate(movie.release_date)}</div>
          <RatingBadge rating={movie.vote_average} />
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default MovieCard;
