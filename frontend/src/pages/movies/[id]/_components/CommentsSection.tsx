import { Card } from "@/components/ui/card";
import WriteComment from "./WriteComment";

const CommentsSection = () => {
  return (
    <div className="w-full px-6">
      <h2 className="text-2xl font-semibold pt-4 pb-2">Comments</h2>
      <div className="flex flex-col justify-center items-center">
        <Card className="w-full md:w-4/5 p-5">
          <WriteComment />
          <hr />
          {/* Comments go here. */}
        </Card>
      </div>
    </div>
  );
};

export default CommentsSection;
