import React, { useState } from "react";

const EditProjectModal = ({ isOpen, onClose, onEdit, project }) => {
    const [status, setStatus] = useState(project.status);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!status) {
            alert("Please select a status before submitting.");
            return;
        }
        onEdit({ ...project, status });
        onClose();
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            alert("Project Deleted!");
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-[700px] shadow-lg">
                <h2 className="text-xl font-semibold text-left">Edit Project</h2>
                <p className="text-sm text-gray-800 text-left mb-4">
                    Update the current status seamlessly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Project Name</label>
                        <input
                            type="text"
                            name="projectName"
                            value="Random Project Name" 
                            readOnly
                            className="w-2/3 p-2 text-gray-500 border-gray-300 rounded-md focus:ring-2 focus:ring-zinc-200 focus:outline-none bg-gray-100"
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Status</label>
                        <select
                            name="status"
                            value={status}
                            onChange={handleStatusChange}
                            className="w-2/3 p-2 text-gray-500 border-gray-300 rounded-md focus:ring-2 focus:ring-zinc-200 focus:outline-none"
                        >
                            <option value="" disabled>Select status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-sm font-semibold text-black px-4 py-3 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-600 text-white text-sm font-semibold px-4 py-3 rounded-md hover:bg-red-700"
                        >
                            Delete Project
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white text-sm font-semibold px-4 py-3 rounded-md hover:bg-blue-700"
                        >
                            Edit Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProjectModal;
