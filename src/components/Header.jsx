import React, { useEffect, useState } from "react";
import userService from "../service/userService";
import ProfileSquare from "../assets/profile-square.svg"; 


const Header = () => {
  
  const [studentData,setStudentData] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
          const response = await userService.getUserDetails(); 
          console.log("Student data response:", response[0]);
          setStudentData(response?.response || response?.data || response);
      } catch (error) {
          console.error('Error fetching mentor profile:', error);
      }
  };
  fetchUserDetails();
  }, []);

  if (!studentData) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="justify-between items-center p-4 border-b border-zinc-200 grid grid-cols-7">
      <div className="text-lg font-bold">LOGO</div>
      <div className="col-span-5"></div>
      <div className="p-3 cursor-pointer flex flex-row items-center gap-3 border-l border-zinc-200">
        <img className="w-9 h-9 rounded-lg border border-zinc-100 p-1 object-contain" 
        src={studentData.profilePicture ? `data:image/png;base64,${studentData.profilePicture}` : ProfileSquare} 
          onError={(e) => { e.target.src = ProfileSquare; }} 
          alt="Profile Pic" 
          />
        <div className="text-md">{studentData.fullName}</div>
      </div>
    </div>
  );
};

export default Header;
