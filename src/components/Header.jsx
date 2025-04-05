import React, { useEffect, useState } from "react";
import userService from "../service/userService";
import Profile from "../assets/profile.png";

const Header = () => {
  const [user, setUser] = useState({
    name: "",
    image: Profile,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        
        const userData = await userService.getUserDetails();
        
        if (userData) {
          setUser({
            name: userData.fullName || "", 
            image: userData.profilePicture 
              ? `data:image/png;base64,${userData.profilePicture}`
              : Profile,
          });
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="justify-between items-center p-4 border-b-1 border-zinc-200 grid grid-cols-7">
      <div className="text-lg font-bold">LOGO</div>
      <div className="col-span-5"></div>
      <div className="p-3 cursor-pointer flex flex-row items-center gap-3 border-l border-zinc-200 ">
        <img 
          className="w-7 h-7 rounded-full" 
          src={user.image} 
          alt="Profile" 
        />
        <div className="text-md">{user.name || "Profile"}</div>
      </div>
    </div>
  );
};

export default Header;