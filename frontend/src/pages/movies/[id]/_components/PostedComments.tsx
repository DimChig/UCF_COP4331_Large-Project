import { useMovieComments } from "@/hooks/useComments";
import Comment from "./Comment";

interface Props {
  // comments: CommentData[] | undefined;
  movieId: number;
}

const PostedComments = ({ movieId }: Props) => {
  //TODO CHANGE TO movieId
  const { data, isLoading, error } = useMovieComments(1);
  const comments = data?.results ?? [];

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
      {comments.length === 0 && (
        <p className="text-gray-400 text-center text-lg">
          Its awfully empty here... Be the first one to post a coment!
        </p>
      )}
    </div>
  );
};

export default PostedComments;
