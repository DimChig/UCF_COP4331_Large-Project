import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import { CommentData } from "@/hooks/useMovies";

interface Props {
  data: CommentData;
}

const Review = ({ data }: Props) => {
  return (
    // <Card>
    //   <CardHeader>
    //     <CardTitle></CardTitle>
    //   </CardHeader>
    //   <CardContent></CardContent>
    //   <CardFooter></CardFooter>
    // </Card>
    <div>
      <h3 className="text-lg font-semibold">
        {`${data.author.firstName} ${data.author.lastName}`}
      </h3>
      <span>{data.createdAt.toLocaleDateString()}</span>
      <p>{data.text}</p>
      {/* API currently does not have the rating in the comment data. */}
      {
        /* {rating && */ <aside className="text-gray-400 flex flex-row items-center gap-0.5">
          {5}
          <FaStar className="width-20 height-20" />
        </aside>
      }
    </div>
  );
};

export default Review;
