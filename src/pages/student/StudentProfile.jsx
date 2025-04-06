import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import ProfilePic from "../../assets/profile pic.svg";
import ProfileSquare from "../../assets/profile-square.svg";
import Edit from "../../assets/edit.svg";
import Email from "../../assets/profile-email.svg";
import Phone from "../../assets/profile-phone.svg";
import DOB from "../../assets/profile-dob.svg";
import Emergency from "../../assets/profile-emergency.svg";
import Location from "../../assets/profile-location.svg";
import Tick from "../../assets/tick.svg";
import AddButton from "../../assets/add-button.svg";
import DeleteButton from "../../assets/delete.svg";
import EditProfileModal from "../../components/modals/EditProfileModal";
import userService from "../../service/userService";
import userprojectService from "../../service/userprojectService";
import certificateService from "../../service/certificateService";

function StudentProfile() {
  const [studentData, setStudentData] = useState(null);
  const [certifications, setCertifications] = useState([]);

  const [projects, setProjects] = useState([]);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await userService.getUserDetails();
        console.log("User data:", response);
        setStudentData(response);
      } catch (error) {
        console.error("Error fetching student profile:", error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmNewPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      alert("Please fill all the fields.");
      return;
    }

    if (newPassword.length < 8) {
      alert("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      await userService.updatePassword({ currentPassword, newPassword });
      alert("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.error("Password update error:", error);
      alert("Failed to update password. Please try again.");
    }
  };

  const handleProfileSave = async (updatedData) => {
    try {
      const formData = new FormData();
      formData.append("address", updatedData.address);
      formData.append("contactNo", updatedData.phone);
      formData.append("emergencyContact", updatedData.emergencyContact);

      if (updatedData.profilePicture) {
        formData.append("profilePicture", updatedData.profilePicture);
      }

      await userService.updateProfile(formData);
      alert("Profile updated successfully!");
      const refreshedData = await userService.getUserDetails();
      setStudentData(refreshedData);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      if (studentData?.userId) {
        try {
          const projectList = await userprojectService.getProjectsList(
            studentData.userId
          );
          setProjects(projectList);
        } catch (error) {
          console.log("error fetching projects:", error);
        }
      }
    };
    fetchProjects();
  }, [studentData]);
  const uniqueMentors = [
    ...new Map(
      projects.filter((p) => p.mentor).map((p) => [p.mentor.userId, p.mentor])
    ).values(),
  ];

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const certs = await certificateService.getCertificatesList();
        setCertifications(certs);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };

    fetchCertificates();
  }, []);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="grid grid-rows-10 h-full overflow-auto">
        <div className="flex items-center">
          <div className="font-semibold">Profile</div>
        </div>
        <div className="row-span-9 overflow-y-auto scrollbar-hide h-full">
          <div className="w-full grid grid-cols-10 gap-5">
            <div className="col-span-7">
              <div className="grid grid-rows-10 h-full gap-y-6">
                <div className="row-span-4">
                  <div className=" grid grid-cols-5 h-full gap-6">
                    <div className="col-span-2">
                      <div className="border border-zinc-100 bg-white rounded-xl p-4 h-full flex items-center justify-center">
                        <div className="flex flex-col items-center ">
                          <img
                            className="w-32 h-32 rounded-full "
                            src={
                              studentData.profilePicture
                                ? `data:image/png;base64,${studentData.profilePicture}`
                                : ProfilePic
                            }
                            alt="Profile Pic"
                          />
                          <div className="font-semibold text-2xl">
                            {studentData.fullName}
                          </div>
                          <div>{studentData.userId}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3 w-full">
                      <div className="grid grid-rows-8 border border-zinc-100 bg-white rounded-xl p-4 h-full flex-col ">
                        <div className="font-semibold text-xl flex justify-center">
                          Your Mentors
                        </div>
                        <div className="row-span-7 grid grid-rows-4 gap-y-5 overflow-auto">
                          {uniqueMentors.length === 0 ? (
                            <div className="text-center text-gray-500">
                              No mentors found
                            </div>
                          ) : (
                            uniqueMentors.map((mentor, index) => (
                              <div
                                key={index}
                                className="flex flex-col gap-y-5"
                              >
                                <div className="w-1/2 flex gap-5">
                                  <img
                                    className="w-10"
                                    src={ProfileSquare}
                                    alt="mentor-icon"
                                  />
                                  <div className="flex flex-col">
                                    <div className="font-semibold">
                                      {mentor.fullName}
                                    </div>
                                    <div className="text-sm">
                                      {mentor.contactNo}
                                    </div>
                                  </div>
                                </div>
                                <div className="border border-zinc-100"></div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row-span-6 h-auto">
                  <div className="border border-zinc-100 bg-white rounded-xl p-4 flex flex-col gap-y-5 ">
                    <div className="Personal Details flex flex-col gap-5">
                      <div className="flex justify-between">
                        <div className="text-xl font-semibold">
                          Personal Details
                        </div>
                        <button onClick={handleEditClick}>
                          <img src={Edit} alt="edit" />
                        </button>
                      </div>
                      <div className="flex flex-col gap-y-5">
                        <div className="w-full flex gap-5">
                          <div className="w-1/2 flex gap-5">
                            <img
                              className="w-10"
                              src={Email}
                              alt="email-icon"
                            />
                            <div className="flex flex-col">
                              <div className="font-semibold">
                                {studentData.email}
                              </div>
                              <div className="text-sm">Email</div>
                            </div>
                          </div>
                          <div className="w-1/2 flex gap-5">
                            <img className="w-10" src={DOB} alt="phone-icon" />
                            <div className="flex flex-col">
                              <div className="font-semibold">
                                {studentData.dateOfBirth}
                              </div>
                              <div className="text-sm">D.O.B</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-full flex gap-5">
                          <div className="w-1/2 flex gap-5">
                            <img
                              className="w-10"
                              src={Phone}
                              alt="phone-icon"
                            />
                            <div className="flex flex-col">
                              <div className="font-semibold">
                                {studentData.contactNo}
                              </div>
                              <div className="text-sm">Phone Number</div>
                            </div>
                          </div>
                          <div className="w-1/2 flex gap-5">
                            <img
                              className="w-10"
                              src={Emergency}
                              alt="emergency-icon"
                            />
                            <div className="flex flex-col">
                              <div className="font-semibold">
                                {studentData.emergencyContact}
                              </div>
                              <div className="text-sm">Emergency Contact</div>
                            </div>
                          </div>
                        </div>
                        <div className="border border-zinc-100"></div>
                        <div className="">
                          <div className="w-full flex gap-5">
                            <div className="w-1/2 flex gap-5">
                              <img
                                className="w-10"
                                src={Location}
                                alt="location-icon"
                              />
                              <div className="flex flex-col">
                                <div className="font-semibold">
                                  {studentData.address}
                                </div>
                                <div className="text-sm">Address</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border border-zinc-100"></div>
                      </div>
                    </div>
                    <form
                      onSubmit={handleSubmit}
                      className="Password flex flex-col gap-y-6"
                    >
                      <div className="title">
                        <div className="font-semibold">Password</div>
                        <div className="text-sm">
                          Please enter your current password to change your
                          password.
                        </div>
                      </div>
                      <div className="form flex flex-col gap-y-4">
                        <div className=" gap-10 items-center grid grid-cols-3">
                          <label className="text-sm font-semibold">
                            Current password
                          </label>
                          <input
                            className="name-input border border-zinc-100  p-2 rounded text-sm"
                            type="text"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handleChange}
                            placeholder="Enter current password"
                          />
                        </div>
                        <div className="border border-zinc-100"></div>
                        <div className="gap-10 items-center grid grid-cols-3">
                          <label className="text-sm font-semibold">
                            New password
                          </label>
                          <div>
                            <input
                              className="name-input border border-zinc-100  p-2 rounded text-sm w-full"
                              type="text"
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handleChange}
                              placeholder="Enter new password"
                            />
                            <div className="text-sm">
                              Your new password must be more than 8 characters.
                            </div>
                          </div>
                        </div>
                        <div className="border border-zinc-100"></div>
                        <div className="gap-10 items-center grid grid-cols-3">
                          <label className="text-sm font-semibold">
                            Confirm new password
                          </label>
                          <div>
                            <input
                              className="name-input border border-zinc-100  p-2 rounded text-sm w-full "
                              type="text"
                              name="confirmNewPassword"
                              value={passwordData.confirmNewPassword}
                              onChange={handleChange}
                              placeholder="Re-Enter new password"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="updatedetails flex flex-row-reverse gap-6">
                        <button
                          type="submit"
                          className="flex justify-center bg-blue-600 py-3 rounded-xl  text-white px-4 font-semibold hover:bg-blue-700 text-sm"
                        >
                          Update Password
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setPasswordData({
                              currentPassword: "",
                              newPassword: "",
                              confirmNewPassword: "",
                            })
                          }
                          className="flex justify-center bg-zinc-100 py-3 rounded-xl text-black px-4 font-semibold hover:bg-zinc-200 text-sm "
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-3 grid grid-rows-10 h-full gap-y-6">
              <div className="row-span-4">
                <div className="flex flex-col border border-zinc-100 bg-white rounded-xl p-4 gap-5 justify-between h-full">
                  <div className="grid grid-rows-5 gap-6 h-full">
                    <div className="text-5xl font-bold text-center flex justify-center items-center">
                      {projects.filter((p) => p.status === "COMPLETED").length}
                    </div>
                    <div className="flex flex-col">
                      <div className="text-center text-2xl font-semibold">
                        Projects Completed
                      </div>
                      <div className="text-center">
                        Finish up for the best experience.
                      </div>
                    </div>
                    <div className="row-span-3 overflow-y-auto space-y-2">
                      {projects.map((project, index) => (
                        <div
                          key={index}
                          className="flex border-b border-zinc-200 py-2 justify-between"
                        >
                          <div className="flex flex-col justify-between">
                            <div className="text-md font-semibold">
                              {project.projectName}
                            </div>
                            <div className="text-sm">
                              {project.mentor?.fullName}
                            </div>
                          </div>
                          <div>
                            <img src={Tick} alt="Completed Project" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row-span-6 border border-zinc-100 bg-white rounded-xl h-full p-4 flex flex-col gap-y-6">
                <div className="title flex justify-between">
                  <div className="text-xl font-semibold">Certificates</div>
                  <img
                    className="w-8 cursor-pointer"
                    src={AddButton}
                    alt="Add Certificate"
                  />
                </div>

                <div className="h-full flex flex-col gap-y-4 overflow-y-auto">
                  {certifications.length > 0 ? (
                    certifications.map((cert) => (
                      <div
                        key={cert.certificateId}
                        className="flex flex-col gap-y-2"
                      >
                        <div className="lst flex justify-between items-center">
                          <div className="name text-md font-semibold">
                            {cert.certificateName}
                          </div>
                          <img
                            className="cursor-pointer"
                            src={DeleteButton}
                            alt="Delete Button"
                          />
                        </div>
                        <div className="border border-zinc-100"></div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-zinc-400">
                      No certificates found.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleProfileSave}
        userData={studentData}
      />
    </DashboardLayout>
  );
}

export default StudentProfile;
