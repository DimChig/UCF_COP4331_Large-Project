import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Props {
  name: string;
  character: string;
  photo: string;
}

const MemberCard = ({ name, character, photo }: Props) => {
  return (
    <Card className="w-[160px] p-0 gap-2 overflow-hidden">
      <CardHeader className="h-fit w-full p-0">
        <div className="w-full">
          <img
            src={`https://image.tmdb.org/t/p/original/${photo}`}
            className="h-full object-cover aspect-[4/5]"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-col gap-0 w-full">
          <span className="font-bold whitespace-break-spaces">{name}</span>
          <span className="text-sm whitespace-break-spaces">{character}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCard;
