import React from "react";
import Profile from "../assets/profile.png"

const div = () => {
    return (
        <div className="justify-between items-center p-4 border-b-1 border-zinc-200 grid grid-cols-7">
          <div className="text-lg font-bold">LOGO</div>
          <div className="col-span-5"></div>
            <div className="p-3 cursor-pointer flex flex-row items-center gap-3 border-l-1 border-zinc-200 ">
                <img className="w-7 h-7" src={Profile} alt="Home" />
                <div className="text-md">Profile</div>
            </div>
        </div>
      )
};

export default div;