import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col w-full h-full bg-[red]">
        <NavBar />
        <div className="flex h-full min-h-screen w-full justify-center bg-neutral-100 ">
          <div className="flex w-full max-w-screen xl:max-w-7xl bg-background pb-8">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </ScrollArea>
  );
};

export default Layout;
