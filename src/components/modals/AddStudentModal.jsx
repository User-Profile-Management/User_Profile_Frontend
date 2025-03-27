import React, { useState } from "react";

const AddStudentModal = ({ isOpen, onClose, onSave }) => {
    const [studentData, setStudentData] = useState({
        name: "",
        dob: "",
        mobileNumber: "",
        address: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData({ ...studentData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!studentData.name || !studentData.dob || !studentData.mobileNumber || 
            !studentData.address || !studentData.email || !studentData.password) {
            alert("Please fill all the fields.");
            return;
        }
        onSave(studentData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-[600px]">
                
                <h2 className="text-xl font-semibold">Add a Student</h2>
                <p className="text-sm text-gray-500 mb-4">Enter the details of the student</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    
                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={studentData.name} 
                            onChange={handleChange}
                            placeholder="Enter name"
                            className="w-2/3 p-2  rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none"
                        />
                    </div>

                    
                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">DOB</label>
                        <input 
                            type="date" 
                            name="dob" 
                            value={studentData.dob} 
                            onChange={handleChange}
                            className="w-2/3 p-2  rounded-md text-gray-400 focus:ring-2 focus:ring-gray-200 focus:outline-none"
                           
                        />
                    </div>


                    
                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Mobile Number</label>
                        <input 
                            type="tel" 
                            name="mobileNumber" 
                            value={studentData.mobileNumber} 
                            onChange={handleChange}
                            placeholder="Enter mobile number"
                            className="w-2/3 p-2  rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none"
                        />
                    </div>

                    
                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Address</label>
                        <textarea 
                            type="text" 
                            name="address" 
                            value={studentData.address} 
                            onChange={handleChange}
                            placeholder="Enter address"
                            className="w-2/3 p-2  rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none"
                        />
                    </div>

                    
                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={studentData.email} 
                            onChange={handleChange}
                            placeholder="Enter email address"
                            className="w-2/3 p-2  rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none"
                        />
                    </div>

                    
                    <div className="flex items-center">
                        <label className="w-1/3 font-medium">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={studentData.password} 
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="w-2/3 p-2  rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none"
                        />
                    </div>

                    
                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={onClose}
                            className="bg-gray-200 text-black px-4 py-2 text-sm font-semibold rounded-md hover:bg-gray-300 ">
                            Cancel
                        </button>
                        <button type="submit"
                            className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold rounded-md hover:bg-blue-700">
                            Add Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudentModal;
