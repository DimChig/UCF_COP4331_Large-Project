import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ReactNode } from "react";

interface Props {
  isGrid?: boolean;
  children: ReactNode;
}

const MoviesGridContainer = ({ children, isGrid = true }: Props) => {
  if (isGrid)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full p-4 gap-4 h-fit ">
        {children}
      </div>
    );
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-full p-4 pb-8 gap-4 h-fit">{children}</div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default MoviesGridContainer;
