import { formatDate } from "@/components/movie_card/MovieCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CommentData } from "@/hooks/useComments";
import { FaTrash } from "react-icons/fa";
import RatingStarsSimple from "./RatingStarsSimple";

interface Props {
  comment: CommentData;
}

const Review = ({ comment }: Props) => {
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
              <FaTrash className="w-4 h-4 cursor-pointer opacity-50 hover:opacity-100 hover:text-red-500" />
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
