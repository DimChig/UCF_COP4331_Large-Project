import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CommentData } from "@/hooks/useComments";
import { FaStar } from "react-icons/fa";

interface Props {
  comment: CommentData;
}

const Review = ({ comment }: Props) => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">
          {`${comment.author.firstName} ${comment.author.lastName}`}
        </h3>
        <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
      </CardHeader>
      <CardContent>
        <p>{comment.text}</p>
        {comment.rating && (
          <span className="text-gray-400 flex flex-row items-center gap-0.5">
            {comment.rating}
            <FaStar className="width-20 height-20" />
          </span>
        )}
      </CardContent>
    </Card>
  );
};

export default Review;
