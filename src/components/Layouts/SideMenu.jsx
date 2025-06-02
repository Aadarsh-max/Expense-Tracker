import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
  <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
    <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
      <div className="w-16 h-16 rounded-full bg-violet-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
        {getInitials(user?.fullName)}
      </div>
      <h5 className="text-violet-700 font-semibold text-sm text-center">
        {user?.fullName || ""}
      </h5>
    </div>

    {SIDE_MENU_DATA.map((item, index) => (
      <button
        key={`menu_${index}`}
        className={`w-full flex items-center gap-4 text-[15px] ${
          activeMenu === item.label
            ? "text-white bg-violet-600"
            : "text-gray-700 hover:bg-gray-100"
        } py-3 px-6 rounded-lg mb-3 transition-all duration-200 cursor-pointer`}
        onClick={() => handleClick(item.path)}
      >
        <item.icon className="text-lg" />
        {item.label}
      </button>
    ))}
  </div>
);

};

export default SideMenu;
