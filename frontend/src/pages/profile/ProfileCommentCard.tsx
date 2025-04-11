import { formatDate } from "@/components/movie_card/MovieCard";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieData } from "@/hooks/useMovies";
import { useNavigate } from "react-router-dom";

interface Props {
  movie: MovieData;
  text: string;
  createdAt: Date;
}

const ProfileCommentCard = ({ movie, text, createdAt }: Props) => {
  const navigate = useNavigate();
  return (
    <Card className="w-fit shadow-md p-0 overflow-hidden gap-4">
      <div className="flex justify-center">
        {/* Movie Poster */}
        <div className="relative w-16">
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
            ></div>
          </div>
        </div>
        {/* Right section with title and comment text */}
        <div className="flex flex-col gap-2 p-2">
          <div className="text-md opacity-30 font-normal truncate">
            {movie.title}
          </div>
          <div className="flex gap-1 px-2">
            <div className="text-md font-bold truncate">"{text}"</div>
          </div>
          <div className="w-full text-end text-xs opacity-20">
            {formatDate(String(createdAt))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCommentCard;
