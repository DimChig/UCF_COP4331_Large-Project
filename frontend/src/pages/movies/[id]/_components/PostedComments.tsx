import Comment from "./Comment";
import { type CommentData } from "@/hooks/useMovies";
import { useMovieComments } from "@/hooks/useComments";
import { baseUrl, getAuthHeader, isAuthenticated } from "@/api/apiClient";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  // comments: CommentData[] | undefined;
  movieId: number;
}

const PostedComments = ({ movieId }: Props) => {
  const { data, isLoading, error } = useMovieComments(movieId);
  const comments = data?.results ?? [];

  return (
    <div>
      {comments ? (
        comments.map((comment) => <Comment data={comment} />)
      ) : (
        <p className="text-gray-400 text-center text-lg">
          Its awfully empty here... Be the first one to post a coment!
        </p>
      )}
    </div>
  );
};

export default PostedComments;
