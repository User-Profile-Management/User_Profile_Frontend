import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import ProfilePic from "../../assets/profile pic.svg";
import ProfileSquare from "../../assets/profile-square.svg";
import Email from "../../assets/profile-email.svg";
import Phone from "../../assets/profile-phone.svg";
import DOB from "../../assets/profile-dob.svg";
import Emergency from "../../assets/profile-emergency.svg";
import Location from "../../assets/profile-location.svg";
import userService from "../../service/userService";
import { useParams } from "react-router-dom";
import projectService from "../../service/projectService.jsx";
import userprojectService from "../../service/userprojectService.jsx";
import EditProfileModal from "../../components/modals/EditProfileModal";

function AdminViewMentor() {
  const [mentorData, setMentorData] = useState(null);
  const [studentsList, setStudentsList] = useState([]);
  const [mentorProjects, setMentorProjects] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { userId } = useParams();
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      const response = await userService.getUserById(userId);
      setMentorData(response?.response || response?.data || response);
      console.log("Fetched mentor data:", response);
    } catch (error) {
      console.error("Error fetching mentor profile:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUserDetails();
  }, [userId]);
  
  useEffect(() => {
    const fetchMentorProjects = async () => {
      try {
        const allProjects = await projectService.getAllProjects();
        const mentorProjects = allProjects.filter(
          (project) => project.mentorId === userId
        );
        setMentorProjects(mentorProjects);
        console.log("Mentor Projects:", mentorProjects);
      } catch (error) {
        console.error("Error fetching mentor projects:", error);
      }
    };

    if (userId) fetchMentorProjects();
  }, [userId]);

  useEffect(() => {
    const fetchStudentsUnderMentor = async () => {
      try {
        const userProjects = await userprojectService.getProjectsList();
        console.log("All userProjects:", userProjects);

        const allProjects = await projectService.getAllProjects();
        console.log("All projects:", allProjects);

        const filtered = userProjects.filter((entry) => {
          const project = allProjects.find(
            (p) => p.projectId === entry.projectId
          );

          return (
            project &&
            project.mentorId === userId &&
            entry.user &&
            entry.user.role?.roleName === "STUDENT"
          );
        });

        console.log("Filtered students under mentor:", filtered);

        const uniqueStudents = Array.from(
          new Map(
            filtered.map((entry) => [entry.user.userId, entry.user])
          ).values()
        );

        setStudentsList(uniqueStudents);
      } catch (error) {
        console.error("Error fetching students under mentor:", error);
      }
    };

    if (userId) fetchStudentsUnderMentor();
  }, [userId]);



  if (loading || !mentorData) {
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
            <div className="font-semibold">Mentor Profile</div>
          </div>
          <div className="updatedetails flex flex-row-reverse gap-6">
            <button className="flex justify-center border border-red-600 py-3 rounded-xl text-red-600 px-4 font-semibold hover:bg-red-600 hover:text-white text-sm ">
              Delete Mentor
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
                  <div className="flex flex-col items-center">
                    <img
                      className="w-32 h-32"
                      src={ProfilePic}
                      alt="profilepic"
                    />
                    <div className="font-semibold text-2xl">
                      {mentorData.fullName}
                    </div>
                    <div>{mentorData.userId}</div>
                  </div>
                </div>
                {/* Students under mentor List */}
                <div>
                  <div className="grid grid-rows-4 border border-zinc-100 bg-white rounded-xl p-4 h-full flex-col gap-y-3">
                    <div className="font-semibold text-xl flex justify-center">
                      Students Under The Mentor
                    </div>
                    <div className="row-span-3 grid grid-rows-3 gap-y-3 overflow-y-auto">
                      {studentsList.map((student, index) => (
                        <div key={index} className="flex flex-col gap-y-2">
                          <div className="flex gap-5">
                            <img
                              className="w-10"
                              src={ProfileSquare}
                              alt="profile-icon"
                            />
                            <div className="flex flex-col">
                              <div className="font-semibold">
                                {student.fullName}
                              </div>
                              <div className="text-sm">{student.userId}</div>
                            </div>
                          </div>
                          <div className="border border-zinc-100"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Ongoing Projects List */}
                <div>
                  <div className="flex flex-col border border-zinc-100 bg-white rounded-xl p-4 h-full ">
                    <div className="grid grid-rows-5 gap-y-6 h-full">
                      <div className="font-semibold text-xl flex justify-center">
                        Projects Under The Mentor
                      </div>
                      <div className="row-span-4 overflow-y-auto">
                        {mentorProjects.length > 0 ? (
                          mentorProjects.map((project, index) => (
                            <div
                              key={index}
                              className="flex flex-col gap-1 border border-zinc-100 p-3 rounded-lg mb-2"
                            >
                              <div className="font-semibold text-black-600">
                                {project.projectName}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-gray-500 italic">
                            No projects assigned yet.
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
                <div className="col-span-2 border border-zinc-100 bg-white rounded-xl p-4 flex flex-col gap-y-5">
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
                              {mentorData.email}
                            </div>
                            <div className="text-sm">Email</div>
                          </div>
                        </div>
                        <div className="w-1/2 flex gap-5">
                          <img className="w-10" src={DOB} alt="dob-icon" />
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
                          <img className="w-10" src={Phone} alt="phone-icon" />
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
                              {mentorData.emergencyContact}
                            </div>
                            <div className="text-sm">Emergency Contact</div>
                          </div>
                        </div>
                      </div>
                      <div className="border border-zinc-100"></div>
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
                  </div>
                </div>
                <div>
                  <div className="row-span-3 border border-zinc-100 bg-white rounded-xl p-4 flex flex-col gap-y-6 h-full">
                    <div className="title flex justify-center">
                      <div className="text-xl font-semibold">Student List</div>
                    </div>
                    <div className="h-full flex flex-col gap-y-4 overflow-y-auto">
                      {studentsList.map((student, index) => (
                        <div key={index} className="flex flex-col gap-y-2">
                          <div className="flex gap-5">
                            <img
                              className="w-10"
                              src={ProfileSquare}
                              alt="profile-icon"
                            />
                            <div className="flex flex-col">
                              <div className="font-semibold">
                                {student.fullName}
                              </div>
                              <div className="text-sm">{student.userId}</div>
                            </div>
                          </div>
                          <div className="border border-zinc-100"></div>
                        </div>
                      ))}
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
          userData={mentorData}
          onSave={async () => {
            await fetchUserDetails();
            setIsEditModalOpen(false);
          }}
        />
      )}
    </DashboardLayout>
  );
}

export default AdminViewMentor;
