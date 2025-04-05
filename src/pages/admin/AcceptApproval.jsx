import React from 'react'
import DashboardLayout from '../../layout/DashboardLayout'
import ProfilePic from '../../assets/profile pic.svg'
import Email from '../../assets/profile-email.svg'
import Phone from '../../assets/profile-phone.svg'
import DOB from '../../assets/profile-dob.svg'
import Emergency from '../../assets/profile-emergency.svg'
import Location from '../../assets/profile-location.svg'
import { Link } from 'react-router-dom'

export default function AcceptApproval() {
  return (
    <DashboardLayout>
         <div className='grid grid-rows-10 h-full overflow-auto'>
                <div className='flex items-center justify-between'>
                    <div className="flex gap-4">
                        <Link to="/admin-approval" className="text-gray-500 hover:underline hover:cursor-pointer">Requests for Approval</Link>
                        <div className="text-gray-500">{">"}</div>
                        <div className="font-semibold">Profile</div>
                    </div>
                    <div className="updatedetails flex flex-row-reverse gap-4">
                      <button className='flex justify-center border border-red-600 py-3 rounded-xl text-red-600 px-4 font-semibold hover:bg-red-600 hover:text-white text-sm '>Decline</button>
                      <button className='flex justify-center bg-blue-600 py-3 rounded-xl  text-white px-4 font-semibold hover:bg-blue-700 text-sm'> Accept</button>
                    </div>
                    
                </div>
                <div className="row-span-9 overflow-y-auto scrollbar-hide h-full">
                    <div className="grid grid-rows-10 h-full gap-y-6">
                        <div className="row-span-4">
                            <div className='border border-zinc-100 bg-white rounded-xl p-4 h-full flex items-center justify-center'>
                                <div className="flex flex-col items-center ">
                                    <img className='w-32 h-32' src={ProfilePic} alt="prifilepic" />
                                    <div className='font-semibold text-2xl'>NAME</div>
                                    <div>EMPLOYEE ID</div>
                                </div>
                            </div>
                        </div>
                        <div className="row-span-6 h-auto">
                            <div className="border border-zinc-100 bg-white rounded-xl p-4 flex flex-col gap-y-5 h-full ">
                                <div className="Personal Details flex flex-col gap-5">
                                    <div className="flex justify-between">
                                        <div className='font-semibold'>Personal Details</div>
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
                                        <div className="border border-zinc-100"></div>
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
