import { useParams } from "react-router-dom";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import ErrorPage from "../../error/ErrorPage";
import { isAuthenticated } from "@/api/apiClient";
import { useUserSettings } from "@/hooks/useMovies";
import RatingBadge from "@/components/movie_card/RatingBadge";
import { useInfiniteMoviesSearch } from "@/hooks/useMovies";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const CardDetailsPage = () => {
  const { data: userSettings } = isAuthenticated() ? useUserSettings() : { data: [] };
  const movieId = Number(useParams().cardId) || -1;

  if (movieId < 0) {
    console.error("Failed to load cardId.", movieId);
    return <ErrorPage />;
  }

  const movieUserSettings = userSettings?.find((movie) => movie.movieId === movieId);

  const { data, isLoading, error } = /*useInfiniteMoviesSearch(cardId) */ {
    data: {
      pages: [
        {
          results: [
            {
              id: 0,
              title: "Test Movie",
              overview: "Lorum ipsum",
              popularity: "amazing",
              poster_path: "",
              release_date: "2025",
              vote_average: 5,
              vote_count: 1000000,
            },
          ],
        },
      ],
    },
    isLoading: false,
    error: null,
  };

  const movieData = data?.pages?.[0].results?.[0];

  if (!movieData) {
    console.error("Failed to get movieData.", movieData);
    return <ErrorPage />;
  }

  return (
    <div id="movie-banner" className="flex flex-row columns-2 w-full h-fit bg-gray-400 p-4">
      <div id="poster" className="relative min-w-[200px] mr-5 aspect-2/3">
        <Skeleton className="w-full aspect-[2/3]" />
        <img
          src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
          alt={movieData.title}
          className="absolute w-full object-cover inset-0"
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-4xl font-extrabold mb-1">
          {movieData.title}
          <span className="text-gray-700 text-3xl font-semibold">{` ${movieData.release_date}`}</span>
        </h1>
        <p>{movieData.overview}</p>
        <div className="flex flex-col gap-5 mt-3">
          <div className="inline-flex h-fit">
            <span className="inline-block font-semibold text-lg mr-2 align-top">
              Average rating:{" "}
            </span>
            <RatingBadge rating={movieData.vote_average} />
          </div>
          <div className="flex flex-col gap-2">
            <Button>
              {movieUserSettings?.isLiked ? (
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
              {movieUserSettings?.isSaved ? (
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
  );
};

export default CardDetailsPage;
