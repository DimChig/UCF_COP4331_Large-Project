import WriteComment from "./WriteComment";

const CommentsSection = () => {
  return (
    <div className="pl-8">
      <h2 className="text-3xl pt-4 pb-2 font-bold">Comments</h2>
      <WriteComment />
      {/* Comments go here. */}
    </div>
  );
};

export default CommentsSection;
