import { useState } from "react";
import { CommentData } from "@/hooks/useComments";
import Comment from "./Comment";
import { Button } from "@/components/ui/button";

interface Props {
  comments: CommentData[];
  isLoading: boolean;
  error: Error | null;
}

const PostedComments = ({ comments, isLoading, error }: Props) => {
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
        <p className="text-start text-lg">
          We don't have any comments yet for this movie. Be the first one!
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
