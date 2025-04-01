import React from 'react'
import DashboardLayout from '../../layout/DashboardLayout'
import StatCard from '../../components/StatCard'
import CircularProgress from '../../components/CircularProgress'
import Verified from "../../assets/verified.svg"
import BronzeBadge from "../../assets/BronzeBadge.svg"
import GoldBadge from "../../assets/GoldBadge.svg"
import SilverBadge from "../../assets/SilverBadge.svg"
import Tick from "../../assets/tick.svg"



function StudentDashboard() {

    return (

        <DashboardLayout>
            <div className='grid grid-rows-10 h-full'>
                <div>
                    <div className="text-2xl font-semibold">Home</div>
                    <div className='text-zinc-500'>Student Dashboard</div>
                </div>
                <div className="row-span-9">
                    <div className='grid grid-rows-5 gap-y-6 h-full'>
                        <div className="row-span-2">
                            <div className="grid grid-cols-4 h-full gap-6">
                                <div>
                                    <StatCard number="30" title="Overall Performance" color="bg-sky-900" />
                                </div>
                                <div>
                                    <StatCard number="3" title="Ongoing Projects" color="bg-sky-700" />
                                </div>
                                <div className="col-span-2">
                                    <div className="border border-zinc-200 bg-white rounded-xl p-4 h-full">
                                        <div className="grid grid-rows-7">
                                            <div className="font-semibold text-xl">Notifications</div>
                                            <div className="row-span-6 overflow-y-scroll scrollbar-hide mt-4 h-full">
                                                <div className="flex border-b border-zinc-200 py-2 gap-4 justify-between">  
                                                    <div className="text-md">New Project Assigned !!</div>
                                                </div>
                                            </div>    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row-span-3">
                            <div className="grid grid-cols-4 h-full gap-6">
                                <div className="col-span-3">
                                    <div className="grid grid-rows-5 h-full gap-y-6">
                                        <div className="row-span-2 border border-zinc-200 bg-white rounded-xl p-4 h-full">
                                            <div className="flex justify-between">
                                                <div className='flex gap-6 items-center'>
                                                    <CircularProgress percentage={80} />
                                                    <div className='flex flex-col'>
                                                        <div className='text-2xl font-semibold'>You're so close!</div>
                                                        <div className='text-lg'>Finish up for the best experience.</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <button className="px-4 py-2 bg-sky-700 text-white rounded-lg hover:bg-sky-900 transition">
                                                        Update Profile
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-span-3 ">
                                            <div className="grid grid-cols-2 h-full gap-6">
                                                <div className="border border-zinc-200 bg-white rounded-xl p-4 ">
                                                <div className="grid grid-rows-7 h-full">
                                                    <div className="font-semibold text-xl">Your Certifications</div>
                                                    <div className="row-span-6 overflow-y-scroll scrollbar-hide">
                                                        <div className="flex border-b border-zinc-200 py-2 justify-between">
                                                            <div className="flex flex-col justify-between">
                                                                <div className="text-md font-medium">Certification Name</div>
                                                                <div className="text-sm">Issued By</div>
                                                            </div>
                                                            <div>
                                                                <img src={Verified} alt="verified icon" />
                                                            </div>
                                                        </div>

                                                        <div className="flex border-b border-zinc-200 py-2 justify-between">
                                                            <div className="flex flex-col justify-between">
                                                                <div className="text-md font-medium">Certification Name</div>
                                                                <div className="text-sm">Issued By</div>
                                                            </div>
                                                            <div>
                                                                <img src={Verified} alt="verified icon" />
                                                            </div>
                                                        </div>

                                                        <div className="flex border-b border-zinc-200 py-2 justify-between">
                                                            <div className="flex flex-col justify-between">
                                                                <div className="text-md font-medium">Certification Name</div>
                                                                <div className="text-sm">Issued By</div>
                                                            </div>
                                                            <div>
                                                                <img src={Verified} alt="verified icon" />
                                                            </div>
                                                        </div>

                                                    </div>    
                                                </div>

                                                </div>
                                                <div className="grid grid-rows-7 border border-zinc-200 bg-white rounded-xl p-4">
                                                    
                                                        <div className="font-semibold text-xl">Your Badges</div>
                                                        <div className="flex row-span-6 items-center justify-center gap-4">
                                                            <div className='flex flex-col gap-y-4'>
                                                                <img src={SilverBadge} alt="SilverBadge"/>
                                                                <div className="text-sm font-bold text-center">SILVER BADGE</div>
                                                            </div>

                                                            <div className='flex flex-col gap-y-4'>
                                                                <img src={GoldBadge} alt="GoldBadge"/>
                                                                <div className="text-sm font-bold text-center">GOLD BADGE</div>
                                                            </div>

                                                            <div className='flex flex-col gap-y-4'>
                                                                <img src={BronzeBadge} alt="BronzeBadge"/>
                                                                <div className="text-sm font-bold text-center">BRONZE BADGE</div>
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col border border-zinc-200 bg-white rounded-xl p-4 gap-5 justify-between'>
                                    <div className='grid grid-rows-5 gap-6 h-full'>
                                        <div className='text-5xl font-bold text-center'>1</div>
                                        <div className='flex flex-col'>
                                            <div className="text-center text-2xl font-semibold">Project Completed</div>
                                            <div className="text-center">Finish up for the best experience.</div>
                                        </div>
                                        <div className='row-span-3'>
                                            <div className="flex border-b border-zinc-200 py-2 justify-between">
                                                <div className="flex flex-col justify-between">
                                                    <div className="text-md font-medium">Project Title</div>
                                                    <div className="text-sm">Mentor</div>
                                                </div>
                                                <div>
                                                    <img src={Tick} alt="Completed Project" />
                                                </div>
                                            </div>

                                            <div className="flex border-b border-zinc-200 py-2 justify-between">
                                                <div className="flex flex-col justify-between">
                                                    <div className="text-md font-medium">Project Title</div>
                                                    <div className="text-sm">Mentor</div>
                                                </div>
                                                
                                                <div>
                                                    <span className="text-sm text-gray-600">90%</span>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                                                    </div>
                                                </div>
                                                
                                            </div>

                                            <div className="flex border-b border-zinc-200 py-2 justify-between">
                                                <div className="flex flex-col justify-between">
                                                    <div className="text-md font-medium">Project Title</div>
                                                    <div className="text-sm">Mentor</div>
                                                </div>
                                                <div>
                                                    <span className="text-sm text-gray-600 ">70%</span>
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
                </div>
            </div>
        </DashboardLayout>
      )
}

export default StudentDashboard