import React, { useState } from "react";
import UploadCertificateModal from "../components/modals/UploadCertificateModal.jsx";
import AssignProjectModal from "../components/modals/AssignProjectModal.jsx";
import AddProjectModal from "../components/modals/AddProjectModal.jsx";
import DeleteProjectModal from "../components/modals/DeleteProjectModal.jsx";
import EditProfileModal from "../components/modals/EditProfileModal.jsx";
import AddStudentModal from "../components/modals/AddStudentModal.jsx";  
import AddMentorModal from "../components/modals/AddMentorModal.jsx";
import WarningModal from "../components/modals/WarningModal.jsx";
import DeleteUserModal from "../components/modals/DeleteUserModal.jsx";
import EditProjectModal from "../components/modals/EditProjectModal.jsx"; 



const Dashboard = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [certificates, setCertificates] = useState([]);

    const [isWarningOpen, setIsWarningOpen] = useState(false);

    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [assignedProjects, setAssignedProjects] = useState([]);

    const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    
    const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState(null);


    const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
    const [Projects, setProjects] = useState([]);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    const [isAddMentorModalOpen, setIsAddMentorModalOpen] = useState(false);
    const [mentors, setMentors] = useState([]);

    const handleSaveMentor = (newMentor) => {
        setMentors([...mentors, newMentor]);
        console.log("Added Mentor:", newMentor);
    };


    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const [profile, setProfile] = useState({
        name: "Walter White", 
        email: "walterwhite@example.com",
        address: "",
        phone: "",
        emergencyContact: "",
        profilePicture: null,
    });

    
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
    const [students, setStudents] = useState([]);

    
    const handleSaveStudent = (newStudent) => {
        setStudents([...students, newStudent]);
        console.log("Added Student:", newStudent);
    };

    const handleUpload = (newCertificate) => {
        setCertificates([...certificates, newCertificate]);
        console.log("Uploaded Certificate:", newCertificate);
    };

    const handleAssignProject = (newProject) => {
        setAssignedProjects([...assignedProjects, newProject]);
        console.log("Assigned Project:", newProject);
    };

    const handleAddProject = (newProject) => {
        setProjects([...Projects, newProject]);
        console.log("Added Project:", newProject);
    };

    const handleDeleteUser = () => {
        setStudents(students.filter(student => student !== userToDelete));
        setIsDeleteUserModalOpen(false);
        console.log("Deleted User:", userToDelete);
    };
    

    const handleDeleteProject = () => {
        setProjects(Projects.filter(proj => proj !== projectToDelete));
        setIsDeleteModalOpen(false);
        console.log("Deleted Project:", projectToDelete);
    };

    const handleSaveProfile = (updatedProfile) => {
        setProfile(updatedProfile);
        console.log("Updated Profile:", updatedProfile);
    };

    


   

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            
            <button onClick={() => setIsAddStudentModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-4">
                Add Student
            </button>

            <button onClick={() => setIsAddMentorModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">
                Add Mentor
            </button>

            <button onClick={() => setIsWarningOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                Show Warning
            </button>

            <button 
                onClick={() => setIsDeleteUserModalOpen(true)} 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-4">
                Delete User
            </button>

            <button 
                onClick={() => setIsDeleteModalOpen(true)} 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-4">
            
                Delete Project
            </button>
        
            
            




            <button onClick={() => setIsUploadModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-4">
                Upload Certificate
            </button>

            <button onClick={() => setIsAssignModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Assign Project
            </button>

            <button onClick={() => setIsAddProjectModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add Project
            </button>

            <button onClick={() => setIsEditProfileModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mt-4">
                Edit Profile
            </button>

           


            
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Students</h2>
                {students.length > 0 ? (
                    <ul>
                        {students.map((student, index) => (
                            <li key={index} className="bg-gray-100 p-3 rounded-md mt-2">
                                <p><strong>Name:</strong> {student.name}</p>
                                <p><strong>DOB:</strong> {student.dob}</p>
                                <p><strong>Mobile:</strong> {student.mobileNumber}</p>
                                <p><strong>Email:</strong> {student.email}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 mt-2">No students added yet.</p>
                )}
            </div>

            
            <AddStudentModal
                isOpen={isAddStudentModalOpen}
                onClose={() => setIsAddStudentModalOpen(false)}
                onSave={handleSaveStudent}
            />

            <AddMentorModal
                isOpen={isAddMentorModalOpen}
                onClose={() => setIsAddMentorModalOpen(false)}
                onSave={handleSaveMentor}
            />


            <UploadCertificateModal 
                isOpen={isUploadModalOpen} 
                onClose={() => setIsUploadModalOpen(false)} 
                onUpload={handleUpload} 
            />

           

            <AssignProjectModal 
                isOpen={isAssignModalOpen} 
                onClose={() => setIsAssignModalOpen(false)} 
                onAssign={handleAssignProject} 
            />

            <AddProjectModal 
                isOpen={isAddProjectModalOpen} 
                onClose={() => setIsAddProjectModalOpen(false)} 
                onAdd={handleAddProject} 
            />

            <WarningModal 
            isOpen={isWarningOpen} onClose={() => setIsWarningOpen(false)} 
            />

            <DeleteUserModal
                isOpen={isDeleteUserModalOpen}
                onClose={() => setIsDeleteUserModalOpen(false)}
                onDelete={handleDeleteUser}
            />



            <DeleteProjectModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDeleteProject}
            />

            <EditProfileModal 
                isOpen={isEditProfileModalOpen} 
                onClose={() => setIsEditProfileModalOpen(false)} 
                onSave={handleSaveProfile} 
                userData={profile} 
            />

           
        </div>
    );
};

export default Dashboard;
