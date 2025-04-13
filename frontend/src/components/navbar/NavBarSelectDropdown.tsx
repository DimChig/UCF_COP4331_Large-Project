import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  items: {
    label: string;
    href: string;
  }[];
}

const NavBarSelectDropdown = ({ title, items }: Props) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="mx-auto font-medium cursor-pointer text-lg whitespace-nowrap">
          {title}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        {items.map((item, index) => (
          <DropdownMenuItem asChild key={index}>
            <Link to={item.href} className="p-0 font-semibold">
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavBarSelectDropdown;
