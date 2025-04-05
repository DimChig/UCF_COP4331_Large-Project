import NavBarDropdownSection from "./NavBarDropdownSection";
import NavBarLogo from "./NavBarLogo";
import NavBarProfileSection from "./NavBarProfileSection";
import NavBarSearchSection from "./NavBarSearchSection";

const NavBar = () => {
  return (
    <nav className="w-full bg-navbar-background flex gap-6 p-4 h-16 items-center justify-center">
      <div className="flex w-full max-w-7xl gap-2 justify-between">
        {/* Left group: logo and dropdowns */}
        <div className="flex gap-6 items-center justify-between">
          <NavBarLogo />
          <NavBarDropdownSection />
        </div>

        {/* Right: Search + Profile avatar */}
        <div className="flex gap-6 items-center justify-center">
          <NavBarSearchSection />
          <NavBarProfileSection />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
