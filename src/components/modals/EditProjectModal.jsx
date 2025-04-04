import React, { useState, useEffect } from "react";
import userService from "../../service/userService";
import projectService from "../../service/projectService";

const EditProjectModal = ({ isOpen, onClose, project, onUpdate }) => {
    const [projectData, setProjectData] = useState({
        projectName: "",
        mentor: "",
        projectId: "",  
    });
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        if (isOpen && project) {
            console.log("Received project:", project); 
            setProjectData({
                projectName: project.name,
                mentor: project.mentorId || "",  
                projectId: project.projectId,
            });
            fetchMentors();
        }
    }, [isOpen, project]);
    
    const fetchMentors = async () => {
        try {
            const response = await userService.getMentorsList();
            setMentors(response);
        } catch (error) {
            console.error("Error fetching mentors:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!projectData.projectName || !projectData.mentor) {
            alert("Please fill all fields before submitting.");
            return;
        }

        try {
            await projectService.updateProject(projectData.projectId, {
                projectName: projectData.projectName,
                mentorId: projectData.mentor,
            });
            alert("Project updated successfully!");
            onClose();
            onUpdate(); 
            setProjectData({ projectName: "", mentor: "", projectId: "" }); 
        } catch (error) {
            console.error("Error updating project:", error);
            alert("Failed to update project. Please try again.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-brightness-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-[700px] shadow-lg">
                <h2 className="text-xl font-semibold text-left">Edit Project</h2>
                <p className="text-sm text-gray-500 text-left mb-4">
                    Modify project details and assign a mentor.
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
                            className="w-2/3 p-2 border-gray-300 rounded-md focus:ring-2 focus:ring-zinc-200 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Select Mentor</label>
                        <select 
                            name="mentor"
                            value={projectData.mentor}
                            onChange={handleChange}
                            className="w-2/3 p-2 border-gray-300 rounded-md focus:ring-2 text-gray-900 focus:ring-zinc-200 focus:outline-none"
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
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="bg-gray-200 text-sm font-semibold text-black px-4 py-3 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="bg-blue-600 text-white text-sm font-semibold px-4 py-3 rounded-md hover:bg-blue-700"
                        >
                            Update Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProjectModal;
