import React, { useEffect, useState } from "react";
import userService from "../service/userService";
import ProfileSquare from "../assets/profile-square.svg";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Menu } from "lucide-react"; // or any icon you prefer
import LOGO from '../assets/LOGO.svg';

const Header = ({ toggleSidebar }) => {
  const [studentData, setStudentData] = useState(null);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

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

    const fetchUserDetails = async () => {
      try {
        const response = await userService.getUserDetails();
        setStudentData(response?.response || response?.data || response);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleProfileClick = () => {
    if (userRole === "ADMIN") {
      navigate("/admin-profile");
    } else if (userRole === "MENTOR") {
      navigate("/mentor-profile");
    } else if (userRole === "STUDENT") {
      navigate("/student-profile");
    } else {
      navigate("/profile");
    }
  };

  return (
    <div className="justify-between items-center p-4 border-b border-zinc-200 grid grid-cols-6 ">
      {/* Hamburger - visible on small/medium screens */}
      <div className="flex items-center gap-4">
        <div className="block xl:hidden cursor-pointer" onClick={toggleSidebar}>
          <Menu className="w-6 h-6" />
        </div>
        <img src={LOGO} alt="LOGO" />
        {/* <div className="text-lg font-bold cursor-pointer">LOGO</div> */}
      </div>

      <div className="col-span-4 md:col-span-3"></div>

      {/* Profile */}
      <div
        className="p-3 cursor-pointer flex flex-row items-center justify-end gap-3 w-full border-zinc-200 md:col-span-2"
        onClick={handleProfileClick}
      >
        <img
          className="w-9 h-9 rounded-lg border border-zinc-100 p-1 object-contain"
          src={
            studentData?.profilePicture
              ? `data:image/png;base64,${studentData.profilePicture}`
              : ProfileSquare
          }
          onError={(e) => {
            e.target.src = ProfileSquare;
          }}
          alt="Profile Pic"
        />
        <div className="text-md font-semibold hidden md:flex ">
          {studentData?.fullName || "User"}
        </div>
      </div>
    </div>
  );
};

export default Header;
