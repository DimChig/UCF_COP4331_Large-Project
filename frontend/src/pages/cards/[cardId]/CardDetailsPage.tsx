import { useParams } from "react-router-dom";
import ErrorPage from "../../error/ErrorPage";
import InfoBanner from "./_components/InfoBanner";
import { isAuthenticated } from "@/api/apiClient";
import { useUserSettings } from "@/hooks/useMovies";
import { useInfiniteMoviesSearch, type MovieData, type UserSettings } from "@/hooks/useMovies";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const CardDetailsPage = () => {
  const { data: userSettings } = isAuthenticated() ? useUserSettings() : { data: [] };
  const movieId = Number(useParams().cardId) || -1;

  if (movieId < 0) {
    console.error("Failed to load cardId.", movieId);
    return <ErrorPage />;
  }

  const movieUserSettings = userSettings?.find((movie) => movie.movieId === movieId) ?? {
    //* Temp for testing
    isLiked: false,
    isSaved: false,
    movieId: 1,
    rating: 5,
  };

  if (!movieUserSettings) {
    console.error("Failed to load user data.");
    return <ErrorPage />;
  }

  const { isLiked, isSaved, rating } = movieUserSettings;

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
              poster_path: "/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg",
              backdrop_path: "",
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

  const movieData: MovieData = data?.pages?.[0].results?.[0];

  if (!movieData) {
    console.error("Failed to get movieData.", movieData);
    return <ErrorPage />;
  }

  return (
    <>
      <section>
        <InfoBanner movieData={movieData} isLiked={isLiked} isSaved={isSaved} rating={rating} />
      </section>
    </>
  );
};

export default CardDetailsPage;
