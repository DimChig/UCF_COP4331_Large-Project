import FadeScrollArea from "../../_components/FadeScrollArea";

interface Props {
  images: {
    file_path: string;
  }[];
}

const MovieMedia = ({ images }: Props) => {
  return (
    <div className="flex w-full h-full flex-col gap-4">
      <div className="text-2xl font-semibold">Media</div>
      <FadeScrollArea>
        <div className="w-full flex flex-nowrap gap-4">
          {images.map((image) => (
            <div key={image.file_path} className="min-w-[400px]">
              <img
                src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                alt={image.file_path}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </FadeScrollArea>
    </div>
  );
};

export default MovieMedia;
