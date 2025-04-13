import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HomeSearchSection = () => {
  return (
    <div className="relative flex flex-col w-full gap-8 p-16 text-white z-1">
      {/* Background Image */}
      <img
        src="/pond.jpg"
        className="absolute inset-0 w-full h-full object-cover -z-20 top-"
      />
      {/* Tint Overlay */}
      <div className="absolute inset-0 bg-ucf-light opacity-60 -z-10" />
      <div className="absolute inset-0 bg-black opacity-50 -z-5" />

      <div className="flex flex-col gap-1">
        <div className="text-4xl font-bold">Welcome!</div>
        <div className="text-2xl font-semibold">
          Millions of movies, TV shows and people to discover. Explore now.
        </div>
      </div>
      <div className="flex w-full relative">
        <Input
          placeholder="Search any movie title..."
          className="bg-white rounded-full h-12 text-black pe-20"
        />
        <Button className="w-fit h-full rounded-full absolute right-0 bg-gradient-to-r from-ucf-dark to-ucf-light cursor-pointer">
          Search
        </Button>
      </div>
    </div>
  );
};

export default HomeSearchSection;
