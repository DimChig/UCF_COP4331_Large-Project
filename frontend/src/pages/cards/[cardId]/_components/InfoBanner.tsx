import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { type MovieData } from "@/hooks/useMovies";
import RatingBadge from "@/components/movie_card/RatingBadge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  movieData: MovieData;
  isLiked: boolean;
  onLiked: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isSaved: boolean;
  onSaved: (event: React.MouseEvent<HTMLButtonElement>) => void;
  rating: number | null;
}

const imageUrlBase = "https://image.tmdb.org/t/p/original";

const InfoBanner: React.FunctionComponent<Props> = ({
  movieData,
  isLiked,
  onLiked,
  isSaved,
  onSaved,
  rating,
}) => {
  return (
    <div
      className={`w-full h-fit bg-cover bg-center bg-no-repeat bg-[url(${imageUrlBase}${movieData.backdrop_path})]`}
    >
      <div className="w-full h-full bg-linear-to-r from-black/100 from-10% md:from-5% to-black/80 to-40% md:to-25%">
        <div className="flex flex-row columns-2 p-7 pl-8 h-full w-full ">
          <div id="poster" className="relative min-w-[200px] mr-5 aspect-2/3">
            {/* <Skeleton className="w-full aspect-[2/3] bg-gray-800" /> */}
            <img
              src={`${imageUrlBase}${movieData.poster_path}`}
              alt={movieData.title}
              className="absolute w-full object-cover inset-0 z-10 aspect-2/3"
            />
          </div>
          <div className="flex flex-col">
            <div className="inline-flex gap-2">
              <h1 className="text-white text-4xl font-extrabold mb-1">{movieData.title}</h1>
              <h2 className="text-gray-500 text-3xl font-semibold">
                {`(${movieData.release_date})`}
              </h2>
            </div>
            <p className="text-white">{movieData.overview}</p>
            <div className="flex flex-col gap-5 mt-3">
              <div className="inline-flex h-fit">
                <span className="text-white inline-block font-semibold text-lg mr-2 align-top">
                  Average rating:{" "}
                </span>
                <RatingBadge rating={movieData.vote_average} voteCount={movieData.vote_count} />
              </div>
              <div className="flex flex-col gap-2">
                <Button onClick={onLiked} className="md:max-w-1/5">
                  {isLiked ? (
                    <>
                      <FaHeart className="text-rose-500" /> Unlike
                    </>
                  ) : (
                    <>
                      <FaRegHeart className="text-white" /> Like
                    </>
                  )}
                </Button>
                <Button onClick={onSaved} className="md:max-w-1/5">
                  {isSaved ? (
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

export default InfoBanner;
