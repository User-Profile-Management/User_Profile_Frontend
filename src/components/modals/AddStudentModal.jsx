import React, { useState } from "react";
import userService from "../../service/userService";

const AddStudentModal = ({ isOpen, onClose }) => {
    const [studentData, setStudentData] = useState({
        fullName: "",
        dateOfBirth: "",
        contactNo: "",
        address: "",
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState(""); // Track error message
    const [errors, setErrors] = useState({}); // Track individual field errors

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData({ ...studentData, [name]: value });

        // Clear error when the user types
        setErrors({ ...errors, [name]: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};
        let hasError = false;

        // Check for empty fields
        for (const key in studentData) {
            if (!studentData[key]) {
                newErrors[key] = true;
                hasError = true;
            }
        }

        if (hasError) {
            setErrorMessage("Please fill in the required fields");
            setErrors(newErrors);
            return;
        }

        setErrorMessage(""); // Clear error message if all fields are filled

        const payload = { ...studentData, roleName: "STUDENT" };

        console.log("Submitting student data:", payload);

        try {
            const response = await userService.signup(payload);
            console.log("Student registered successfully:", response);
            alert("Student registered successfully!");
            onClose();
        } catch (error) {
            console.error("Registration error:", error);
            alert("Failed to register student. Please try again.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-brightness-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-[600px]">
                <h2 className="text-xl font-semibold">Add a Student</h2>
                <p className={`text-sm mb-4 ${errorMessage ? "text-red-500" : "text-gray-500"}`}>
                    {errorMessage || "Enter the details of the student"}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { label: "Name", name: "fullName", type: "text", placeholder: "Enter name" },
                        { label: "DOB", name: "dateOfBirth", type: "date" },
                        { label: "Mobile Number", name: "contactNo", type: "tel", placeholder: "Enter mobile number" },
                        { label: "Address", name: "address", type: "text", placeholder: "Enter address", isTextarea: true },
                        { label: "Email", name: "email", type: "email", placeholder: "Enter email address" },
                        { label: "Password", name: "password", type: "password", placeholder: "Enter password" }
                    ].map(({ label, name, type, placeholder, isTextarea }) => (
                        <div className="flex items-center" key={name}>
                            <label className="w-1/3 font-medium">{label}</label>
                            {isTextarea ? (
                                <textarea
                                    name={name}
                                    value={studentData[name]}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    className={`w-2/3 p-2 rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none ${errors[name] ? "border-red-500 border-2" : ""}`}
                                />
                            ) : (
                                <input
                                    type={type}
                                    name={name}
                                    value={studentData[name]}
                                    onChange={handleChange}
                                    placeholder={placeholder}
                                    className={`w-2/3 p-2 rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none ${errors[name] ? "border-red-500 border-2" : ""}`}
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={onClose}
                            className="bg-gray-200 text-black px-4 py-2 text-sm font-semibold rounded-md hover:bg-gray-300">
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
