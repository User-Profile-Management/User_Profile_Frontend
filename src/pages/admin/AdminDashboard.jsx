import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import StatCard from '../../components/StatCard';
import ListCard from '../../components/ListCard';
import AddButton from "../../assets/add-button.svg";
import Profile from "../../assets/profile-ListCard.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { studentsCountState, mentorsCountState, projectsCountState } from "../../state/recoilState";
import userService from "../../service/userService.jsx";
import projectService from "../../service/projectService.jsx";
import AddStudentModal from '../../components/modals/AddStudentModal.jsx';
import AddProjectModal from '../../components/modals/AddProjectModal.jsx';
import AddMentorModal from '../../components/modals/AddMentorModal.jsx';
function AdminDashboard() {
  
  const studentsCount = useRecoilValue(studentsCountState);
  const mentorsCount = useRecoilValue(mentorsCountState);
  const projectsCount = useRecoilValue(projectsCountState);
  const setStudentsCount = useSetRecoilState(studentsCountState);
  const setMentorsCount = useSetRecoilState(mentorsCountState);
  const setProjectsCount = useSetRecoilState(projectsCountState);


  const [StudentsList, setStudentsList] = useState([]);
  const [MentorsList, setMentorsList] = useState([]);
  const [ProjectsList, setProjectsList] = useState([]);

  const [modalType, setModalType] = useState(null);
  const handleAddClick = (title) => {
    if(title === "Student List"){
        setModalType("student");
    }
    else if(title === "Mentor List"){
        setModalType("mentor");
        console.log("no mentor")
    }
    else if(title === "Project List"){
        setModalType("project")
        console.log("no projects")
    }
    else{
        console.log("Error finding the modal");
    }
  }
  
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [students, mentors, projects] = await Promise.all([
          userService.getStudentsCount(),
          userService.getMentorsCount(),
          projectService.getProjectsCount()
        ]);
        setStudentsCount(students);
        setMentorsCount(mentors);
        setProjectsCount(projects);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };
    fetchCounts();
  }, [setStudentsCount, setMentorsCount, setProjectsCount]);

  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await userService.getStudentsList();
        setStudentsList(students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    const fetchMentors = async () => {
      try {
        const mentors = await userService.getMentorsList();
        setMentorsList(mentors);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    const fetchProjects = async () => {
      try {
        const projects = await projectService.getProjectsList();
        setProjectsList(projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchStudents();
    fetchMentors();
    fetchProjects();
  }, []);
  useEffect(() => {
    const fetchProjectsCount = async () => {
      try {
        console.log("[DEBUG] Fetching projects count...");
        const count = await projectService.getProjectsCount();
        console.log("[DEBUG] Projects count raw:", count);
        setProjectsCount(count);
      } catch (error) {
        console.error("Projects count error:", error);
        setProjectsCount(0);
      }
    };
    fetchProjectsCount();
  }, [setProjectsCount]);



useEffect(() => {
    const fetchProjectsList = async () => {
        try {
            console.log("[DEBUG] Fetching projects list...");
            const projects = await projectService.getProjectsList();
            console.log("[DEBUG] Projects list fetched:", projects); 
            setProjectsList(projects);
        } catch (error) {
            console.error("Projects list error:", error);
            setProjectsList([]);
        }
    };
    fetchProjectsList();
}, []);



const handleProjectAdded = async () => {
    try {
        console.log("Fetching updated projects list...");
        const updatedProjects = await projectService.getProjectsList();
        setProjectsList(updatedProjects); 
        setProjectsCount(updatedProjects.length); 
    } catch (error) {
        console.error("Error fetching updated projects:", error);
    }
};


  const handleDeleteProject = async (projectId) => {
    if (!projectId) {
        console.error("Error: Project ID is undefined!");
        return;
    }

    try {
        console.log(`Deleting project with ID: ${projectId}`);
        await projectService.deleteProject(projectId); 
        setProjectsList(prev => prev.filter(project => project.projectId !== projectId));
        setProjectsCount(prev => prev - 1);
    } catch (error) {
        console.error("Error deleting project:", error);
    }


};





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
              <StatCard number={studentsCount} title="Total Students" color="bg-cyan-600" />
              <ListCard title="Student List" items={StudentsList} showDelete={false} onAddClick={handleAddClick} />
            </div>

            <div className='grid grid-rows-5 gap-6 '>
              <StatCard number={mentorsCount} title="Total Mentors" color="bg-cyan-700" />
              <ListCard title="Mentor List" items={MentorsList} showDelete={false} onAddClick={handleAddClick} />
            </div>

            <div className='grid grid-rows-5 gap-6 '>
              <StatCard number={projectsCount} title="Total Projects" color="bg-cyan-800" />
              <ListCard title="Project List" items={ProjectsList} showDelete={true} onAddClick={handleAddClick} onDelete={handleDeleteProject} />
            </div>
          </div>
        </div>
      </div>
      {modalType === "student" && (
        <AddStudentModal isOpen={true} onClose={() => setModalType(null)} />
      )}
      {modalType === "mentor" && <AddMentorModal isOpen={true} onClose={() => setModalType(null)} />}
      
      {modalType === "project" && (
        <AddProjectModal 
            isOpen={true} 
            onClose={() => setModalType(null)} 
            onAdd={handleProjectAdded}  
        />
    )}
    </DashboardLayout>
  );

}
export default AdminDashboard;