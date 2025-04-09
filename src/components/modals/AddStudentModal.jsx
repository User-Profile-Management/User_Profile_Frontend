import React, { useState } from "react";
import userService from "../../service/userService";
import AlertModal from "./AlertModal";

const AddStudentModal = ({ isOpen, onClose }) => {
  const [studentData, setStudentData] = useState({
    fullName: "",
    dateOfBirth: "",
    contactNo: "",
    address: "",
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    let hasError = false;

    for (const key in studentData) {
      if (!studentData[key]) {
        newErrors[key] = true;
        hasError = true;
      }
    }

    if (hasError) {
      setErrorMessage("Please fill in all the fields");
      setErrors(newErrors);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(studentData.email)) {
      setErrorMessage("Please enter a valid email address");
      setErrors({ ...newErrors, email: true });
      return;
    }

    if (studentData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      setErrors({ ...newErrors, password: true });
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(studentData.contactNo)) {
      setErrorMessage("Please enter a valid 10-digit mobile number");
      setErrors({ ...newErrors, contactNo: true });
      return;
    }

    setErrorMessage("");

    const payload = { ...studentData, roleName: "STUDENT" };

    try {
      const response = await userService.signup(payload);
      console.log("Student registered successfully:", response);
      setAlert({
        isOpen: true,
        type: "success",
        title: "Success",
        message: "Student registered successfully",
      });
      onClose();
    } catch (error) {
      console.error("Registration error:", error);
      setAlert({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Failed to register student. Please try again.",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-brightness-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-[600px]">
        <h2 className="text-xl font-semibold">Add a Student</h2>
        <p
          className={`text-sm mb-4 ${
            errorMessage ? "text-red-500" : "text-gray-500"
          }`}
        >
          {errorMessage || "Enter the details of the student"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center">
            <label className="w-1/3 font-medium">Name</label>
            <input
              type="text"
              name="fullName"
              value={studentData.fullName}
              onChange={handleChange}
              placeholder="Enter name"
              className={`w-2/3 p-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none ${
                errors.fullName ? "border-red-500" : "text-gray-500"
              }`}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 font-medium">DOB</label>
            <input
              type="date"
              name="dateOfBirth"
              value={studentData.dateOfBirth}
              onChange={handleChange}
              className={`w-2/3 p-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none ${
                errors.dateOfBirth ? "border-red-500" : "text-gray-500"
              }`}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 font-medium">Mobile Number</label>
            <input
              type="tel"
              name="contactNo"
              value={studentData.contactNo}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className={`w-2/3 p-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none ${
                errors.contactNo ? "border-red-500" : "text-gray-500"
              }`}
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
              className={`w-2/3 p-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none ${
                errors.address ? "border-red-500" : "text-gray-500"
              }`}
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
              className={`w-2/3 p-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none ${
                errors.email ? "border-red-500" : "text-gray-500"
              }`}
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
              className={`w-2/3 p-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none ${
                errors.password ? "border-red-500" : "text-gray-500"
              }`}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-black px-4 py-2 text-sm font-semibold rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold rounded-md hover:bg-blue-700"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
      <AlertModal
        isOpen={alert.isOpen}
        onClose={() => setAlert({ ...alert, isOpen: false })}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        autoClose={false}
      />
    </div>
  );
};

export default AddStudentModal;
