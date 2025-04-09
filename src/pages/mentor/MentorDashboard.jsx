import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { selectedStudentState } from '../../state/recoilState';
import userService from "../../service/userService";
import { studentsListState } from "../../state/recoilState";
import DashboardLayout from '../../layout/DashboardLayout.jsx';
import Profile from "../../assets/profile-ListCard.svg";
import SearchIcon from "../../assets/search.png";
import FilterIcon from "../../assets/filter.svg";
import { useSetRecoilState } from 'recoil';


function MentorDashboard() {
    const [students, setStudents] = useRecoilState(studentsListState);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const setSelectedStudent = useSetRecoilState(selectedStudentState);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                const studentsData = await userService.getStudentsList();
                setStudents(studentsData);
            } catch (err) {
                console.error("Error fetching students list:", err);
                setError("Failed to load students.");
                setStudents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [setStudents]);

    
    const filteredStudents = useMemo(() => {
        return students.filter(student =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.userId.includes(searchQuery)
        );
    }, [students, searchQuery]);

    return (
        <DashboardLayout>
            <div className="grid grid-rows-10 h-full">
                <div className='flex items-center' >Home</div>
                <div className="row-span-9 h-full">
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
                                        placeholder="Search by name or admission no" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border-1 bg-white border-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100"
                                    />
                                </div>
                                {/* <div>
                                    <img className='w-6 h-6' src={FilterIcon} alt="Filter" />
                                </div> */}
                            </div>
                        </div>
                        <div className='grid grid-cols-6 items-center px-10 bg-zinc-100 justify-between'>
                            <div>Sl No</div>
                            <div>Name</div>
                            <div className='text-center'>Admission No</div>
                            <div className='text-center'>Projects Enrolled</div>
                            <div className='text-center'>Overall Performance</div>
                            <div className='text-center'>Action</div>
                        </div>

                        <div className="row-span-8 overflow-y-auto scrollbar-hide h-full">
                            {loading ? (
                                <div className="text-center p-4 text-gray-500">Loading...</div>
                            ) : error ? (
                                <div className="text-center p-4 text-red-500">{error}</div>
                            ) : filteredStudents.length > 0 ? (
                                filteredStudents.map((student, index) => (
                                    <div key={student.userId} className="grid grid-cols-6 gap-4 items-center bg-white p-3 px-10 border-b border-gray-200 hover:bg-gray-50">
                                        <div>{index + 1}</div>
                                        <div className="flex items-center gap-2">
                                            <img src={student.image} alt="Profile" className="w-9 h-9 rounded-lg border border-zinc-100 p-1 object-contain" />
                                            <span>{student.name}</span>
                                        </div>
                                        <div className='text-center'>{student.userId}</div>
                                        <div className='text-center'>{student.projects || 0}</div>
                                        <div className="text-center">
                                            <span className="px-14 text-sm text-gray-600">{student.performance || 0}%</span>
                                            <div className='px-14'>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${student.performance || 0}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-center'>
                                            <button
                                                onClick={() => {
                                                    setSelectedStudent(student);
                                                    navigate(`/mentor-student-profile/${student.userId}`); // <-- student.id or student.userId, depending on your structure
                                                }}                                                
                                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md"
                                                >
                                                View More
                                            </button>
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
