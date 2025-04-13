import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface Props {
  onClick: () => void;
  children: ReactNode;
}

const ButtonContainer = ({ onClick, children }: Props) => {
  return (
    <Button
      onClick={onClick}
      className="group bg-white/10 hover:bg-white text-black rounded-full w-10 h-10 cursor-pointer"
    >
      {children}
    </Button>
  );
};

export default ButtonContainer;
