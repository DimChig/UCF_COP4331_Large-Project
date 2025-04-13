import { useCommentsProfile } from "@/hooks/useComments";
import MoviesGridContainer from "../movies/_components/MoviesGridContainer";
import ProfileCommentCard from "./ProfileCommentCard";

const CommentsSection = () => {
  const { data: comments, isLoading, error } = useCommentsProfile();
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-2">
        <div className="text-2xl font-semibold">Your Recent Comments</div>
      </div>
      <div className="flex w-full h-full gap-4 pt-4">
        <div className="flex w-full h-fit">
          {isLoading && <div>Loading...</div>}
          {error && (
            <div className="flex w-full h-full justify-center items-center text-xl text-red-500">
              {error.message}
            </div>
          )}
          {!isLoading && !error && (
            <MoviesGridContainer isGrid={false}>
              {comments?.results.map((comment) => {
                return (
                  <ProfileCommentCard
                    movie={comment.movie_data}
                    key={comment.movie_data.id}
                    text={comment.text}
                    createdAt={comment.createdAt}
                  />
                );
              })}
              {(!comments || !comments.results || comments.results.length == 0) && (
                <div>You haven't posted any comments yet.</div>
              )}
            </MoviesGridContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
