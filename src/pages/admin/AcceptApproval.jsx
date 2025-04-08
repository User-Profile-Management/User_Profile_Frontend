import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import userService from "../../service/userService";
import DashboardLayout from "../../layout/DashboardLayout";
import ProfilePic from "../../assets/profile pic.svg";
import Email from "../../assets/profile-email.svg";
import Phone from "../../assets/profile-phone.svg";
import DOB from "../../assets/profile-dob.svg";
import Emergency from "../../assets/profile-emergency.svg";
import Location from "../../assets/profile-location.svg";
import AlertModal from "../../components/modals/AlertModal";

export default function AcceptApproval() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [alert, setAlert] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getUserById(userId);
        if (response) {
          setUserData(response);
        } else {
          console.warn("No user data found in response!");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);


  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 h-full overflow-auto scrollbar-hide">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Link
              to="/admin-approval"
              className="text-gray-500 hover:underline hover:cursor-pointer"
            >
              Requests for Approval
            </Link>
            <div className="text-gray-500">{">"}</div>
            <div className="font-semibold">Profile</div>
          </div>
          <div className="flex gap-4">
            <button
              className="border border-red-600 py-2 px-4 rounded-xl text-red-600 font-semibold hover:bg-red-600 hover:text-white text-sm"
              onClick={() => console.log("Decline clicked")}
            >
              Decline
            </button>
            <button
              className="bg-blue-600 py-2 px-4 rounded-xl text-white font-semibold hover:bg-blue-700 text-sm"
              onClick={async () => {
                try {
                  const payload = {
                    status: "ACTIVE",

                    role: userData.role, // string like "STUDENT" or "MENTOR"
                  };

                  await userService.acceptUser(userId, payload);
                  setAlert({
                    isOpen: true,
                    type: "success",
                    title: "Success",
                    message: "User updated successfully",
                  });
                } catch (error) {
                  console.error("Failed to accept user:", error);
                  setAlert({
                    isOpen: true,
                    type: "error",
                    title: "Error",
                    message: "Error accepting user.",
                  });
                }
              }}
            >
              Accept
            </button>
          </div>
        </div>

        <div className="border border-zinc-100 bg-white rounded-xl p-6 flex items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <img className="w-32 h-32 mb-2" src={ProfilePic} alt="profilepic" />
            <div className="font-semibold text-2xl">{userData?.fullName}</div>
            <div className="text-sm text-gray-500">{userData?.userId}</div>
          </div>
        </div>

        <div className="border border-zinc-100 bg-white rounded-xl p-6 flex flex-col gap-y-6">
          <div className="font-semibold text-lg">Personal Details</div>

          <div className="flex flex-wrap gap-y-6 gap-x-10">
            <div className="flex gap-4 w-[45%]">
              <img className="w-10" src={Email} alt="email-icon" />
              <div>
                <div className="font-semibold">{userData?.email}</div>
                <div className="text-sm">Email</div>
              </div>
            </div>

            <div className="flex gap-4 w-[45%]">
              <img className="w-10" src={DOB} alt="dob-icon" />
              <div>
                <div className="font-semibold">{userData?.dateOfBirth}</div>
                <div className="text-sm">D.O.B</div>
              </div>
            </div>

            <div className="flex gap-4 w-[45%]">
              <img className="w-10" src={Phone} alt="phone-icon" />
              <div>
                <div className="font-semibold">{userData?.contactNo}</div>
                <div className="text-sm">Phone Number</div>
              </div>
            </div>

            <div className="flex gap-4 w-[45%]">
              <img className="w-10" src={Emergency} alt="emergency-icon" />
              <div>
                <div className="font-semibold">
                  {userData?.emergencyContact || "-"}
                </div>
                <div className="text-sm">Emergency Contact</div>
              </div>
            </div>

            <div className="flex gap-4 w-[90%]">
              <img className="w-10" src={Location} alt="location-icon" />
              <div>
                <div className="font-semibold">{userData?.address}</div>
                <div className="text-sm">Address</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-zinc-100 bg-white rounded-xl p-6 flex flex-col gap-y-5">
          <div className="font-semibold text-lg">Assign User Role</div>
          <div className="flex gap-4 items-center">
            <label htmlFor="userRole" className="text-sm font-semibold w-1/4">
              Select Role
            </label>
            <select
              id="userRole"
              name="role"
              className="border border-zinc-300 p-2 rounded text-sm w-full"
              value={userData?.role || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, role: e.target.value }))
              }
            >
              <option value="">-- Select a role --</option>
              <option value="STUDENT">STUDENT</option>
              <option value="MENTOR">MENTOR</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="flex justify-end">
          
          </div>
        </div>
      </div>
      <AlertModal
        isOpen={alert.isOpen}
        onClose={() => setAlert((prev) => ({ ...prev, isOpen: false }))}
        type={alert.type}
        title={alert.title}
        message={alert.message}
      />
    </DashboardLayout>
  );
}
