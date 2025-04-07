import React, { useEffect, useState } from "react";
import userService from "../service/userService";
import ProfileSquare from "../assets/profile-square.svg"; 
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Header = () => {
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
        console.log("Student data response:", response[0]);
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
    <div className="justify-between items-center p-4 border-b border-zinc-200 grid grid-cols-7">
      <div className="text-lg font-bold cursor-pointer" onClick={() => navigate("/")}>LOGO</div>
      <div className="col-span-5"></div>
      <div 
        className="p-3 cursor-pointer flex flex-row items-center gap-3 border-l border-zinc-200"
        onClick={handleProfileClick}
      >
        <img
          className="w-9 h-9 rounded-lg border border-zinc-100 p-1 object-contain"
          src={
            studentData?.profilePicture
              ? `data:image/png;base64,${studentData.profilePicture}`
              : ProfileSquare
          }
          onError={(e) => { e.target.src = ProfileSquare; }}
          alt="Profile Pic"
        />
        <div className="text-md">{studentData?.fullName || "User"}</div>
      </div>
    </div>
  );
};

export default Header;
