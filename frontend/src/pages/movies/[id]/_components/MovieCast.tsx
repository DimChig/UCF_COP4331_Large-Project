import { MoviePayload } from "@/hooks/useMovies";
import MemberCard from "./MemberCard";
import FadeScrollArea from "../../_components/FadeScrollArea";

interface Props {
  moviePayload: MoviePayload;
}

const MovieCast = ({ moviePayload }: Props) => {
  if (!moviePayload || !moviePayload.cast || !moviePayload.cast.length)
    return null;
  return (
    <div className="flex w-full h-full flex-col gap-4">
      <div className="text-2xl font-semibold">Top Billed Cast</div>
      <FadeScrollArea>
        {moviePayload.cast.map((member) => {
          return (
            <MemberCard
              key={member.id}
              name={member.name}
              character={member.character}
              photo={member.profile_path}
            />
          );
        })}
      </FadeScrollArea>
    </div>
  );
};
export default MovieCast;
