import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Home from "../assets/home.svg";
import Profile from "../assets/profile.svg";
import Approval from "../assets/approve.svg";
import Logout from "../assets/logout.svg";
import authService from "../service/authService";
import { jwtDecode } from "jwt-decode";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname;
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.roles?.[0] || "");
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="p-4 border-r-1 border-zinc-200 grid grid-rows-10 min-w-64">
      {/* Home */}
      <div
        className={`p-3 cursor-pointer flex flex-row items-center gap-3 rounded-xl m-3 ${
          activePath === "/dashboard" ||
          activePath === "/mentor-dashboard" ||
          activePath === "/student-dashboard" ||
          activePath === "/dashboard"
            ? "bg-blue-100 font-semibold"
            : ""
        }`}
        onClick={handleHomeClick}
      >
        <img className="w-7 h-7" src={Home} alt="Home" />
        <div className="text-md">Home</div>
      </div>

      {/* Profile */}
      <div
        className={`p-3 cursor-pointer flex flex-row items-center gap-3 rounded-xl m-3 ${
          activePath === "/profile" ||
          activePath === "/profile" ||
          activePath === "/profile" ||
          activePath === "/profile"
            ? "bg-blue-100 font-semibold"
            : ""
        }`}
        onClick={handleProfileClick}
      >
        <img className="w-7 h-7" src={Profile} alt="Profile" />
        <div>Profile</div>
      </div>

      {/* Requests for Approval - Only for ADMIN */}
      {userRole === "ADMIN" && (
        <div
          className={`p-3 cursor-pointer flex flex-row items-center gap-3 rounded-xl m-3 ${
            activePath === "/admin-approval" ? "bg-blue-100 font-semibold" : ""
          }`}
          onClick={() => navigate("/admin-approval")}
        >
          <img className="w-7 h-7" src={Approval} alt="Approval" />
          <div>Requests for Approval</div>
        </div>
      )}

      {userRole === "ADMIN" && <div className="row-span-6"></div>}

      {userRole !== "ADMIN" && <div className="row-span-7"></div>}

      {/* Logout */}
      <div className="p-3 text-gray-500 cursor-pointer flex items-center gap-3 m-3 hover:bg-red-200 rounded-xl">
        <img className="w-7 h-7" src={Logout} alt="Logout" />
        <div>
          <button
            onClick={handleLogout}
            className="text-red-600 font-semibold p-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
