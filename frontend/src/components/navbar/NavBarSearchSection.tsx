import { Input } from "@/components/ui/input";
import { LuSearch } from "react-icons/lu";

const NavBarSearchSection = () => {
  const handleSearch = () => {
    alert("Searching");
  };

  return (
    <div className="hidden md:flex relative w-[300px] ">
      <Input
        type="text"
        className="w-full border-none text-black bg-navbar-foreground pr-8"
        placeholder="Search movie by title..."
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
