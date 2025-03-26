import React,{useState}from 'react'
import DashboardLayout from '../../layout/DashboardLayout.jsx'
import SearchIcon from "../../assets/search.png";
import FilterIcon from "../../assets/filter.svg";

const students = [
    { id: 1, name: 'Ken Adams', admissionNo: '165389', projects: 4, performance: 80 },
    { id: 2, name: 'Regina Phalange', admissionNo: '165390', projects: 3, performance: 75 },
    { id: 3, name: 'Rachel Green', admissionNo: '165391', projects: 5, performance: 85 },
    { id: 4, name: 'Chandler Bing', admissionNo: '165392', projects: 2, performance: 70 },
    { id: 5, name: 'Monica Geller', admissionNo: '165393', projects: 6, performance: 90 },
    { id: 6, name: 'Phoebe Buffay', admissionNo: '165394', projects: 6, performance: 90 },
    { id: 7, name: 'Ursula Buffay', admissionNo: '165395', projects: 2, performance: 50 },
    { id: 8, name: 'Ross Geller', admissionNo: '165396', projects: 5, performance: 95 },
    { id: 9, name: 'Joey Tribbiani', admissionNo: '165397', projects: 6, performance: 90 },
    { id: 10, name: 'Ben Geller', admissionNo: '165398', projects: 4, performance: 60 },


];

function MentorDashboard() {

    const [searchQuery, setSearchQuery] = useState('');
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.admissionNo.includes(searchQuery));

    return (
        <DashboardLayout>
             <div className="grid grid-rows-10 h-full">
                <div className='flex items-center'> 
                    Home 
                </div>
                <div className="row-span-9 h-full ">
                    <div className="grid grid-rows-11 h-full">
                        <div className='flex justify-between items-center p-4'>
                        <div className="text-2xl font-semibold">Students List</div>
                        <div className="relative w-full max-w-lg flex items-center gap-4">
                            <div className='relative flex-1 flex items-center'>
                                <img 
                                    src={SearchIcon}  
                                    alt="Search" 
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Search by name or admmission no" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2  border-1 border-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100"
                                />
                            </div>
                            <div>
                                <img className='w-6 h-6' src={FilterIcon} alt="Filter" />
                            </div>
                        </div>
                        </div>
                        <div className='grid grid-cols-6 items-center px-10 bg-zinc-100 justify-between'>
                            <div className=''>Sl No </div>
                            <div>Name</div>
                            <div className='text-center'>Addmission no</div>
                            <div className='text-center'>Projects entrolled</div>
                            <div className='text-center'>Overall Performance</div>
                            <div className='text-center'>Action</div>
                        </div>
                       

                        
                        <div className="row-span-8 overflow-y-auto scrollbar-hide h-full">

                        {filteredStudents.length > 0 ? (
                                filteredStudents.map((student, index) => (
                                <div key={student.id} className="grid grid-cols-6 gap-4 items-center bg-white p-3 px-10 border-b border-gray-200 hover:bg-gray-50">
                                    <div className=''>{index + 1}</div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div> 
                                        <span>{student.name}</span>
                                    </div>
                                    <div className='text-center'>{student.admissionNo}</div>
                                    <div className='text-center'>{student.projects}</div>
                                    <div> 
                                        <span className=" px-14 text-sm text-gray-600 w-20">{student.performance}%</span>
                                        <div className='px-14'>
                                            <div className="w-full bg-gray-200  rounded-full h-2 ">
                                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${student.performance}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-center'>
                                        <div className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md">
                                                          View More
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center p-4 text-gray-500">No students found.</div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default MentorDashboard;
