import React from 'react'
import { useRecoilValue } from 'recoil';
import { selectedStudentState } from '../../state/recoilState';
import DashboardLayout from '../../layout/DashboardLayout'
import ProfilePic from '../../assets/profile pic.svg'
import ProfileSquare from '../../assets/profile-square.svg'
import Email from '../../assets/profile-email.svg'
import Phone from '../../assets/profile-phone.svg'
import DOB from '../../assets/profile-dob.svg'
import Emergency from '../../assets/profile-emergency.svg'
import Location from '../../assets/profile-location.svg'
import AddButton from '../../assets/add-button.svg'
import CloudDownload from '../../assets/cloud.svg'

function MentorViewStudent() {
  const student = useRecoilValue(selectedStudentState);

  if (!student) {
    return (
      <DashboardLayout>
        <div className="p-8">No student selected.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className='grid grid-rows-10 h-full'>
        <div className='flex items-center justify-between'>
          <div className="flex gap-4">
            <div className="">Home</div>
            <div className="">{">"}</div>
            <div className="">Student Profile</div>
          </div>
        </div>

        <div className="row-span-9 h-full">
          <div className="grid grid-rows-10 h-full gap-y-6">
            <div className="row-span-4">
              <div className="grid grid-cols-3 w-full h-full gap-6">
                {/* Profile */}
                <div className='border border-zinc-100 bg-white rounded-xl p-4 h-full flex items-center justify-center'>
                  <div className="flex flex-col items-center ">
                    <img className='w-32 h-32 rounded-full object-cover' src={student.image || ProfilePic} alt="profile" />
                    <div className='font-semibold text-2xl'>{student.name}</div>
                    <div>{student.userId}</div>
                  </div>
                </div>

                {/* Mentor List */}
                <div>
                  <div className="grid grid-rows-4 border border-zinc-100 bg-white rounded-xl p-4 h-full flex-col gap-y-3">
                    <div className='font-semibold text-xl flex justify-center'>
                      Mentors List
                    </div>
                    <div className='row-span-3 grid grid-rows-3 gap-y-3'>
                      {student.mentors?.map((mentor, index) => (
                        <div key={index} className="flex flex-col gap-y-2">
                          <div className="flex gap-5">
                            <img className='w-10' src={ProfileSquare} alt="mentor-icon" />
                            <div className="flex flex-col">
                              <div className="font-semibold">{mentor.name}</div>
                              <div className='text-sm'>{mentor.phone}</div>
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
                  <div className='flex flex-col border border-zinc-100 bg-white rounded-xl p-4 h-full'>
                    <div className='grid grid-rows-5 gap-y-6 h-full'>
                      <div className='font-semibold text-xl flex justify-between'>
                        <div>Ongoing Projects List</div>
                        <img src={AddButton} alt="AddButton" />
                      </div>
                      <div className='row-span-4'>
                        {student.projectsList?.map((project, index) => (
                          <div key={index} className="flex border-b border-zinc-200 py-2 justify-between">
                            <div className="flex flex-col justify-between">
                              <div className="text-md font-semibold">{project.title}</div>
                              <div className="text-sm">{project.mentor}</div>
                            </div>
                            <div>
                              <span className="text-sm font-bold">{project.progress}%</span>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
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
                <div className="col-span-2 border border-zinc-100 bg-white rounded-xl p-4 flex flex-col gap-y-5">
                  <div className="Personal Details flex flex-col gap-5">
                    <div className="flex justify-between">
                      <div className='text-xl font-semibold'>Personal Details</div>
                    </div>
                    <div className='flex flex-col gap-y-5'>
                      <div className="w-full flex gap-5">
                        <div className="w-1/2 flex gap-5">
                          <img className='w-10' src={Email} alt="email-icon" />
                          <div className="flex flex-col">
                            <div className="font-semibold">{student.email}</div>
                            <div className='text-sm'>Email</div>
                          </div>
                        </div>
                        <div className="w-1/2 flex gap-5">
                          <img className='w-10' src={DOB} alt="dob-icon" />
                          <div className="flex flex-col">
                            <div className="font-semibold">{student.dob}</div>
                            <div className='text-sm'>D.O.B</div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex gap-5">
                        <div className="w-1/2 flex gap-5">
                          <img className='w-10' src={Phone} alt="phone-icon" />
                          <div className="flex flex-col">
                            <div className="font-semibold">{student.phone}</div>
                            <div className='text-sm'>Phone Number</div>
                          </div>
                        </div>
                        <div className="w-1/2 flex gap-5">
                          <img className='w-10' src={Emergency} alt="emergency-icon" />
                          <div className="flex flex-col">
                            <div className="font-semibold">{student.emergencyContact}</div>
                            <div className='text-sm'>Emergency Contact</div>
                          </div>
                        </div>
                      </div>

                      <div className="border border-zinc-100"></div>

                      <div className="">
                        <div className="w-full flex gap-5">
                          <div className="w-1/2 flex gap-5">
                            <img className='w-10' src={Location} alt="location-icon" />
                            <div className="flex flex-col">
                              <div className="font-semibold">{student.location}</div>
                              <div className='text-sm'>Location</div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Certificates */}
                <div>
                  <div className="row-span-3 border border-zinc-100 bg-white rounded-xl p-4 flex flex-col gap-y-6 h-full">
                    <div className="title flex justify-center">
                      <div className="text-xl font-semibold">Certificates</div>
                    </div>
                    <div className='h-full flex flex-col gap-y-4 overflow-y-auto'>
                      {student.certificates?.map((cert, index) => (
                        <div key={index} className="flex flex-col gap-y-5">
                          <div className="lst flex justify-between">
                            <div className="name text-md font-semibold">{cert.name}</div>
                            <img className='cursor-pointer' src={CloudDownload} alt="Download" />
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
    </DashboardLayout>
  );
}

export default MentorViewStudent;
    