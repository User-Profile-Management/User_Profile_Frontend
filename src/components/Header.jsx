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
        const [userData] = await userService.getUserDetails();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="justify-between items-center p-4 border-b border-zinc-200 grid grid-cols-7">
      <div className="text-lg font-bold">LOGO</div>
      <div className="col-span-5"></div>
      <div className="p-3 cursor-pointer flex flex-row items-center gap-3 border-l border-zinc-200">
        <img className="w-7 h-7 rounded-full object-cover" src={user.profilePicture ? user.profilePicture : Profile} alt="Profile" />
        <div className="text-md">{user.name}</div>
      </div>
    </div>
  );
};

export default Header;
