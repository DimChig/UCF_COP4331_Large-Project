import { baseUrl, getAuthHeader, isAuthenticated } from "@/api/apiClient";
import { MoviePayload } from "@/hooks/useMovies";
import { useState } from "react";
import { toast } from "sonner";
import AuthDialog from "./AuthDialog";
import CommentsSection from "./CommentsSection";
import MovieCast from "./MovieCast";
import MovieInfoBanner from "./MovieInfoBanner";
import { useQueryClient } from "@tanstack/react-query";

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

  // Get the queryClient instance
  const queryClient = useQueryClient();

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

      // Invalidate queries with the key "userSettings" so that any components using them will refetch.
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
    } catch (error) {
      toast.error("Error liking movie:", { description: String(error) });
    }
  };

  return (
    <div className="flex flex-col w-full">
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
      <div className="flex flex-col py-8 px-4">
        <MovieCast moviePayload={moviePayload} />
      </div>
      <CommentsSection />
    </div>
  );
};

export default MovieDetailsContainer;
