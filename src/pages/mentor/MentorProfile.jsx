import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import ProfilePic from "../../assets/profile pic.svg";

import Edit from "../../assets/edit.svg";
import Email from "../../assets/profile-email.svg";
import Phone from "../../assets/profile-phone.svg";
import DOB from "../../assets/profile-dob.svg";
import Emergency from "../../assets/profile-emergency.svg";
import Location from "../../assets/profile-location.svg";
import projectService from "../../service/projectService.jsx";
import StudentListCard from "../../components/StudentListCard";
import EditProfileModal from "../../components/modals/EditProfileModal.jsx";
import userService from "../../service/userService.jsx";

import userprojectService from "../../service/userprojectService.jsx";

function MentorProfile() {
  const [projects, setProjects] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [mentorStudents, setMentorStudents] = useState([]);
  const [mentorProjects, setMentorProjects] = useState([]);
  const [mentorData, setMentorData] = useState(null);
  const [StudentsList, setStudentsList] = useState([]);
  const [errors, setErrors] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => setIsEditModalOpen(true);
  const handleCloseModal = () => setIsEditModalOpen(false);
  useEffect(() => {
    const fetchMentorProjects = async () => {
      if (mentorData && mentorData.userId) {
        try {
          const projects = await projectService.getProjectsByMentorUserId(
            mentorData.userId
          );
          console.log("mentor projects:", projects);
          setMentorProjects(projects); // Set mentor's specific projects
        } catch (err) {
          console.error("Error fetching mentor projects", err);
        }
      }
    };

    fetchMentorProjects();
  }, [mentorData]); // Trigger only when mentorData changes

  useEffect(() => {
    const fetchMentorProjects = async () => {
      if (mentorData && mentorData.userId) {
        try {
          const projects = await projectService.getProjectsByMentorUserId(
            mentorData.userId
          );
          setMentorProjects(projects);
        } catch (err) {
          console.error("Error fetching mentor projects", err);
        }
      }
    };

    fetchMentorProjects();
  }, [mentorData]); // This gives students under a mentor

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await userService.getStudentsList();
        console.log("Fetched Students:", students);
        setStudentsList(students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []); //gives full students list

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await userService.getUserDetails();
        const mentorInfo = response?.response || response?.data || response;
        console.log("Fetched Mentor Data:", mentorInfo);
        setMentorData(mentorInfo);
      } catch (error) {
        console.error("Error fetching mentor profile:", error);
      }
    };

    fetchMentorData();
  }, []); // for all students list

  useEffect(() => {
    if (!mentorData?.userId) return; // Wait for mentorData to be available

    const fetchMentorProjectsAndStudents = async () => {
      try {
        // Fetch projects for the mentor
        const projects = await projectService.getProjectsByMentorUserId(
          mentorData.userId
        );
        setMentorProjects(projects);

        // Fetch students under the mentor
        const students = await userprojectService.getStudentsUnderMentor();
        console.log("Fetched Mentor's Students:", students);
        setMentorStudents(students);
      } catch (err) {
        console.error("Error fetching mentor data:", err);
      }
    };

    fetchMentorProjectsAndStudents();
  }, [mentorData]); // This gives the students under a mentor

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmNewPassword } = passwordData;
    let newErrors = {};

    if (!currentPassword) newErrors.currentPassword = true;
    if (!newPassword || newPassword.length < 8) newErrors.newPassword = true;
    if (newPassword !== confirmNewPassword) newErrors.confirmNewPassword = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      console.log("Updating password...");
      await userService.updatePassword({ currentPassword, newPassword });
      alert("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Password update error:", error);
      alert("Failed to update password. Please try again.");
    }
  };

  const handleProfileSave = async (updatedData) => {
    try {
      console.log("Updating profile with:", updatedData);
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
      setMentorData(refreshedData.response);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (!mentorData) return <div>Loading mentor profile...</div>;

  return (
    <DashboardLayout>
      <div className="grid grid-rows-10 h-full overflow-auto">
        <div className="flex items-center gap-4">
          <div className="font-semibold">Profile</div>
          <div className="text-gray-500">{">"}</div>
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
                            className="w-32 h-32 rounded-full object-cover"
                            src={mentorData.profilePicture || ProfilePic}
                            alt="profilepic"
                          />

                          <div className="font-semibold text-2xl">
                            {mentorData.fullName}
                          </div>
                          <div>{mentorData.userId}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3 w-full">
                      <div className="grid grid-rows-8 border border-zinc-100 bg-white rounded-xl p-4 h-full flex-col">
                        <div className="font-semibold text-xl flex justify-center">
                          Students Under Mentorship
                        </div>
                        <div className="row-span-7 grid grid-rows-4 gap-y-5 overflow-y-auto">
                          {mentorStudents.map((student) => {
                            const studentProjects = projects.filter((project) =>
                              project.students?.some(
                                (s) => s.userId === student.userId
                              )
                            );

                            return (
                              <div
                                key={student.userId}
                                className="flex flex-col gap-y-2"
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex gap-4 items-center">
                                    <img
                                      className="w-10 h-10 object-obtain rounded"
                                      src={student.profilePicture || ProfilePic}
                                      alt="ProfilePic"
                                    />
                                    <div>
                                      <div className="font-semibold text-lg">
                                        {student.fullName}
                                      </div>
                                      <div className="">
                                        {student.userId}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="border border-zinc-100"></div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row-span-6 h-auto">
                  <div className="border border-zinc-100 bg-white rounded-xl p-4 flex flex-col gap-y-5 ">
                    <div className="Personal Details flex flex-col gap-5">
                      <div className="flex justify-between">
                        <div className="font-semibold">Personal Details</div>
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
                                {mentorData.email}
                              </div>
                              <div className="text-sm">Email</div>
                            </div>
                          </div>
                          <div className="w-1/2 flex gap-5">
                            <img className="w-10" src={DOB} alt="phone-icon" />
                            <div className="flex flex-col">
                              <div className="font-semibold">
                                {mentorData.dateOfBirth}
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
                                {mentorData.contactNo}
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
                                {mentorData?.emergencyContact || "-"}
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
                                  {mentorData.address}
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
                      {/* Current Password */}
                      <div className="gap-10 items-center grid grid-cols-3">
                        <label className="text-sm font-semibold">
                          Current password
                        </label>
                        <div className="w-full">
                          <input
                            className={`border p-2 rounded text-sm w-full ${
                              errors.currentPassword
                                ? "border-red-500"
                                : "border-zinc-100"
                            }`}
                            type="password"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handleChange}
                            placeholder="Enter current password"
                          />
                          {errors.currentPassword && (
                            <div className="text-red-500 text-xs mt-1">
                              Current password is required.
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="border border-zinc-100"></div>

                      {/* New Password */}
                      <div className="gap-10 items-center grid grid-cols-3">
                        <label className="text-sm font-semibold">
                          New password
                        </label>
                        <div className="w-full">
                          <input
                            className={`border p-2 rounded text-sm w-full ${
                              errors.newPassword
                                ? "border-red-500"
                                : "border-zinc-100"
                            }`}
                            type="text"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter new password"
                          />
                          {errors.newPassword && (
                            <div className="text-red-500 text-xs mt-1">
                              New password must be at least 8 characters.
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="border border-zinc-100"></div>

                      {/* Confirm New Password */}
                      <div className="gap-10 items-center grid grid-cols-3">
                        <label className="text-sm font-semibold">
                          Confirm new password
                        </label>
                        <div className="w-full">
                          <input
                            className={`border p-2 rounded text-sm w-full ${
                              errors.confirmNewPassword
                                ? "border-red-500"
                                : "border-zinc-100"
                            }`}
                            type="text"
                            name="confirmNewPassword"
                            value={passwordData.confirmNewPassword}
                            onChange={handleChange}
                            placeholder="Re-Enter new password"
                          />
                          {errors.confirmNewPassword && (
                            <div className="text-red-500 text-xs mt-1">
                              Passwords do not match.
                            </div>
                          )}
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
                          onClick={() => {
                            setPasswordData({
                              currentPassword: "",
                              newPassword: "",
                              confirmNewPassword: "",
                            });
                            setErrors({});
                          }}
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
                  <div className="grid grid-rows-8 gap-6 h-full">
                    <div className="font-semibold text-xl flex justify-center">
                      Your Projects
                    </div>
                    <div className="row-span-7 overflow-y-auto">
                      {mentorProjects.map((project) => (
                        <div key={project.projectId} className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-semibold">
                              {project.projectName}
                            </div>
                          </div>
                          <div className="border-b border-zinc-200 my-3"></div>
                        </div>
                      ))}

                      {mentorProjects.length === 0 && (
                        <div className="text-center text-gray-500 py-4">
                          No projects assigned yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row-span-6 border border-zinc-100 bg-white rounded-xl h-full p-4 flex flex-col gap-y-6">
                <div className="title flex justify-between">
                  <div className="text-xl font-semibold">Student List</div>
                </div>

                <div className="h-full flex flex-col gap-y-4 overflow-auto">
                  <StudentListCard items={StudentsList} />
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
        userData={mentorData}
      />
    </DashboardLayout>
  );
}

export default MentorProfile;
