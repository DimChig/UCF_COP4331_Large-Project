import { useRef } from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "../../error/ErrorPage";
import InfoBanner from "./_components/InfoBanner";
import { isAuthenticated, getAuthHeader } from "@/api/apiClient";
import { useUserSettings } from "@/hooks/useMovies";
import { useMovies, type MovieData, type UserSettings } from "@/hooks/useMovies";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const baseUrl = "http://localhost:5173/";

const CardDetailsPage = () => {
  const { data: userSettings } = isAuthenticated() ? useUserSettings() : { data: [] };
  const movieId = Number(useParams().cardId) || -1;

  if (movieId < 0) {
    toast.error("Failed to load movie.");
    return <ErrorPage />;
  }

  const movieUserSettings = userSettings?.find((movie) => movie.movieId === movieId) ?? {
    isLiked: false,
    isSaved: false,
    movieId: movieId,
    rating: null,
  };

  // Here, we are using refs in order to not re-render the whole page when we
  // change a value. Since we only want the child info-bar to change, we just
  // pass it the new props, which forces only it to re-render. That way we can
  // easily update the database and change the ref value in a single function.
  const isLiked = useRef(movieUserSettings.isLiked);
  const isSaved = useRef(movieUserSettings.isSaved);
  const rating = useRef(movieUserSettings.rating);

  const handleLike = async (): Promise<void> => {
    toast.loading("Running like...");
    if (!isAuthenticated()) {
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/movies/${movieId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getAuthHeader(),
        },
      });

      if (!response.ok) {
        toast.error("Failed to like the movie");
      }

      isLiked.current = !isLiked.current;
    } catch (error) {
      toast.error("Error liking movie:", { description: String(error) });
    }
  };

  const handleSave = async (): Promise<void> => {
    isSaved.current = !isSaved.current;
  };

  const { data: movieData, isLoading, error } = useMovies(movieId.toString()); /* {
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
  };*/

  if (!movieData) {
    toast("Failed to laod movie data.");
    console.error("Failed to get movieData.", movieData);
    return <ErrorPage />;
  }

  return (
    <section className="w-full h-fit">
      <InfoBanner
        movieData={movieData as unknown as MovieData}
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
