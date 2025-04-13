import { MoviePayload } from "@/hooks/useMovies";
import MovieInfoBanner from "./MovieInfoBanner";
import { useState } from "react";

interface Props {
  moviePayload: MoviePayload;
  userSetting:
    | {
        isLiked: boolean;
        isSaved: boolean;
        rating: number | null;
      }
    | undefined;
}

const MovieDetailsContainer = ({ moviePayload, userSetting }: Props) => {
  const [isLiked, setIsLiked] = useState(userSetting?.isLiked || false);
  const [isSaved, setIsSaved] = useState(userSetting?.isSaved || false);
  const [rating, setRating] = useState(userSetting?.rating || 0);

  const onLiked = () => {
    console.log("Liked");
  };

  const onSaved = () => {
    console.log("Saved");
  };

  const onRatingChanged = (newRating: number) => {
    console.log("New rating:", newRating);
  };

  // const handleLike = async (): Promise<void> => {
  //   if (!isAuthenticated()) {
  //     toast.error("User not authenticated.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${baseUrl}/api/movies/${movieId}/like`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: getAuthHeader(),
  //       },
  //     });

  //     if (!response.ok) {
  //       toast.error("Failed to like the movie", {
  //         description: `Status: ${response.status} ${response.statusText}`,
  //       });
  //       return;
  //     }

  //     setIsLiked(!isLiked);
  //   } catch (error) {
  //     toast.error("Error liking movie:", { description: String(error) });
  //   }
  // };

  return (
    <MovieInfoBanner
      moviePayload={moviePayload}
      isLiked={isLiked}
      onLiked={onLiked}
      isSaved={isSaved}
      onSaved={onSaved}
      rating={rating}
      onRatingChanged={onRatingChanged}
    />
  );
};

export default MovieDetailsContainer;
