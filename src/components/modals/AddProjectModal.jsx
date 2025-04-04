import React, { useState, useEffect } from "react";
import userService from "../../service/userService";
import projectService from "../../service/projectService";

const AddProjectModal = ({ isOpen, onClose, onAdd }) => {
    const [projectData, setProjectData] = useState({
        projectName: "",
        description: "",
        mentor: "",
    });
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        if (isOpen) {
            fetchMentors();
        }
    }, [isOpen]);

    const fetchMentors = async () => {
        try {
            const response = await userService.getMentorsList();
            if (response.length) {
                setMentors(response); 
            }
        } catch (error) {
            console.error("Error fetching mentors:", error);
        }
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!projectData.projectName || !projectData.description || !projectData.mentor) {
            alert("Please fill all fields before submitting.");
            return;
        }
    
        const payload = {
            projectName: projectData.projectName,
            description: projectData.description,
            mentorId: projectData.mentor,
        };
    
        try {
            const response = await projectService.addProject(payload);
            console.log("Project added successfully:", response);
            alert("Project added successfully!");
            onClose();
            onAdd();  
        } catch (error) {
            console.error("Error adding project:", error);
            alert("Failed to add project. Please try again.");
        }
    };
    
    
    
    
    

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-brightness-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-[700px] shadow-lg">
                <h2 className="text-xl font-semibold text-left">Add Project</h2>
                <p className="text-sm text-gray-500 text-left mb-4">
                    Allocate a new project and track progress efficiently.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Project Name</label>
                        <input 
                            type="text"
                            name="projectName"
                            value={projectData.projectName}
                            onChange={handleChange}
                            placeholder="Enter project"
                            className="w-2/3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-zinc-200 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Description</label>
                        <textarea 
                            name="description"
                            value={projectData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            className="w-2/3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-zinc-200 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Select Mentor</label>
                        <select 
                            name="mentor"
                            value={projectData.mentor}
                            onChange={handleChange}
                            className="w-2/3 p-2 border border-gray-300 rounded-md focus:ring-2 text-gray-900 focus:ring-zinc-200 focus:outline-none"
                        >
                            <option value="" disabled>Select mentor</option>
                            {mentors.map((mentor) => (
                               <option key={mentor.userId} value={mentor.userId}>
                               {mentor.name}
                           </option>
                           
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={onClose}
                            className="bg-gray-300 text-sm font-semibold text-black px-4 py-3 rounded-md hover:bg-gray-400">
                            Cancel
                        </button>
                        <button type="submit"
                            className="bg-blue-600 text-white text-sm font-semibold px-4 py-3 rounded-md hover:bg-blue-700">
                            Add Project
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
        
    );
};

export default AddProjectModal;
