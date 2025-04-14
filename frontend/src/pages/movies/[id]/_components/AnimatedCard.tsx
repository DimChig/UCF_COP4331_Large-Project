import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TypewriterText from "./TypeWriter";
import { BsStars } from "react-icons/bs";

interface AnimatedCardProps {
  summary: string | undefined;
}

const AnimatedCard = ({ summary }: AnimatedCardProps) => {
  if (!summary) return null;
  return (
    <Card className="w-full gradient-border-rounded gap-0 mb-2">
      <CardHeader>
        <div className="flex gap-1">
          <BsStars className="text-purple-500" />
          <CardTitle className="pb-1 bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent font-bold">
            AI Summary
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <TypewriterText text={summary} />
      </CardContent>
    </Card>
  );
};

export default AnimatedCard;
