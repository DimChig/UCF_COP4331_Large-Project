import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1 w-full justify-center bg-neutral-100 ">
        <div className="flex w-full max-w-7xl bg-background pb-8">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
