import { formatDate } from "@/components/movie_card/MovieCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CommentData } from "@/hooks/useComments";
import { FaTrash } from "react-icons/fa";
import RatingStarsSimple from "./RatingStarsSimple";
import { baseUrl, getAuthHeader, isAuthenticated } from "@/api/apiClient";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";

interface Props {
  comment: CommentData;
}

const Review = ({ comment }: Props) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const deleteComment = async (commentId: string) => {
    if (!isAuthenticated()) return;
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: getAuthHeader(),
        },
      });

      if (!response.ok) {
        toast.error("Failed to delete comment", {
          description: `API request failed with HTTP ${response.status} ${
            response.statusText
          }: ${JSON.parse(await response.text()).error}`,
        });
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error("Error deleting comment:", { description: String(error) });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarFallback>
                {comment.author.firstName.charAt(0).toUpperCase()}
                {comment.author.lastName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-2">
                <div className="text-lg font-bold">
                  {`${comment.author.firstName} ${comment.author.lastName}`}
                </div>
                {comment.isMine && (
                  <div className="opacity-50 text-sm">(You)</div>
                )}
              </div>
              <div className="flex flex-row items-center gap-2">
                {comment.rating && (
                  <Badge className="text-xs text-white bg-transparent">
                    <RatingStarsSimple rating={comment.rating} />
                  </Badge>
                )}
                <div className="text-sm text-gray-500">
                  {`Written on ${formatDate(comment.createdAt.toString())}`}
                </div>
              </div>
            </div>
          </div>
          {comment.isMine && (
            <div className="flex flex-row items-center gap-2">
              {isLoading ? (
                <ImSpinner2 className="animate-spin" />
              ) : (
                <FaTrash
                  onClick={() => deleteComment(comment.id)}
                  className="w-4 h-4 cursor-pointer opacity-50 hover:opacity-100 hover:text-red-500"
                />
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="w-full overflow-hidden">
        <span className="w-full whitespace-normal break-words text-start">
          {comment.text}
        </span>
      </CardContent>
    </Card>
  );
};

export default Review;
