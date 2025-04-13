import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const HomeSearchSection = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchValue)}`);
    } else {
      toast.error("Please enter a search term");
    }
  };

  // Handle the key down event to trigger search when Enter is pressed.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

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
          Group 22 presents a world of films, TV shows, and captivating
          personalities.
        </div>
      </div>
      <div className="flex w-full relative">
        <Input
          placeholder="Search for a movie title..."
          className="bg-white rounded-full h-12 text-black pe-20"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          className="w-fit h-full rounded-full absolute right-0 bg-gradient-to-r from-ucf-dark to-ucf-light cursor-pointer"
          type="button"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default HomeSearchSection;
