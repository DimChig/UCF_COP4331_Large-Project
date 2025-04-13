import { toast } from "sonner";
import WriteComment from "./WriteComment";
import Comment from "./Comment";
import { type CommentData } from "@/hooks/useMovies";
import { baseUrl, getAuthHeader, isAuthenticated } from "@/api/apiClient";
import { Card } from "@/components/ui/card";

interface Props {
  comments: CommentData[];
  movieId: number;
}

const CommentsSection = ({ comments, movieId }: Props) => {
  const onComment = async (commentText: string) => {
    if (!isAuthenticated()) {
      toast.error("Only authorized users can post comments.");

      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/movies/${movieId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getAuthHeader(),
        },
        body: JSON.stringify({ text: commentText }),
      });

      if (!response.ok) {
        toast.error("Failed to post comment", {
          description: `API request failed with HTTP ${response.status} ${response.statusText}: ${
            JSON.parse(await response.text()).error
          }`,
        });
      }
    } catch (error) {
      toast.error("Error posting comment:", { description: String(error) });
    }
  };

  return (
    <div className="w-full px-6">
      <h2 className="text-2xl font-semibold pt-4 pb-2">Comments</h2>
      <div className="flex flex-col justify-center items-center">
        <Card className="w-full md:w-4/5 p-5">
          <WriteComment onComment={onComment} />
          <hr />
          {comments ? (
            comments.map((comment) => <Comment data={comment} />)
          ) : (
            <p className="text-gray-400 text-center text-lg">
              Its awfully empty here... Be the first one to post a coment!
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CommentsSection;
