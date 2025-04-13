import { ReactNode } from "react";
import FadeScrollArea from "./FadeScrollArea";

interface Props {
  isGrid?: boolean;
  children: ReactNode;
}

const MoviesGridContainer = ({ children, isGrid = true }: Props) => {
  if (isGrid)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full p-4 gap-4 h-fit">
        {children}
      </div>
    );
  return <FadeScrollArea>{children}</FadeScrollArea>;
};

export default MoviesGridContainer;
