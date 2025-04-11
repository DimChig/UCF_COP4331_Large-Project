import { MovieData } from "@/hooks/useMovies";

interface Props {
  movie: MovieData;
  text: string;
  createdAt: Date;
}

const ProfileCommentCard = ({ movie, text, createdAt }: Props) => {
  return <div>{text}</div>;
};

export default ProfileCommentCard;
