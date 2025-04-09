import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DashboardLayout from '../../layout/DashboardLayout';
import ProfilePic from '../../assets/profile pic.svg';
import ProfileSquare from '../../assets/profile-square.svg';
import Email from '../../assets/profile-email.svg';
import Phone from '../../assets/profile-phone.svg';
import DOB from '../../assets/profile-dob.svg';
import Emergency from '../../assets/profile-emergency.svg';
import Location from '../../assets/profile-location.svg';
import AddButton from '../../assets/add-button.svg';
import CloudDownload from '../../assets/cloud.svg';

import userService from '../../service/userService'
import projectService from '../../service/userprojectService';
import certificateService from '../../service/certificateService';
import userprojectService from '../../service/userprojectService'
import EditProfileModal from '../../components/modals/EditProfileModal'

function MentorViewStudent() {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [certificates, setCertificates] = useState([]);
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
        try {
            const data = await userService.getUserById(userId);
            setUserData(data);
        } catch (err) {
            console.error(err);
        }
        };
        fetchUser();
    }, [userId]);

    useEffect(() => {
        const fetchCertificates = async () => {
        try {
            // Use the new method to get certificates for a specific student ID
            const res = await certificateService.getCertificatesListByUser(userId);
            setCertificates(res);
        } catch (err) {
            console.error("Error fetching certificates:", err);
        }
        };
        
        fetchCertificates();
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
        const fetchProjects = async () => {
            if (userData?.userId) {
            try {
                const projectList = await userprojectService.getProjectsList(
                userData.userId
                );
                console.log("Fetched projects:", projectList); 
                setProjects(projectList);
            } catch (error) {
                console.log("Error fetching projects:", error);
            }
            }
        };
        fetchProjects();
        }, [userData]);

        const uniqueMentors = [
            ...new Map(
            projects
                .filter((p) => p.project?.mentor) 
                .map((p) => [p.project.mentor.userId, p.project.mentor])
            ).values(),
        ];

        const uniqueProjects = [
          ...new Map(
            projects
              .filter((p) => p.project?.mentor)
              .map((p) => [p.project.mentor.userId, p])
          ).values(),
        ];

  return (
    <DashboardLayout>
      <div className='grid grid-rows-10 h-full'>
        <div className='flex items-center justify-between'>
          <div className="flex gap-4">
            <div
              className='hover:underline hover:cursor-pointer'
              onClick={() => navigate("/dashboard")}
            >
              Home
            </div>
            <div>{">"}</div>
            <div className="font-semibold">Student Profile</div>
          </div>
        </div>

        <div className="row-span-9 h-full">
          <div className="grid grid-rows-10 h-full gap-y-6">
            <div className="row-span-4">
              <div className="grid grid-cols-3 w-full h-full gap-6">
                {/* Profile Card */}
                <div className='border border-zinc-100 bg-white rounded-xl p-4 h-full flex items-center justify-center'>
                  <div className="flex flex-col items-center">
                  <img
                      className="w-32 h-32 rounded-2xl border border-zinc-100 p-2 object-contain"
                      src={
                        userData?.profilePicture
                          ? `data:image/png;base64,${userData.profilePicture}`
                          : ProfilePic
                      }
                      onError={(e) => {
                        e.target.src = ProfilePic;
                      }}
                      alt="Profile Pic"
                    />

                    <div className='font-semibold text-2xl'>{userData?.fullName || "Loading..."}</div>
                    <div>{userData?.userId || ""}</div>
                  </div>
                </div>

                {/* Mentor List */}
                <div>
                  <div className="grid grid-rows-4 border border-zinc-100 bg-white rounded-xl p-4 h-full flex-col gap-y-3">
                    <div className='font-semibold text-xl flex justify-center'>Mentors List</div>
                    <div className='row-span-3 grid grid-rows-3 gap-y-3'>
                    {uniqueMentors.map((mentor, index) => (
                        <div key={index} className="flex flex-col gap-y-2">
                          <div className="flex gap-5">
                              <img className='w-10' 
                                src={mentor.profilePicture 
                                ? `data:image/png;base64,${mentor.profilePicture}` 
                                : ProfilePic} alt="mentor-icon" />
                              <div className="flex flex-col">
                              <div className="font-semibold">{mentor.fullName}</div>
                              <div className='text-sm'>{mentor.contactNo}</div>
                            </div>
                          </div>
                          <div className="border border-zinc-100"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Ongoing Projects */}
                <div>
                  <div className='flex flex-col border border-zinc-100 bg-white rounded-xl p-4 h-full'>
                    <div className='grid grid-rows-5 gap-y-6 h-full'>
                      <div className='font-semibold text-xl flex justify-between'>
                        <div>Ongoing Projects List</div>
                        <img src={AddButton} alt="Add Button" />
                      </div>
                      <div className='row-span-4'>
                        {uniqueProjects.map((p, index) => (
                          <div key={index} className="flex border-b border-zinc-200 py-2 justify-between">
                            <div className="flex flex-col justify-between">
                              <div className="text-md font-semibold">{p.project.projectName}</div>
                              <div className="text-sm">Mentor: {p.project.mentor.fullName}</div>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-sm font-bold">{p.project.progress}%</span>
                              <div className="w-6 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${p.project.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Personal Details & Certificates */}
            <div className="row-span-6">
              <div className="grid grid-cols-3 w-full h-full gap-6">
                {/* Personal Details */}
                <div className="col-span-2 row-span-3 border border-zinc-100 bg-white rounded-xl p-4 flex flex-col gap-y-5">
                  <div className="flex justify-between">
                    <div className='text-xl font-semibold'>Personal Details</div>
                  </div>
                  <div className='flex flex-col gap-y-5'>
                    <div className="w-full flex gap-5">
                      <div className="w-1/2 flex gap-5">
                        <img className='w-10' src={Email} alt="email-icon" />
                        <div className="flex flex-col">
                          <div className="font-semibold">{userData?.email || "-"}</div>
                          <div className='text-sm'>Email</div>
                        </div>
                      </div>
                      <div className="w-1/2 flex gap-5">
                        <img className='w-10' src={DOB} alt="dob-icon" />
                        <div className="flex flex-col">
                          <div className="font-semibold">{userData?.dateOfBirth || "-"}</div>
                          <div className='text-sm'>D.O.B</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex gap-5">
                      <div className="w-1/2 flex gap-5">
                        <img className='w-10' src={Phone} alt="phone-icon" />
                        <div className="flex flex-col">
                          <div className="font-semibold">{userData?.contactNo || "-"}</div>
                          <div className='text-sm'>Phone Number</div>
                        </div>
                      </div>
                      <div className="w-1/2 flex gap-5">
                        <img className='w-10' src={Emergency} alt="emergency-icon" />
                        <div className="flex flex-col">
                          <div className="font-semibold">{userData?.emergencyContact || "-"}</div>
                          <div className='text-sm'>Emergency Contact</div>
                        </div>
                      </div>
                    </div>
                    <div className="border border-zinc-100"></div>
                    <div className="w-full flex gap-5">
                      <div className="w-1/2 flex gap-5">
                        <img className='w-10' src={Location} alt="location-icon" />
                        <div className="flex flex-col">
                          <div className="font-semibold">{userData?.address || "-"}</div>
                          <div className='text-sm'>Location</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certificates - Removed duplicate section */}
                <div className="row-span-3 border border-zinc-100 bg-white rounded-xl p-4 flex flex-col gap-y-6 h-full">
                  <div className="title flex justify-center">
                    <div className="text-xl font-semibold">Certificates</div>
                  </div>

                  <div className="h-full flex flex-col gap-y-4 overflow-y-auto">
                    {certificates.length === 0 ? (
                      <div className="text-center text-sm text-gray-400">No certificates uploaded yet.</div>
                    ) : (
                      certificates.map((cert) => (
                        <div key={cert.id || cert.certificateId} className="flex flex-col gap-y-5">
                          <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                              <div className="text-md font-semibold">{cert.certificateName}</div>
                              <div className="text-sm text-gray-600">Issued by: {cert.issuedBy}</div>
                            </div>
                            <img
                              className="cursor-pointer w-6 h-6"
                              src={CloudDownload}
                              alt="Download Icon"
                              onClick={() => handleDownload(cert.id || cert.certificateId, cert.certificateName)}
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
    </DashboardLayout>
  );
}

export default MentorViewStudent;
