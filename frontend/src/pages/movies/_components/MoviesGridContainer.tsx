import { PropsWithChildren } from "react";

const MoviesGridContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full p-4 gap-4 h-fit ">
      {children}
    </div>
  );
};

export default MoviesGridContainer;
