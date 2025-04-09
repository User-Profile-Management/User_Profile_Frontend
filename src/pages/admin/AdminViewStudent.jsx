import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import ProfilePic from "../../assets/profile pic.svg";
import ProfileSquare from "../../assets/profile-square.svg";
import Email from "../../assets/profile-email.svg";
import Phone from "../../assets/profile-phone.svg";
import DOB from "../../assets/profile-dob.svg";
import Emergency from "../../assets/profile-emergency.svg";
import Location from "../../assets/profile-location.svg";
import AddButton from "../../assets/add-button.svg";
import CloudDownload from "../../assets/cloud.svg";
import userService from "../../service/userService";
import Tick from "../../assets/tick.svg";
import userprojectService from "../../service/userprojectService";
import certificateService from "../../service/certificateService";
import EditProfileModal from "../../components/modals/EditProfileModal";
import AlertModal from "../../components/modals/AlertModal";
import { useParams } from "react-router-dom";

function AdminViewStudent() {
  const [studentData, setStudentData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({
      isOpen: false,
      type: "info",
      title: "",
      message: "",
    });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await userService.getUserById(userId);
        setStudentData(response?.response || response?.data || response);
        console.log("Fetched student data:", response);
      } catch (error) {
        console.error("Error fetching student profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleDeleteUser= async () => {
    try {
      const response = await userService.deleteUser(userId); // Delete user via the userService
      console.log("Student deleted successfully", response);
      setAlert({
        isOpen: true,
        type: "success",
        title: "Success",
        message: "User deleted successfully",
      });
      // Optionally, redirect to another page after deleting
    } catch (error) {
      console.error("Error deleting student:", error);
      setAlert({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Error deleting the user. Please try again.",
      });
    }
  };



  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await certificateService.getCertificatesList(userId);
        setCertificates(res); // Already filtered by studentId on backend
      } catch (err) {
        console.error("Error fetching certificates:", err);
      }
    };

    if (userId) {
      fetchCertificates();
    }
  }, [userId]);

  const handleDownload = async (certificateId, certificateName) => {
    try {
      const blob = await certificateService.downloadCertificate(certificateId);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${certificateName}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  useEffect(() => {
    if (!studentData || !studentData.userId) {
      console.log("Waiting for student data...");
      return;
    }

    const fetchStudentProjects = async () => {
      try {
        const res = await userprojectService.getProjectsByStudentId(
          studentData.userId
        );
        setProjects(res?.response || []);
        console.log("student project list:", res);

        // Extract mentors from projects and set the unique mentor list
        const mentorList = [];
        res?.response.forEach((project) => {
          if (
            project.mentor &&
            !mentorList.some((m) => m.userId === project.mentor.userId)
          ) {
            mentorList.push(project.mentor);
          }
        });
        setMentors(mentorList); // Set the unique mentor list
      } catch (error) {
        console.error("Failed to fetch student projects:", error);
      }
    };

    fetchStudentProjects();
  }, [studentData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="grid grid-rows-10 h-full">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <div className="text-gray-500 hover:underline hover:cursor-pointer">
              Home
            </div>
            <div className="text-gray-500">{">"}</div>
            <div className="font-semibold">Student Profile</div>
          </div>
          <div className="updatedetails flex flex-row-reverse gap-6">
            <button onClick={handleDeleteUser} className="flex justify-center border border-red-600 py-3 rounded-xl text-red-600 px-4 font-semibold hover:bg-red-600 hover:text-white text-sm ">
              Delete User
            </button>
            <button
              className="flex justify-center bg-blue-600 py-3 rounded-xl text-white px-4 font-semibold hover:bg-blue-700 text-sm"
              onClick={() => setIsEditModalOpen(true)}
            >
              Edit profile
            </button>
          </div>
        </div>
        <div className="row-span-9 h-full">
          <div className="grid grid-rows-10 h-full gap-y-6">
            <div className="row-span-4">
              <div className="grid grid-cols-3 w-full h-full gap-6">
                {/* Profile */}
                <div className="border border-zinc-100 bg-white rounded-xl p-4 h-full flex items-center justify-center">
                  <div className="flex flex-col items-center ">
                    <img
                      className="w-32 h-32 rounded-2xl border border-zinc-100 p-2 object-contain"
                      src={
                        studentData?.profilePicture
                          ? `data:image/png;base64,${studentData.profilePicture}`
                          : ProfilePic
                      }
                      onError={(e) => {
                        e.target.src = ProfilePic;
                      }}
                      alt="Profile Pic"
                    />
                    <div className="font-semibold text-2xl">
                      {studentData?.fullName}
                    </div>
                    <div>{studentData?.userId}</div>
                  </div>
                </div>
                {/* Mentor List */}
                <div className="">
                  <div className="grid grid-rows-4 border border-zinc-100 bg-white rounded-xl p-4 h-full flex-col gap-y-3">
                    <div className="font-semibold text-xl flex justify-center">
                      Your Mentors
                    </div>
                    <div className="row-span-7 grid grid-rows-4 gap-y-5 overflow-auto">
                      {mentors.length === 0 ? (
                        <div className="text-center text-gray-500">
                          No mentors found
                        </div>
                      ) : (
                        mentors.map((mentor, index) => (
                          <div key={index} className="flex flex-col gap-y-5">
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
                                <div className="text-sm">{mentor.email}</div>
                              </div>
                            </div>
                            <div className="border border-zinc-100"></div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Ongoing Projects List */}
                <div className="">
                  <div className="flex flex-col border border-zinc-100 bg-white rounded-xl p-4 h-full ">
                    <div className="grid grid-rows-5 gap-y-6 h-full">
                      <div className="font-semibold text-xl flex justify-between">
                        <div>Ongoing Projects List</div>
                        
                      </div>
                      <div className="row-span-4">
                        {projects && projects.length > 0 ? (
                          projects.map((project, index) => (
                            <div
                              key={index}
                              className="flex border-b border-zinc-200 py-2 justify-between"
                            >
                              <div className="flex flex-col justify-between">
                                <div className="text-md font-medium">
                                  {project.projectName}
                                </div>
                                <div className="text-sm">
                                  Mentor: {project.mentor?.fullName || "N/A"}
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                {project.status === "COMPLETED" ? (
                                  <img src={Tick} alt="Completed Project" />
                                ) : (
                                  <>
                                    <span className="text-sm text-gray-600">
                                      {project.progress || 0}%
                                    </span>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div
                                        className="bg-blue-600 h-2 rounded-full"
                                        style={{
                                          width: `${project.progress || 0}%`,
                                        }}
                                      ></div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-zinc-400">
                            No projects found.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row-span-6">
              <div className="grid grid-cols-3 w-full h-full gap-6">
                <div className=" col-span-2 border border-zinc-100 bg-white rounded-xl p-4 flex flex-col gap-y-5 ">
                  <div className="Personal Details flex flex-col gap-5">
                    <div className="flex justify-between">
                      <div className="text-xl font-semibold">
                        Personal Details
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-5">
                      <div className="w-full flex gap-5">
                        <div className="w-1/2 flex gap-5">
                          <img className="w-10" src={Email} alt="email-icon" />
                          <div className="flex flex-col">
                            <div className="font-semibold">
                              {studentData?.email}
                            </div>
                            <div className="text-sm">Email</div>
                          </div>
                        </div>
                        <div className="w-1/2 flex gap-5">
                          <img className="w-10" src={DOB} alt="phone-icon" />
                          <div className="flex flex-col">
                            <div className="font-semibold">
                              {studentData?.dateOfBirth}
                            </div>
                            <div className="text-sm">D.O.B</div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex gap-5">
                        <div className="w-1/2 flex gap-5">
                          <img className="w-10" src={Phone} alt="phone-icon" />
                          <div className="flex flex-col">
                            <div className="font-semibold">
                              {studentData?.contactNo}
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
                              {studentData?.emergencyContact}
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
                                {studentData?.address}
                              </div>
                              <div className="text-sm">Address</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                 
                  <div className="row-span-3 border border-zinc-100 bg-white rounded-xl p-4 flex flex-col gap-y-6 h-full">
                    <div className="title flex justify-center">
                      <div className="text-xl font-semibold">Certificates</div>
                    </div>

                    <div className="h-full flex flex-col gap-y-4 overflow-y-auto">
                      {certificates.length === 0 ? (
                        <div className="text-center text-sm text-gray-400">
                          No certificates uploaded yet.
                        </div>
                      ) : (
                        certificates.map((cert) => (
                          <div
                            key={cert.certificateId}
                            className="flex flex-col gap-y-5"
                          >
                            <div className="flex justify-between items-center">
                              <div className="text-md font-semibold">
                                {cert.certificateName}
                              </div>
                              <img
                                className="cursor-pointer w-6 h-6"
                                src={CloudDownload}
                                alt="Download Icon"
                                onClick={() =>
                                  handleDownload(
                                    cert.certificateId,
                                    cert.certificateName
                                  )
                                }
                              />
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
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          userData={studentData}
          onSave={async () => {
            await fetchUserDetails();
            setIsEditModalOpen(false);
          }}
        />
      )}
    </DashboardLayout>
  );
}

export default AdminViewStudent;
