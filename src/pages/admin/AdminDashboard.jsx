import React from 'react'
import DashboardLayout from '../../layout/DashboardLayout'
import StatCard from '../../components/StatCard'
import Profile from "../../assets/profile-ListCard.svg"
import ListCard from '../../components/ListCard'

function AdminDashboard() {

    const students = [
        { name: 'John Doe', subtitle: 'Admission No: 12345', image: Profile },
        { name: 'Jane Smith', subtitle: 'Admission No: 67890', image: Profile },
        { name: 'John Doe', subtitle: 'Admission No: 12345', image: Profile },
        { name: 'Jane Smith', subtitle: 'Admission No: 67890', image: Profile },
        { name: 'John Doe', subtitle: 'Admission No: 12345', image: Profile },
        { name: 'Jane Smith', subtitle: 'Admission No: 67890', image: Profile },
        { name: 'John Doe', subtitle: 'Admission No: 12345', image: Profile },
        { name: 'Jane Smith', subtitle: 'Admission No: 67890', image: Profile }
      ];

    return (

        <DashboardLayout>
            <div className='grid grid-rows-10 h-full'>
                <div>
                    <div className="text-2xl font-semibold">Home</div>
                    <div className='text-zinc-500'>Admin Dashboard</div>
                </div>
                <div className="row-span-9">
                    <div className="grid grid-cols-3 gap-6 h-full">

                        <div className='grid grid-rows-5 gap-6 '>
                            <div className="row-span-2 ">
                                <StatCard number="37" title="Total Students" color="bg-cyan-600" />
                            </div>
                            <div className="row-span-3">
                                <ListCard title="Student List" items={students} showDelete={false}/>
                            </div>
                        </div>
                        
                        <div className='grid grid-rows-5 gap-6 '>
                            <div className="row-span-2 ">
                                <StatCard number="8" title="Total Mentors" color="bg-cyan-700" />   
                            </div>
                            <div className="row-span-3">
                                <ListCard title="Mentor List" items={students} showDelete={false}/>
                            </div>
                        </div>

                        <div className='grid grid-rows-5 gap-6 '>

                            <div className="row-span-2 ">
                                <StatCard number="20" title="Total Projects" color="bg-cyan-800" />
                            </div>
                            <div className="row-span-3">
                                <ListCard title="Project List" items={students} showDelete={true}/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
      )
    
}

export default AdminDashboard