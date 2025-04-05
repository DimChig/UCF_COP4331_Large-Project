import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NavBarProfileSection = () => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default NavBarProfileSection;
