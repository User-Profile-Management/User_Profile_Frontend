import React, { useState } from "react";
import userService from "../../service/userService";

const AddMentorModal = ({ isOpen, onClose }) => {
  const [mentorData, setMentorData] = useState({
    fullName: "",
    dateOfBirth: "",
    contactNo: "",
    address: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMentorData({ ...mentorData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !mentorData.fullName ||
      !mentorData.dateOfBirth ||
      !mentorData.contactNo ||
      !mentorData.address ||
      !mentorData.email ||
      !mentorData.password
    ) {
      alert("Please fill all the fields.");
      return;
    }

    const payload = { ...mentorData, roleName: "MENTOR" };

    console.log("Submitting mentor data:", payload);

    try {
      const response = await userService.signup(payload);
      console.log("Mentor registered successfully:", response);
      alert("Mentor registered successfully!");
      onClose();
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to register mentor. Please try again.");
    }
  };

  if (!isOpen) return null;

    return (
        <div className="fixed inset-0  bg-opacity-50 z-50 backdrop-brightness-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-[600px]">
                
                <h2 className="text-xl font-semibold">Add a Mentor</h2>
                <p className="text-sm text-gray-500 mb-4">Enter the details of the mentor</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center">
            <label className="w-1/3 font-medium">Name</label>
            <input
              type="text"
              name="fullName"
              value={mentorData.fullName}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-2/3 p-2 border rounded-md text-black-300 focus:ring-2 focus:ring-gray-200 focus:outline-none"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 font-medium">DOB</label>
            <input
              type="date"
              name="dateOfBirth"
              value={mentorData.dateOfBirth}
              onChange={handleChange}
              className="w-2/3 p-2 border rounded-md text-black-300 focus:ring-2 focus:ring-gray-200 focus:outline-none"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 font-medium">Mobile Number</label>
            <input
              type="tel"
              name="contactNo"
              value={mentorData.contactNo}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="w-2/3 p-2 border rounded-md text-black-300 focus:ring-2 focus:ring-gray-200 focus:outline-none"
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
              className="w-2/3 p-2 border rounded-md text-black-300 focus:ring-2 focus:ring-gray-200 focus:outline-none"
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
              className="w-2/3 p-2 border rounded-md text-black-300 focus:ring-2 focus:ring-gray-200 focus:outline-none"
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
              className="w-2/3 p-2 border text-black-300 rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-black px-4 py-2 text-sm font-semibold rounded-md hover:bg-gray-300 "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold rounded-md hover:bg-blue-700"
            >
              Add Mentor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default AddMentorModal;
