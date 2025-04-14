import { Button } from "@/components/ui/button";
import { useMovieComments, useMovieCommentsSummary } from "@/hooks/useComments";
import { useState } from "react";
import { BsStars } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import AnimatedCard from "./AnimatedCard";
import PostedComments from "./PostedComments";
import WriteComment from "./WriteComment";

interface Props {
  movieId: number;
}

const CommentsSection = ({ movieId }: Props) => {
  const [isSummaryShown, setIsSummaryShown] = useState(false);
  const [isSummaryLoadingFake, setIsSummaryLoadingFake] = useState(false);
  const { data, isLoading, error } = useMovieComments(movieId);
  const comments = data?.results ?? [];

  const {
    data: summary,
    isLoading: isSummaryLoading,
    error: errorSummary,
  } = useMovieCommentsSummary(movieId);

  const handleShowSummary = async () => {
    setIsSummaryLoadingFake(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSummaryShown(true);
    setIsSummaryLoadingFake(false);
  };

  return (
    <div className="w-full px-6">
      <div className="flex items-center pt-4 pb-2 gap-4">
        <h2 className="text-2xl font-semibold ">Comments</h2>
        {!isLoading &&
          !error &&
          comments.length > 0 &&
          !isSummaryShown &&
          !errorSummary && (
            <Button
              className="w-[115px] gap-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-fuchsia-500 hover:to-violet-500 text-white transition-colors duration-300  cursor-pointer"
              onClick={handleShowSummary}
              disabled={isSummaryLoading || !summary}
            >
              {isSummaryLoadingFake ? (
                <ImSpinner2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <BsStars />
                  Summarize
                </>
              )}
            </Button>
          )}
      </div>
      {isSummaryShown && <AnimatedCard summary={summary} />}
      <div className="flex flex-col justify-center items-center">
        <div className="w-full py-2">
          <PostedComments
            comments={comments}
            isLoading={isLoading}
            error={error}
          />
          <div className="w-full mt-8">
            <WriteComment movieId={movieId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
