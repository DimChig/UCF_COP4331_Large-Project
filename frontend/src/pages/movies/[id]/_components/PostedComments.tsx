import { useState } from "react";
import { useMovieComments } from "@/hooks/useComments";
import Comment from "./Comment";
import { Button } from "@/components/ui/button";

interface Props {
  movieId: number;
}

const PostedComments = ({ movieId }: Props) => {
  const { data, isLoading, error } = useMovieComments(movieId);
  const comments = data?.results ?? [];
  const [showAll, setShowAll] = useState(false);

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Show only 3 comments when showAll is false, otherwise show all comments
  const displayedComments = showAll ? comments : comments.slice(0, 3);

  return (
    <div className="flex flex-col gap-4">
      {displayedComments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
      {comments.length === 0 && (
        <p className="text-gray-400 text-center text-lg">
          Its awfully empty here... Be the first one to post a comment!
        </p>
      )}
      {comments.length > 3 && (
        <Button
          variant="outline"
          className="rounded-lg cursor-pointer"
          onClick={() => setShowAll((prevState) => !prevState)}
        >
          {showAll ? "Show Less" : "Load More"}
        </Button>
      )}
    </div>
  );
};

export default PostedComments;
