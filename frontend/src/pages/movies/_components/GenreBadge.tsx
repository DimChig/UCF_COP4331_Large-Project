import clsx from "clsx";

interface Props {
  genre: string;
  isActive: boolean;
}

const GenreBadge = ({ genre, isActive }: Props) => {
  return (
    <div
      className={clsx("text-sm rounded-full py-1 px-3 cursor-pointer", {
        "border border-neutral-400 hover:bg-ucf-light": !isActive,
        "border border-ucf-dark bg-ucf-light text-balck font-semibold":
          isActive,
      })}
    >
      {genre}
    </div>
  );
};

export default GenreBadge;
