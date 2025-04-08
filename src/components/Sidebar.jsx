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
        let targetPath = "/dashboard"; 
        if (userRole === "ADMIN") {
            targetPath = "/dashboard";
        } else if (userRole === "MENTOR") {
            targetPath = "/dashboard";
        } else if (userRole === "STUDENT") {
            targetPath = "/dashboard";
        }
        navigate(targetPath);
    };

    const handleProfileClick = () => {
        if (userRole === "ADMIN") {
            navigate("/profile");
        } else if (userRole === "MENTOR") {
            navigate("/profile");
        } else if (userRole === "STUDENT") {
            navigate("/profile");
        } else {
            navigate("/profile");
        }
    };

    return (
        <div className="
        
        xl:p-4 xl:border-r-1 xl:border-zinc-200 xl:grid xl:grid-rows-10 xl:min-w-64
        sm:flex flex-col w-full ">
            
            {/* Home */}
            <div 
                className={`p-3 cursor-pointer flex flex-row items-center gap-3 rounded-xl m-3 ${
                    activePath === "/dashboard" ||
                    activePath.startsWith("/mentor-student-profile/") ||
                    activePath.startsWith("/admin-student-profile/")
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
                        activePath === "/admin-approval" ||
                        activePath.startsWith("/admin-accept/")
                            ? "bg-blue-100 font-semibold"
                            : ""
                    }`}
                    onClick={() => navigate("/admin-approval")}
                >
                    <img className="w-7 h-7" src={Approval} alt="Approval" />
                    <div>Requests for Approval</div>
                </div>
            )}

            {userRole === "ADMIN" && (
                <div className="row-span-6"></div>
            )}

            {userRole !== "ADMIN" && (
                <div className="row-span-7"></div>
            )}

    
            {/* Logout */}
            <div className="p-3 text-gray-500 cursor-pointer flex items-center gap-3 m-3 hover:bg-red-200 rounded-xl" onClick={handleLogout}>
                <img className="w-7 h-7" src={Logout} alt="Logout" />
                <div>
                    <button className="text-red-600 font-semibold p-2 rounded">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
