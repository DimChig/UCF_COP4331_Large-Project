import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import { useEffect, useRef } from "react";

import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0);
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div ref={containerRef} className="overflow-y-auto">
      <div className="flex flex-col w-full h-full bg-[red]">
        <NavBar />
        <div className="flex h-full min-h-screen w-full justify-center bg-neutral-100 ">
          <div className="flex w-full max-w-screen xl:max-w-7xl bg-background pb-8">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
