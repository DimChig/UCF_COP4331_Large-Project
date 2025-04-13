import WriteComment from "./WriteComment";
import Comment from "./Comment";
import { type CommentData } from "@/hooks/useMovies";
import { Card } from "@/components/ui/card";

interface Props {
  comments: CommentData[];
}

const CommentsSection = ({ comments }: Props) => {
  return (
    <div className="w-full px-6">
      <h2 className="text-2xl font-semibold pt-4 pb-2">Comments</h2>
      <div className="flex flex-col justify-center items-center">
        <Card className="w-full md:w-4/5 p-5">
          <WriteComment />
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
