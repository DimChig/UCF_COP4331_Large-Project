import { useState } from "react";
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

  const [isLiked, setIsLiked] = useState(movieUserSettings.isLiked);
  const [isSaved, setIsSaved] = useState(movieUserSettings.isSaved);
  const [rating, setRating] = useState(movieUserSettings.rating);

  const { data: movieData } = useMovies(movieId.toString());

  if (!movieData) {
    toast("Failed to laod movie data.");
    console.error("Failed to get movieData.", movieData);
    return <ErrorPage />;
  }

  const handleLike = async (): Promise<void> => {
    toast.info("Running like...");
    if (!isAuthenticated()) {
      toast.error("User not authenticated.");
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

      // if (!response.ok) {
      //   toast.error("Failed to like the movie", {
      //     description: `Status: ${response.status}: ${response.statusText}`,
      //   });
      //   return;
      // }

      setIsLiked(!isLiked);
    } catch (error) {
      toast.error("Error liking movie:", { description: String(error) });
    }
  };

  const handleSave = async (): Promise<void> => {
    setIsSaved(!isSaved);
  };

  return (
    <section className="w-full h-fit">
      <InfoBanner
        movieData={movieData as unknown as MovieData}
        isLiked={isLiked}
        onLiked={handleLike}
        isSaved={isSaved}
        onSaved={handleSave}
        rating={rating}
      />
    </section>
  );
};

export default CardDetailsPage;
