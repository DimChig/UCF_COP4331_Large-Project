import { categories } from "@/pages/movies/MoviesPage";
import NavBarSelectDropdown from "./NavBarSelectDropdown";
import { Link } from "react-router-dom";

const NavBarDropdownSection = () => {
  const moviesOptions: { label: string; href: string }[] = categories.map(
    (category) => ({
      label: category.dropdownLabel,
      href: `/movies?sortBy=${category.sortBy}`,
    })
  );

  return (
    <div className="flex gap-6 items-center justify-center text-navbar-foreground">
      <Link
        to="/"
        className="mx-auto font-medium cursor-pointer text-lg whitespace-nowrap"
      >
        Home
      </Link>
      <NavBarSelectDropdown title="Movies" items={moviesOptions} />
    </div>
  );
};

export default NavBarDropdownSection;
