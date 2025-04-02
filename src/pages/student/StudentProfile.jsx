import React from 'react'
import DashboardLayout from '../../layout/DashboardLayout'
import ProfilePic from '../../assets/profile pic.svg'
import ProfileSquare from '../../assets/profile-square.svg'
import Edit from '../../assets/edit.svg'
import Email from '../../assets/profile-email.svg'
import Phone from '../../assets/profile-phone.svg'
import DOB from '../../assets/profile-dob.svg'
import Emergency from '../../assets/profile-emergency.svg'
import Location from '../../assets/profile-location.svg'
import Tick from '../../assets/tick.svg'
import AddButton from '../../assets/add-button.svg'
import DeleteButton from '../../assets/delete.svg'

function StudentProfile() {
  return (
    <DashboardLayout>

         <div className='grid grid-rows-10 h-full overflow-auto'>
                <div className='flex items-center'>
                    Profile
                </div>
                <div className="row-span-9 overflow-y-auto scrollbar-hide h-full">
                    <div className="w-full grid grid-cols-10 gap-5">
                        <div className="col-span-7">
                            <div className="grid grid-rows-10 h-full gap-y-6">
                        <div className="row-span-4">
                            <div className=" grid grid-cols-5 h-full gap-6">
                                <div className="col-span-2">
                                    <div className='border border-zinc-100 bg-white rounded-xl p-4 h-full flex items-center justify-center'>
                                        <div className="flex flex-col items-center ">
                                            <img className='w-32' src={ProfilePic} alt="prifilepic" />
                                            <div className='font-semibold text-2xl'>NAME</div>
                                            <div>EMPLOYEE ID</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-3 w-full">
                                    <div className="grid grid-rows-8 border border-zinc-100 bg-white rounded-xl p-4 h-full flex-col ">
                                        <div className='font-semibold text-xl flex justify-center'>
                                            Your Mentors
                                        </div>
                                        <div className='row-span-7 grid grid-rows-4 gap-y-5'>
                                            <div className="flex flex-col gap-y-5">
                                                <div className="w-1/2 flex gap-5"> 
                                                    <img className='w-10' src={ProfileSquare} alt="phone-icon" />
                                                    <div className="flex flex-col">
                                                        <div className="font-semibold" >Name</div>
                                                        <div  className='text-sm'>Phone Number</div>
                                                    </div>
                                                </div>
                                                <div className="border border-zinc-100"></div>
                                            </div>
                                            <div className="flex flex-col gap-y-5">
                                                <div className="w-1/2 flex gap-5"> 
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
                            </div>



                            
                        </div>
                        <div className="row-span-6 h-auto">
                            <div className="border border-zinc-100 bg-white rounded-xl p-4 flex flex-col gap-y-5 ">
                                <div className="Personal Details flex flex-col gap-5">
                                    <div className="flex justify-between">
                                        <div className='text-xl font-semibold'>Personal Details</div>
                                        <img src={Edit} alt="edit" />
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
                                <div className="Password flex flex-col gap-y-6">
                                    <div className="title">
                                        <div className="font-semibold">Password</div>
                                        <div className="text-sm">Please enter your current password to change your password.</div>
                                    </div>
                                    <div className="form flex flex-col gap-y-4">
                                        <div className=" gap-10 items-center grid grid-cols-3">
                                            <label className='text-sm font-semibold'>Current password</label>
                                            <input
                                            className='name-input border border-zinc-100  p-2 rounded text-sm'
                                            type='text'
                                            name='Current Password'
                                            placeholder='Enter current password'
                                            />
                                        </div>
                                        <div className="border border-zinc-100"></div>
                                        <div className="gap-10 items-center grid grid-cols-3">
                                            <label className='text-sm font-semibold'>New password</label>
                                            <div>
                                                <input
                                                className='name-input border border-zinc-100  p-2 rounded text-sm w-full'
                                                type='text'
                                                name='new password'
                                                placeholder='Enter new password'
                                                />
                                                <div className='text-sm'>Your new password must be more than 8 characters.</div>
                                            </div> 
                                        </div>
                                        <div className="border border-zinc-100"></div>
                                        <div className="gap-10 items-center grid grid-cols-3">
                                            <label className='text-sm font-semibold'>Confirm new password</label>
                                            <div>
                                                <input
                                                className='name-input border border-zinc-100  p-2 rounded text-sm w-full '
                                                type='text'
                                                name='confirm password'
                                                placeholder='Re-Enter new password'
                                                />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="updatedetails flex flex-row-reverse gap-6">
                                        <button className='flex justify-center bg-blue-600 py-3 rounded-xl  text-white px-4 font-semibold hover:bg-blue-700 text-sm'> Update Password</button>
                                        <button className='flex justify-center bg-zinc-100 py-3 rounded-xl text-black px-4 font-semibold hover:bg-zinc-200 text-sm '> Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        </div>
                        <div className="col-span-3 grid grid-rows-10 h-full gap-y-6">
                            <div className="row-span-4 ">
                                <div className='flex flex-col border border-zinc-100 bg-white rounded-xl p-4 gap-5 justify-between h-full'>
                                        <div className='grid grid-rows-5 gap-6 h-full'>
                                            <div className='text-5xl font-bold text-center flex justify-center items-center'>1</div>
                                            <div className='flex flex-col'>
                                                <div className="text-center text-2xl font-semibold">Project Completed</div>
                                                <div className="text-center">Finish up for the best experience.</div>
                                            </div>
                                            <div className='row-span-3'>
                                                <div className="flex border-b border-zinc-200 py-2 justify-between">
                                                    <div className="flex flex-col justify-between">
                                                        <div className="text-md font-semibold">Project Title</div>
                                                        <div className="text-sm">Mentor</div>
                                                    </div>
                                                    <div>
                                                        <img src={Tick} alt="Completed Project" />
                                                    </div>
                                                </div>

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

                            <div className="row-span-6 border border-zinc-100 bg-white rounded-xl h-full p-4 flex flex-col gap-y-6">
                            <div className="title flex justify-between">
                                        <div className="text-xl font-semibold">Certificates</div>
                                        <img className='w-8' src={AddButton} alt="addButton" />
                            </div>
                            <div className='h-full flex flex-col gap-y-4'>
                                <div className="flex flex-col gap-y-5">
                                    <div className="lst flex justify-between">
                                        <div className="name text-md font-semibold">Certificate Name</div>
                                        <img className='cursor-pointer ' src={DeleteButton} alt="Delete Button" />
                                    </div>
                                    <div className="border border-zinc-100"></div>
                                </div>
                                <div className="lst flex justify-between">
                                    <div className="name text-md font-semibold">Certificate Name</div>
                                    <img className='cursor-pointer ' src={DeleteButton} alt="Delete Button" />
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

export default StudentProfile