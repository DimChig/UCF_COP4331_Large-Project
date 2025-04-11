import { useState } from "react";
import { Input } from "@/components/ui/input";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NavBarSearchSection = () => {
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
    <div className="hidden md:flex relative w-[300px]">
      <Input
        type="text"
        className="w-full border-none text-black bg-navbar-foreground pr-8"
        placeholder="Search movie by title..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown} // Trigger search on Enter key press.
      />
      <LuSearch
        size={16}
        className="text-navbar-background absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={handleSearch}
      />
    </div>
  );
};

export default NavBarSearchSection;
