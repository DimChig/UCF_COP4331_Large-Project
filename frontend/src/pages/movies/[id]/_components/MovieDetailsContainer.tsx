import { MoviePayload } from "@/hooks/useMovies";
import MovieInfoBanner from "./MovieInfoBanner";
import { useState } from "react";
import { baseUrl, getAuthHeader, isAuthenticated } from "@/api/apiClient";
import AuthDialog from "./AuthDialog";
import { toast } from "sonner";
import CommentsSection from "./CommentsSection";
import MovieCast from "./MovieCast";

interface Props {
  movieId: number;
  moviePayload: MoviePayload;
  userSetting:
    | {
        isLiked: boolean;
        isSaved: boolean;
        rating: number | null;
      }
    | undefined;
}

const MovieDetailsContainer = ({ movieId, moviePayload, userSetting }: Props) => {
  const [isLiked, setIsLiked] = useState(userSetting?.isLiked || false);
  const [isSaved, setIsSaved] = useState(userSetting?.isSaved || false);

  const [authDialogOpened, setAuthDialogOpened] = useState(false);

  const onLiked = () => {
    if (isLiked) {
      handleUpdate("like", "DELETE", {}, () => {
        setIsLiked(false);
      });
    } else {
      handleUpdate("like", "POST", {}, () => {
        toast.success("You liked this movie!");
        setIsLiked(true);
      });
    }
  };

  const onSaved = () => {
    if (isSaved) {
      handleUpdate("save", "DELETE", {}, () => {
        setIsSaved(false);
      });
    } else {
      handleUpdate("save", "POST", {}, () => {
        toast.success("You saved this movie!");
        setIsSaved(true);
      });
    }
  };

  const onRatingChanged = (newRating: number) => {
    if (newRating > 0) {
      handleUpdate("rating", "POST", { rating: newRating }, () => {
        toast.success("You rated this movie!");
      });
    } else {
      handleUpdate("rating", "DELETE", {}, () => {});
    }
  };

  const handleUpdate = async (
    endpoint: string,
    method: string,
    payload: {},
    callback: () => void
  ) => {
    if (!isAuthenticated()) {
      setAuthDialogOpened(true);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/movies/${movieId}/${endpoint}`, {
        method: method,
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: getAuthHeader(),
        },
      });

      if (!response.ok) {
        toast.error("Failed to like the movie", {
          description: `Status: ${response.status} ${response.statusText}`,
        });
        return;
      }

      callback();
    } catch (error) {
      toast.error("Error liking movie:", { description: String(error) });
    }
  };

  return (
    <>
      <AuthDialog isOpened={authDialogOpened} setOpened={setAuthDialogOpened} />
      <MovieInfoBanner
        moviePayload={moviePayload}
        isLiked={isLiked}
        onLiked={onLiked}
        isSaved={isSaved}
        onSaved={onSaved}
        rating={userSetting?.rating || 0}
        onRatingChanged={onRatingChanged}
      />
    </>
  );
};

export default MovieDetailsContainer;
