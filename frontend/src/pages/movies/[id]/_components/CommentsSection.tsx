import Comment from "./Comment";
import WriteComment from "./WriteComment";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";

const ReviewSection = () => {
  return (
    <div className="pl-8">
      <h2 className="text-3xl pt-4 pb-2 font-bold">Comments</h2>
      <WriteComment />
      {/* Comments go here. */}
    </div>
  );
};

export default ReviewSection;
