import React, { useState } from "react";

const AddMentorModal = ({ isOpen, onClose, onSave }) => {
    const [mentorData, setMentorData] = useState({
        name: "",
        dob: "",
        mobileNumber: "",
        address: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMentorData({ ...mentorData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!mentorData.name || !mentorData.dob || !mentorData.mobileNumber || 
            !mentorData.address || !mentorData.email || !mentorData.password) {
            alert("Please fill all the fields.");
            return;
        }
        onSave(mentorData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-[600px]">
                
                <h2 className="text-xl font-semibold">Add a Mentor</h2>
                <p className="text-sm text-gray-500 mb-4">Enter the details of the mentor</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={mentorData.name} 
                            onChange={handleChange}
                            placeholder="Enter name"
                            className="w-2/3 p-2 rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">DOB</label>
                        <input 
                            type="date" 
                            name="dob" 
                            value={mentorData.dob} 
                            onChange={handleChange}
                            className="w-2/3 p-2 rounded-md text-gray-400 focus:ring-2 focus:ring-gray-200 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Mobile Number</label>
                        <input 
                            type="tel" 
                            name="mobileNumber" 
                            value={mentorData.mobileNumber} 
                            onChange={handleChange}
                            placeholder="Enter mobile number"
                            className="w-2/3 p-2 rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Address</label>
                        <textarea 
                            type="text" 
                            name="address" 
                            value={mentorData.address} 
                            onChange={handleChange}
                            placeholder="Enter address"
                            className="w-2/3 p-2 rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={mentorData.email} 
                            onChange={handleChange}
                            placeholder="Enter email address"
                            className="w-2/3 p-2 rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={mentorData.password} 
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="w-2/3 p-2 rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none"
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={onClose}
                            className="bg-gray-200 text-black px-4 py-2 text-sm font-semibold rounded-md hover:bg-gray-300 ">
                            Cancel
                        </button>
                        <button type="submit"
                            className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold rounded-md hover:bg-blue-700">
                            Add Mentor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMentorModal;
