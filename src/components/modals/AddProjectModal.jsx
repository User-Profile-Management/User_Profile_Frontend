import React, { useState } from "react";

const AddProjectModal = ({ isOpen, onClose, onAdd }) => {
    const [projectData, setProjectData] = useState({
        projectName: "",
        description: "",
        mentor: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!projectData.projectName || !projectData.description || !projectData.mentor) {
            alert("Please fill all fields before submitting.");
            return;
        }
        onAdd(projectData); 
        onClose();  
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
                            className="w-2/3 p-2 border-gray-300 rounded-md focus:ring-2 focus:ring-zinc-200 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Description</label>
                        <textarea 
                            name="description"
                            value={projectData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
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
                            <option value="Dr. Smith">Dr. Smith</option>
                            <option value="Prof. Johnson">Prof. Johnson</option>
                            <option value="Dr. Brown">Dr. Brown</option>
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
