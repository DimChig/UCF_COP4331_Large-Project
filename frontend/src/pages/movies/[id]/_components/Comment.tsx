import { CommentData } from "@/hooks/useComments";
import { FaStar } from "react-icons/fa";

interface Props {
  comment: CommentData;
}

const Review = ({ comment }: Props) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">
        {`${comment.author.firstName} ${comment.author.lastName}`}
      </h3>
      <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
      <p>{comment.text}</p>
      {/* API currently does not have the rating in the comment data. */}
      {
        /* {rating && */ <span className="text-gray-400 flex flex-row items-center gap-0.5">
          {5}
          <FaStar className="width-20 height-20" />
        </span>
      }
    </div>
  );
};

export default Review;
