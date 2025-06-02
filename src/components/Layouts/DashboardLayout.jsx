import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen">
      <Navbar isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />

      {user && (
        <div className="flex">
          <div className="hidden lg:block">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {isSidebarOpen && (
            <div className="fixed top-[61px] left-0 z-30 bg-white w-64 h-full lg:hidden shadow-md">
              <SideMenu activeMenu={activeMenu} />
            </div>
          )}

          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
