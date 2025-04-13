import RatingBadge from "@/components/movie_card/RatingBadge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MoviePayload } from "@/hooks/useMovies";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import BannerHeaderDescription from "./BannerHeaderDescription";
import ButtonContainer from "./ButtonContainer";
import RatingStars from "./RatingStars";

interface Props {
  moviePayload: MoviePayload;
  isLiked: boolean;
  onLiked: () => void;
  isSaved: boolean;
  onSaved: () => void;
  rating: number | null;
  onRatingChanged: (newRating: number) => void;
}

const MovieInfoBanner = ({
  moviePayload,
  isLiked,
  onLiked,
  isSaved,
  onSaved,
  rating,
  onRatingChanged,
}: Props) => {
  const { movie_data: movie, crew } = moviePayload;
  return (
    <div className="flex flex-col w-full h-fit z-10">
      <div className="relative w-full h-full overflow-hidden">
        <div className="flex justify-end absolute inset-0 w-full h-full -z-50">
          <img
            src={`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}`}
            alt="Backdrop"
            className="absolute left-[20%] top-0 h-full w-full object-cover transform scale-140 z-10"
          />
          <div className="absolute w-full h-full bg-[linear-gradient(to_right,rgba(0,0,0,0.6)_calc(20%),rgba(0,0,0,0.5)_50%,rgba(0,0,0,0.5)_100%)] z-20"></div>{" "}
        </div>
        <div className="flex flex-row columns-2 p-8 gap-8 h-full w-full ">
          <div className="relative min-w-[300px] aspect-2/3">
            <Skeleton className="w-full aspect-[2/3] rounded-lg" />
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              className="absolute w-full object-cover inset-0 aspect-2/3 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <BannerHeaderDescription movie={movie} />

            <div className="flex flex-col gap-5 mt-3">
              <div className="flex  ">
                <span className="text-white inline-block font-semibold text-lg mr-2 align-top">
                  Average Rating:
                </span>
                <RatingBadge
                  rating={movie.vote_average}
                  voteCount={movie.vote_count}
                />
              </div>
              <div className="flex gap-4">
                <ButtonContainer onClick={onLiked}>
                  {isLiked ? (
                    <FaHeart className="min-w-5 min-h-5 text-rose-500" />
                  ) : (
                    <FaRegHeart className="min-w-5 min-h-5 text-white/60 group-hover:text-black transition" />
                  )}
                </ButtonContainer>
                <ButtonContainer onClick={onSaved}>
                  {isSaved ? (
                    <FaBookmark className="min-w-5 min-h-5 text-yellow-400" />
                  ) : (
                    <FaRegBookmark className="min-w-5 min-h-5 text-white/60 group-hover:text-black transition" />
                  )}
                </ButtonContainer>
                <Button className="group bg-white/10 hover:bg-white text-black rounded-full w-fit h-10 cursor-pointer">
                  <div className="text-white/60 group-hover:text-black transition">
                    Your Rating:
                  </div>
                  <RatingStars
                    initialValue={rating}
                    onRatingChanged={onRatingChanged}
                  />
                </Button>
              </div>
              <div className="flex flex-col gap-0 mb-2">
                <div className="italic text-white opacity-50">
                  {movie.tagline}
                </div>
                <div className="text-white font-bold text-xl mb-1">
                  Overview
                </div>
                <div className="text-white">{movie.overview}</div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {crew.map((member) => {
                  return (
                    <div className="flex flex-col gap-1" key={member.id}>
                      <div className="text-white font-bold">{member.name}</div>
                      <div className="text-white">{member.job}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoBanner;
