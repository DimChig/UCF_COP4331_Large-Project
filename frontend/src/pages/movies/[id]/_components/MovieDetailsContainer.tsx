import RatingBadge from "@/components/movie_card/RatingBadge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieData } from "@/hooks/useMovies";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";

interface Props {
  movie: MovieData;
  userSetting:
    | {
        isLiked: boolean;
        isSaved: boolean;
        rating: number | null;
      }
    | undefined;
}

const MovieDetailsContainer = ({ movie, userSetting }: Props) => {
  return (
    <div className="flex flex-col w-full h-fit z-10">
      <div className="relative w-full h-full overflow-hidden">
        <div className="flex justify-end absolute inset-0 w-full h-full -z-50">
          {" "}
          <img
            src={`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}`}
            alt="Backdrop"
            className="absolute left-[20%] top-0 h-full w-full object-cover transform scale-140 z-10"
          />{" "}
          <div className="absolute w-full h-full bg-[linear-gradient(to_right,rgba(0,0,0,0.6)_calc(20%),rgba(0,0,0,0.5)_50%,rgba(0,0,0,0.5)_100%)] z-20"></div>{" "}
        </div>
        <div className="flex flex-row columns-2 p-7 pl-8 h-full w-full ">
          <div id="poster" className="relative min-w-[200px] mr-5 aspect-2/3">
            <Skeleton className="w-full aspect-[2/3]" />
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              className="absolute w-full object-cover inset-0 aspect-2/3"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white text-4xl font-extrabold mb-1">
              {movie.title}
              <span className="text-white opacity-50 text-3xl font-semibold">
                {` (${movie.release_date})`}
              </span>
            </h1>
            <p className="text-white">{movie.overview}</p>
            <div className="flex flex-col gap-5 mt-3">
              <div className="inline-flex h-fit">
                <span className="text-white inline-block font-semibold text-lg mr-2 align-top">
                  Average rating:{" "}
                </span>
                <RatingBadge
                  rating={movie.vote_average}
                  voteCount={movie.vote_count}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Button>
                  {userSetting?.isLiked ? (
                    <>
                      <FaHeart className="text-rose-500" /> Unlike
                    </>
                  ) : (
                    <>
                      <FaRegHeart className="text-white" /> Like
                    </>
                  )}
                </Button>
                <Button>
                  {userSetting?.isSaved ? (
                    <>
                      <FaBookmark className="text-yellow-400" /> Unsave
                    </>
                  ) : (
                    <>
                      <FaRegBookmark className="text-white" /> Save
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsContainer;
