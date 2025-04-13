import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";

interface Props {
  username: string;
  comment: string;
  rating: number | null;
}

const Review = ({ username, comment, rating }: Props) => {
  return (
    // <Card>
    //   <CardHeader>
    //     <CardTitle></CardTitle>
    //   </CardHeader>
    //   <CardContent></CardContent>
    //   <CardFooter></CardFooter>
    // </Card>
    <div>
      <h3 className="text-lg font-semibold">{username}</h3>
      <p>{comment}</p>
      {rating && (
        <aside className="text-gray-400 flex flex-row items-center gap-0.5">
          {rating}
          <FaStar className="width-20 height-20" />
        </aside>
      )}
    </div>
  );
};

export default Review;
