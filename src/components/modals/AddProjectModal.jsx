import React, { useState } from "react";

const AddProjectModal = ({ isOpen, onClose, onAdd }) => {
    const [projectData, setProjectData] = useState({
        projectName: "",
        description: "",
        mentor: "",
    });

    const [searchTerm, setSearchTerm] = useState("");
    const mentors = ["Dr. Smith", "Prof. Johnson", "Dr. Brown", "Dr. Williams", "Dr. Miller"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleMentorSelect = (mentor) => {
        setProjectData({ ...projectData, mentor });
        setSearchTerm(""); // Clear search after selecting
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

                    {/* Searchable Mentor Dropdown */}
                    <div className="flex items-center relative">
                        <label className="w-1/3 font-medium">Select Mentor</label>
                        <div className="w-2/3 relative">
                            <input
                                type="text"
                                value={searchTerm || projectData.mentor}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search mentor..."
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 text-gray-900 focus:ring-zinc-200 focus:outline-none"
                            />
                            {searchTerm && (
                                <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                                    {mentors
                                        .filter((mentor) => mentor.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((mentor, index) => (
                                            <div 
                                                key={index} 
                                                onClick={() => handleMentorSelect(mentor)}
                                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                {mentor}
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
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
