import React,{useEffect,useState} from 'react';
import DashboardLayout from '../../layout/DashboardLayout'
import StatCard from '../../components/StatCard'
import AddButton from "../../assets/add-button.svg"
import Profile from "../../assets/profile-ListCard.svg"
import ListCard from '../../components/ListCard'
import authService from '../../service/authService'

function AdminDashboard() {
    const [StudentsCount, setStudentsCount] = useState(0);
    useEffect(() => {
        const fetchStudentsCount = async () => {
            const count = await authService.getStudentsCount();
            setStudentsCount(count);
        };
    fetchStudentsCount();
    }, []);

    const [MentorsCount, setMentorsCount] = useState(0);
    useEffect(() => {
        const fetchMentorsCount = async () => {
            const count = await authService.getMentorsCount();
            setMentorsCount(count);
        };
    fetchMentorsCount();
    }, []);

    const [ProjectsCount, setProjectsCount] = useState(0);
    useEffect(() => {
        const fetchProjectsCount = async () => {
            const count = await authService.getProjectsCount();
            setProjectsCount(count);
        };
    fetchProjectsCount();
    }, []);

    const [StudentsList, setStudentsList] = useState([]);
    useEffect(() => {
        const fetchStudentsList = async () => {
            const students = await authService.getStudentsList();
            console.log("Fetched Students List:", students);
            setStudentsList(students);
        };
    fetchStudentsList();
    }, []);

    const [MentorsList, setMentorsList] = useState([]);
    useEffect(() => {
        const fetchMentorsList = async () => {
            const mentors = await authService.getMentorsList();
            console.log("Fetched Mentors List:", mentors);
            setMentorsList(mentors);
        };  
    fetchMentorsList();
    }, []);

    const [ProjectsList, setProjectsList] = useState([]);
    useEffect(() => {
        const fetchProjectsList = async () => {
            const projects = await authService.getProjectsList();
            console.log("FetchedProjectss List:", projects);
            setProjectsList(projects);
        };
    fetchProjectsList();
    }, []);



   

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
                            <StatCard number={StudentsCount} title="Total Students" color="bg-cyan-600" />
                            <ListCard title="Student List" items={StudentsList} showDelete={false}/>
                        </div>

                        <div className='grid grid-rows-5 gap-6 '>
                            <StatCard number={MentorsCount} title="Total Mentors" color="bg-cyan-700" />
                            <ListCard title="Mentor List" items={MentorsList} showDelete={false}/>
                        </div>
                        <div className='grid grid-rows-5 gap-6 '>
                            <StatCard number={ProjectsCount} title="Total Projects" color="bg-cyan-800" />
                            <ListCard title="Project List" items={ProjectsList} showDelete={true}/>

                            
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
      )
    
}

export default AdminDashboard