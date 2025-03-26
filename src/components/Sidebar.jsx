import React from "react";
import Home from '../assets/home.svg'
import Profile from "../assets/profile.svg"
import Approval from "../assets/approve.svg"
import Logout from "../assets/logout.svg"

const Sidebar = () => {
    return (
      <div className="p-4 justify-between border-r-1 border-zinc-200 grid grid-rows-10">
        <div className="p-3 cursor-pointer flex flex-row items-center gap-3">
            <img className="w-7 h-7" src={Home} alt="Home" />
            <div className="text-md">Home</div>
        </div>
        <div className="p-3 cursor-pointer flex flex-row items-center gap-3">
            <img className="w-7 h-7" src={Profile} alt="Home" />
            <div>Profile</div>
        </div>
        <div className="p-3 cursor-pointer flex flex-row items-center gap-3">
            <img className="w-7 h-7" src={Approval} alt="Home" />
            <div>Requests for Approval</div>
        </div>
        <div className="row-span-6"></div>
        <div className="p-3 text-gray-500 cursor-pointer flex items-center gap-3">
            <img className="w-7 h-7" src={Logout} alt="Home" />
            <div>Logout</div>
        </div>
      </div>
    );
};

export default Sidebar;