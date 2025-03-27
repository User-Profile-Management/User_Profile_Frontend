import React, { useState } from "react";

const EditProjectModal = ({ isOpen, onClose, onEdit }) => {
    const [projectData, setProjectData] = useState({
        mentorName: "",
        projectName: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!projectData.mentorName || !projectData.projectName) {
            alert("Please select a mentor and project.");
            return;
        }
        onEdit(projectData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-[700px] shadow-lg">
                
                <h2 className="text-xl font-semibold text-left">Edit Project</h2>
                <p className="text-sm text-gray-800 text-left mb-4">
                    Update project details and monitor progress effectively.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    
                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Mentor Name</label>
                        <select 
                            name="mentorName" 
                            value={projectData.mentorName} 
                            onChange={handleChange}
                            className="w-2/3 p-2 text-gray-500 border-gray-300 rounded-md focus:ring-2 focus:ring-zinc-200 focus:outline-none">
                            <option value="" disabled>Select mentor</option>
                            <option value="Dr. Smith">Dr. Smith</option>
                            <option value="Prof. Johnson">Prof. Johnson</option>
                            <option value="Dr. Lee">Dr. Lee</option>
                        </select>
                    </div>

                    
                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Project Name</label>
                        <select 
                            name="projectName" 
                            value={projectData.projectName} 
                            onChange={handleChange}
                            className="w-2/3 p-2 text-gray-500 border-gray-300 rounded-md focus:ring-2 focus:ring-zinc-200 focus:outline-none">
                            <option value="" disabled>Select project</option>
                            <option value="ADS">ADS</option>
                            <option value="AI ML">AI ML</option>
                            <option value="DBMS">DBMS</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={onClose}
                            className="bg-gray-300 text-sm font-semibold text-black px-4 py-3 rounded-md hover:bg-gray-400">
                            Cancel
                        </button>
                        <button type="submit"
                            className="bg-blue-600 text-white text-sm font-semibold px-4 py-3 rounded-md hover:bg-blue-700">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProjectModal;
