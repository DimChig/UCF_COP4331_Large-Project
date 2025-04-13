import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";

const ButtonContainer = ({ children }: PropsWithChildren) => {
  return (
    <Button className="group bg-white/10 hover:bg-white text-black rounded-full w-10 h-10 cursor-pointer">
      {children}
    </Button>
  );
};

export default ButtonContainer;
