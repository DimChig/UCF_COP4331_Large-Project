import NavBarSelectDropdown from "./NavBarSelectDropdown";

const NavBarDropdownSection = () => {
  const moviesOptions = [
    { label: "Popular", href: "/movies/popular" },
    { label: "Top Rated", href: "/movies/top-rated" },
    { label: "Upcoming", href: "/movies/upcoming" },
  ];

  const tvShowsOptions = [
    { label: "Trending", href: "/tv/trending" },
    { label: "Airing Today", href: "/tv/airing-today" },
    { label: "Top Rated", href: "/tv/top-rated" },
  ];

  return (
    <div className="flex gap-6 items-center justify-center text-navbar-foreground">
      <NavBarSelectDropdown title="Movies" items={moviesOptions} />
      <NavBarSelectDropdown title="TV Shows" items={tvShowsOptions} />
    </div>
  );
};

export default NavBarDropdownSection;
