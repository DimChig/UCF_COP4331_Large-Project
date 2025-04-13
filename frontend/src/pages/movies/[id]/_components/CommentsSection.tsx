import WriteComment from "./WriteComment";
import Comment from "./Comment";
import { Card } from "@/components/ui/card";

const CommentsSection = () => {
  return (
    <div className="w-full px-6">
      <h2 className="text-2xl font-semibold pt-4 pb-2">Comments</h2>
      <div className="flex flex-col justify-center items-center">
        <Card className="w-full md:w-4/5 p-5">
          <WriteComment />
          <hr />
          {/* Comments go here. */}
          <Comment username="John Doe" comment="This movie rocks!" rating={5} />
        </Card>
      </div>
    </div>
  );
};

export default CommentsSection;
