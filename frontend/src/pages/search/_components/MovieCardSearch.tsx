import {
  Card,
  CardDescription,
  CardFooter,
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
import { formatDate } from "../../../components/movie_card/MovieCard";

interface Props {
  movie: MovieData;
  isLiked?: boolean;
  isSaved?: boolean;
}

const MovieCardSearch: React.FC<Props> = ({ movie, isLiked, isSaved }) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full shadow-md p-0 overflow-hidden gap-4">
      {/* Movie Poster */}
      <div className="flex">
        <div className="relative w-fit">
          <Skeleton className="absolute h-full w-full rounded-none" />
          <div className="h-32 aspect-[2/3] rounded-none bg-none" />
          <div className="absolute inset-0">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              className="h-full object-cover"
            />
          </div>
          <div className="absolute inset-0">
            <div
              className="group w-full h-full bg-transparent hover:bg-black/30 cursor-pointer transition"
              onClick={() => navigate(`/movies/${movie.id}`)}
            >
              <div className="flex opacity-0 group-hover:opacity-100 flex-col gap-4 w-full h-full items-center justify-center transition">
                {isLiked ? (
                  <FaHeart className="w-5 h-5 text-rose-500" />
                ) : (
                  <FaRegHeart className="w-5 h-5 text-white" />
                )}
                {isSaved ? (
                  <FaBookmark className="w-5 h-5 text-yellow-400" />
                ) : (
                  <FaRegBookmark className="w-5 h-5 text-white" />
                )}

                <FaCommentDots className="w-5 h-5 text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        {/* Header with title and release date */}
        <div className="p-4 w-full">
          <div className="flex flex-col justify-between h-full">
            <div>
              <CardTitle className="text-lg font-bold truncate">
                {movie.title}
              </CardTitle>
              <CardDescription>
                <div>{formatDate(movie.release_date)}</div>
              </CardDescription>
            </div>
            <CardFooter className="p-0 pt-4 m-0 text-md">
              <div className="line-clamp-2">{movie.overview}</div>
            </CardFooter>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MovieCardSearch;
