import clsx from "clsx";

interface Props {
  genre: string;
  isActive: boolean;
}

const GenreBadge = ({ genre, isActive }: Props) => {
  return (
    <div
      className={clsx(
        "text-sm rounded-full py-1 px-3 cursor-pointer transition-all",
        {
          "border border-neutral-400 hover:bg-blue-200": !isActive,
          "border border-transparent bg-blue-400 text-white font-semibold":
            isActive,
        }
      )}
    >
      {genre}
    </div>
  );
};

export default GenreBadge;
