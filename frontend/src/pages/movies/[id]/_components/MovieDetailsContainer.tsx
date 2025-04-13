import { MoviePayload } from "@/hooks/useMovies";
import MovieInfoBanner from "./MovieInfoBanner";

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
  return (
    <MovieInfoBanner moviePayload={moviePayload} userSetting={userSetting} />
  );
};

export default MovieDetailsContainer;
