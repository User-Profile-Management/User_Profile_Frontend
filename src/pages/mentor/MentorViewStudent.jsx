import React from 'react'
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
                                    <img className='w-32' src={ProfilePic} alt="prifilepic" />
                                    <div className='font-semibold text-2xl'>NAME</div>
                                    <div>EMPLOYEE ID</div>
                                </div>
                            </div>
                            {/* Mentor List */}
                            <div className="">
                            <div className="grid grid-rows-4 border border-zinc-100 bg-white rounded-xl p-4 h-full flex-col gap-y-3">
                                <div className='font-semibold text-xl flex justify-center'>
                                Mentors List
                                </div>
                                <div className='row-span-3 grid grid-rows-3 gap-y-3'>
                                    
                                    <div className="flex flex-col gap-y-2">
                                        <div className=" flex gap-5"> 
                                            <img className='w-10' src={ProfileSquare} alt="phone-icon" />
                                            <div className="flex flex-col">
                                                <div className="font-semibold" >Name</div>
                                                <div  className='text-sm'>Phone Number</div>
                                            </div>
                                        </div>
                                        <div className="border border-zinc-100"></div>
                                    </div>
                                    <div className="flex flex-col gap-y-2">
                                        <div className=" flex gap-5"> 
                                            <img className='w-10' src={ProfileSquare} alt="phone-icon" />
                                            <div className="flex flex-col">
                                                <div className="font-semibold" >Name</div>
                                                <div  className='text-sm'>Phone Number</div>
                                            </div>
                                        </div>
                                        <div className="border border-zinc-100"></div>
                                    </div>
                                    <div className="flex flex-col gap-y-2">
                                        <div className=" flex gap-5"> 
                                            <img className='w-10' src={ProfileSquare} alt="phone-icon" />
                                            <div className="flex flex-col">
                                                <div className="font-semibold" >Name</div>
                                                <div  className='text-sm'>Phone Number</div>
                                            </div>
                                        </div>
                                        <div className="border border-zinc-100"></div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            {/* Ongoing Projects List */}
                            <div className="">
                                <div className='flex flex-col border border-zinc-100 bg-white rounded-xl p-4 h-full '>
                                        <div className='grid grid-rows-5 gap-y-6 h-full'>
                                            <div className='font-semibold text-xl flex justify-between'>
                                                <div>Ongoing Projects List</div>
                                                <img src={AddButton} alt="AddButton" />

                                            </div>
                                            <div className='row-span-4'>
                                                

                                                <div className="flex border-b border-zinc-200 py-2 justify-between">
                                                    <div className="flex flex-col justify-between">
                                                        <div className="text-md font-semibold">Project Title</div>
                                                        <div className="text-sm">Mentor</div>
                                                    </div>
                                                    
                                                    <div>
                                                        <span className="text-sm font-bold">90%</span>
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>

                                                <div className="flex border-b border-zinc-200 py-2 justify-between">
                                                    <div className="flex flex-col justify-between">
                                                        <div className="text-md font-semibold">Project Title</div>
                                                        <div className="text-sm">Mentor</div>
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-bold  ">70%</span>
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "70%" }}></div>
                                                        </div>
                                                    </div>
                                                </div>

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
                                        <div className='text-xl font-semibold'>Personal Details</div>
                                        
                                    </div>
                                    <div className='flex flex-col gap-y-5'>
                                        <div className="w-full flex gap-5">
                                            <div className="w-1/2 flex gap-5">
                                                <img className='w-10' src={Email} alt="email-icon" />
                                                <div className="flex flex-col">
                                                    <div className="font-semibold" >a@gmail.com</div>
                                                    <div className='text-sm'>Email</div>
                                                </div>
                                            </div>
                                            <div className="w-1/2 flex gap-5">
                                                <img className='w-10' src={DOB} alt="phone-icon" />
                                                <div className="flex flex-col">
                                                    <div className="font-semibold" >00/00/0000</div>
                                                    <div className='text-sm' >D.O.B</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex gap-5">
                                            
                                            <div className="w-1/2 flex gap-5">
                                                <img className='w-10' src={Phone} alt="phone-icon" />
                                                <div className="flex flex-col">
                                                    <div className="font-semibold" >00000-00000</div>
                                                    <div  className='text-sm'>Phone Number</div>
                                                </div>
                                            </div>
                                            <div className="w-1/2 flex gap-5">
                                                <img className='w-10' src={Emergency} alt="emergency-icon" />
                                                <div className="flex flex-col">
                                                    <div className="font-semibold" >00000-00000</div>
                                                    <div className='text-sm' >Emergency Contact</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-zinc-100"></div>
                                        <div className="">
                                        <div className="w-full flex gap-5">
                                            <div className="w-1/2 flex gap-5">
                                                <img className='w-10' src={Location} alt="location-icon" />
                                                <div className="flex flex-col">
                                                    <div className="font-semibold" >India</div>
                                                    <div className='text-sm' >Location</div>
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
                                <div className='h-full flex flex-col gap-y-4'>
                                    <div className="flex flex-col gap-y-5">
                                        <div className="lst flex justify-between">
                                            <div className="name text-md font-semibold">Certificate Name</div>
                                            <img className='cursor-pointer ' src={CloudDownload} alt="Delete Button" />
                                        </div>
                                        <div className="border border-zinc-100"></div>
                                    </div>
                                    <div className="flex flex-col gap-y-5">
                                        <div className="lst flex justify-between">
                                            <div className="name text-md font-semibold">Certificate Name</div>
                                            <img className='cursor-pointer ' src={CloudDownload} alt="Delete Button" />
                                        </div>
                                        <div className="border border-zinc-100"></div>
                                    </div><div className="flex flex-col gap-y-5">
                                        <div className="lst flex justify-between">
                                            <div className="name text-md font-semibold">Certificate Name</div>
                                            <img className='cursor-pointer ' src={CloudDownload} alt="Delete Button" />
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

    </DashboardLayout>
  )
}

export default MentorViewStudent