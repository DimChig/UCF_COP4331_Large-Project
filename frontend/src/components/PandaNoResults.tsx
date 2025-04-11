import pandaImage from "@/assets/panda.png";

const PandaNoResults = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center">
        <img src={pandaImage} alt="No movies" className="w-32" />
        <div className="mt-3">
          <h5>Oops! No movies found.</h5>
        </div>
      </div>
    </div>
  );
};

export default PandaNoResults;
