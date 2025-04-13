import { useRef } from "react";
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

  // Here, we are using refs in order to not re-render the whole page when we
  // change a value. Since we only want the child info-bar to change, we just
  // pass it the new props, which forces only it to re-render. That way we can
  // easily update the database and change the ref value in a single function.
  const isLiked = useRef(movieUserSettings.isLiked);
  const isSaved = useRef(movieUserSettings.isSaved);
  const rating = useRef(movieUserSettings.rating);

  const handleLike = () => {
    isLiked.current = !isLiked.current;

    const response = fetch();
  };

  const handleSave = () => {
    isSaved.current = !isSaved.current;
  };

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
              backdrop_path: "/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg",
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
    <section className="w-full h-fit">
      <InfoBanner
        movieData={movieData}
        isLiked={isLiked.current}
        onLiked={handleLike}
        isSaved={isSaved.current}
        onSaved={handleSave}
        rating={rating.current}
      />
    </section>
  );
};

export default CardDetailsPage;
