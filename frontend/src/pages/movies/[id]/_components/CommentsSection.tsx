import { baseUrl, getAuthHeader, isAuthenticated } from "@/api/apiClient";
import { Card } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import PostedComments from "./PostedComments";
import WriteComment from "./WriteComment";

interface Props {
  movieId: number;
}

const CommentsSection = ({ movieId }: Props) => {
  const queryClient = useQueryClient();

  const onComment = async (commentText: string) => {
    if (!isAuthenticated()) {
      toast.error("Only authorized users can post comments.");

      return;
    }

    try {
      const response = await fetch(
        `${baseUrl}/api/movies/${movieId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: getAuthHeader(),
          },
          body: JSON.stringify({ text: commentText }),
        }
      );

      if (!response.ok) {
        toast.error("Failed to post comment", {
          description: `API request failed with HTTP ${response.status} ${
            response.statusText
          }: ${JSON.parse(await response.text()).error}`,
        });
      }

      queryClient.invalidateQueries({ queryKey: ["comments"] });
    } catch (error) {
      toast.error("Error posting comment:", { description: String(error) });
    }
  };

  return (
    <div className="w-full px-6">
      <h2 className="text-2xl font-semibold pt-4 pb-2">Comments</h2>
      <div className="flex flex-col justify-center items-center">
        <Card className="w-full md:w-4/5 p-5">
          <PostedComments movieId={movieId} />
          <hr />
          <WriteComment onComment={onComment} />
        </Card>
      </div>
    </div>
  );
};

export default CommentsSection;
