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

  return (
    <MovieInfoBanner moviePayload={moviePayload} userSetting={userSetting} />
  );
};

export default MovieDetailsContainer;
