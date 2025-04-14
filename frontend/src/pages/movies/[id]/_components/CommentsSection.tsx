import PostedComments from "./PostedComments";
import WriteComment from "./WriteComment";

interface Props {
  movieId: number;
}

const CommentsSection = ({ movieId }: Props) => {
  return (
    <div className="w-full px-6">
      <h2 className="text-2xl font-semibold pt-4 pb-2">Comments</h2>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full py-2">
          <PostedComments movieId={movieId} />
          <div className="w-full mt-8">
            <WriteComment movieId={movieId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
