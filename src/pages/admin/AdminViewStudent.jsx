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
import projectService from "../../service/projectService";
import certificateService from "../../service/certificateService";
import EditProfileModal from "../../components/modals/EditProfileModal";

function AdminViewStudent() {
  const [studentData, setStudentData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const userCerts = await certificateService.getCertificatesList();
        setCertifications(userCerts);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    };

    const fetchProjects = async () => {
      try {
        const userProjects = await projectService.getProjectsList();
        setProjects(userProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    const fetchUserDetails = async () => {
      try {
        const response = await userService.getUserDetails();

        // Adjust this line depending on how your API returns data
        setStudentData(response?.response || response?.data || response);
      } catch (error) {
        console.error("Error fetching mentor profile:", error);
      }
    };
    fetchUserDetails();
    fetchProjects();
    fetchCertificates();
  }, []);
  
  useEffect(() => {
    const fetchProjects = async () => {
      if (studentData?.userId) {
        try {
          const projectList = await userprojectService.getProjectsList(
            studentData.userId
          );
          console.log("Fetched projects:", projectList); // ✅ log the fetched projects
          setProjects(projectList);
        } catch (error) {
          console.log("Error fetching projects:", error);
        }
      }
    };
    fetchProjects();
  }, [studentData]);

  const uniqueMentors = [
    ...new Map(
      projects
        .filter((p) => p.project?.mentor)
        .map((p) => [p.project.mentor.userId, p.project.mentor])
    ).values(),
  ];

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
            <button className="flex justify-center border border-red-600 py-3 rounded-xl text-red-600 px-4 font-semibold hover:bg-red-600 hover:text-white text-sm ">
              Delete Student
            </button>
            <button
              className="flex justify-center bg-blue-600 py-3 rounded-xl  text-white px-4 font-semibold hover:bg-blue-700 text-sm"
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
                      {uniqueMentors.length === 0 ? (
                        <div className="text-center text-gray-500">
                          No mentors found
                        </div>
                      ) : (
                        uniqueMentors.map((mentor, index) => (
                          <div key={index} className="flex flex-col gap-y-5">
                            <div className="w-1/2 flex gap-5">
                              <img
                                className="w-10"
                                src={ProfileSquare}
                                alt="mentor-icon"
                              />
                              <div className="flex flex-col">
                                <div className="font-semibold">
                                  {mentor?.fullName}
                                </div>
                                <div className="text-sm">
                                  {mentor?.contactNo}
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
                {/* Ongoing Projects List */}
                <div className="">
                  <div className="flex flex-col border border-zinc-100 bg-white rounded-xl p-4 h-full ">
                    <div className="grid grid-rows-5 gap-y-6 h-full">
                      <div className="font-semibold text-xl flex justify-between">
                        <div>Ongoing Projects List</div>
                        <img src={AddButton} alt="AddButton" />
                      </div>
                      <div className="row-span-4">
                        {projects.length > 0 ? (
                          projects.map((project, index) => (
                            <div
                              key={index}
                              className="flex border-b border-zinc-200 py-2 justify-between"
                            >
                              <div className="flex flex-col justify-between">
                                <div className="text-md font-medium">
                                  {project.project?.projectName}
                                </div>
                                <div className="text-sm">
                                  Mentor:{" "}
                                  {project.project?.mentor?.fullName || "N/A"}
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
                    <div className="h-full flex flex-col gap-y-4">
                      <div className="flex flex-col gap-y-5">
                        <div className="lst flex justify-between">
                          <div className="name text-md font-semibold">
                            Certificate Name
                          </div>
                          <img
                            className="cursor-pointer "
                            src={CloudDownload}
                            alt="Delete Button"
                          />
                        </div>
                        <div className="border border-zinc-100"></div>
                      </div>
                      <div className="flex flex-col gap-y-5">
                        <div className="lst flex justify-between">
                          <div className="name text-md font-semibold">
                            Certificate Name
                          </div>
                          <img
                            className="cursor-pointer "
                            src={CloudDownload}
                            alt="Delete Button"
                          />
                        </div>
                        <div className="border border-zinc-100"></div>
                      </div>
                      <div className="flex flex-col gap-y-5">
                        <div className="lst flex justify-between">
                          <div className="name text-md font-semibold">
                            Certificate Name
                          </div>
                          <img
                            className="cursor-pointer "
                            src={CloudDownload}
                            alt="Delete Button"
                          />
                        </div>
                        <div className="border border-zinc-100"></div>
                      </div>
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
            await fetchUserDetails(); // Refresh data after saving
            setIsEditModalOpen(false);
          }}
        />
      )}
    </DashboardLayout>
  );
}

export default AdminViewStudent;
