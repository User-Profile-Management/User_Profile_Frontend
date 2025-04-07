import React, { useState } from "react";
import AlertModal from "./AlertModal";


const AssignProjectModal = ({ isOpen, onClose, onAssign }) => {
    const [projectData, setProjectData] = useState({
        projectName: "",
        status: "",
    });
    const [alert, setAlert] = useState({
        isOpen: false,
        type: "info",
        title: "",
        message: "",
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!projectData.projectName || !projectData.status) {
            alert("Please select a project and status.");
            return;
        }
        onAssign(projectData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-[700px] shadow-lg">
                
                
                <h2 className="text-xl font-semibold text-left">Assign Project</h2>
                <p className="text-sm text-gray-800 text-left mb-4">
                    Allocate a new project and track progress efficiently.
                </p>

               
                <form onSubmit={handleSubmit} className="space-y-4">

                    
                    <div className="flex items-center">
                        <label className="w-1/3  font-medium">Project Name</label>
                        <select 
                            name="projectName" 
                            value={projectData.projectName} 
                            onChange={handleChange}
                            className="w-2/3 p-2 text-gray-500 border-gray-300 rounded-md focus:ring-2 focus:ring-zinc-200 focus:outline-none">
                            <option value="" disabled>Select project</option>
                            <option value="Project Alpha">ADS</option>
                            <option value="Project Beta">AI ML</option>
                            <option value="Project Gamma">DBMS</option>
                        </select>
                    </div>

                    
                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Status</label>
                        <select 
                            name="status" 
                            value={projectData.status} 
                            onChange={handleChange}
                            className="w-2/3 p-2 text-gray-500 border-gray-300 rounded-md focus:ring-2 focus:ring-zinc-200 focus:outline-none">
                            <option value="" disabled>Select status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    
                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={onClose}
                            className="bg-gray-200 text-sm font-semibold text-black px-4 py-3 rounded-md hover:bg-gray-300">
                            Cancel
                        </button>
                        <button type="submit"
                            className="bg-blue-600 text-white text-sm font-semibold px-4 py-3 rounded-md hover:bg-blue-700">
                            Assign Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignProjectModal;
