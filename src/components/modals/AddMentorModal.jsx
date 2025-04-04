import React, { useState } from "react";
import userService from "../../service/userService";

const SuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-brightness-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-sm text-center">
                <h2 className="text-xl font-semibold text-green-600">Success!</h2>
                <p className="text-gray-600">Mentor added successfully.</p>
                <button onClick={onClose} className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-700">
                    OK
                </button>
            </div>
        </div>
    );
};

const AddMentorModal = ({ isOpen, onClose }) => {
    const [mentorData, setMentorData] = useState({
        fullName: "",
        dateOfBirth: "",
        contactNo: "",
        address: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMentorData({ ...mentorData, [name]: value });
        setErrors({ ...errors, [name]: value.trim() === "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};
        let hasError = false;

        for (let key in mentorData) {
            if (!mentorData[key].trim()) {
                newErrors[key] = true;
                hasError = true;
            }
        }

        setErrors(newErrors);

        if (hasError) {
            setErrorMessage("Please fill in the required fields");
            return;
        }

        setErrorMessage("");

        const payload = { ...mentorData, roleName: "MENTOR" };
        console.log("Submitting mentor data:", payload);

        try {
            const response = await userService.signup(payload);
            console.log("Mentor registered successfully:", response);
            onClose(); // Close AddMentorModal
            setIsSuccessModalOpen(true); // Open SuccessModal
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-opacity-50 backdrop-brightness-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-full max-w-[600px]">
                    <h2 className="text-xl font-semibold">Add a Mentor</h2>
                    <p className={`text-sm mb-4 ${errorMessage ? "text-red-600" : "text-gray-500"}`}>
                        {errorMessage || "Enter the details of the mentor"}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex items-center">
                            <label className="w-1/3 font-medium">Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={mentorData.fullName}
                                onChange={handleChange}
                                placeholder="Enter name"
                                className={`w-2/3 p-2 rounded-md ${errors.fullName ? "border border-red-500" : ""}`}
                            />
                        </div>

                        <div className="flex items-center">
                            <label className="w-1/3 font-medium">DOB</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={mentorData.dateOfBirth}
                                onChange={handleChange}
                                className={`w-2/3 p-2 rounded-md ${errors.dateOfBirth ? "border border-red-500" : ""}`}
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
                                className={`w-2/3 p-2 rounded-md ${errors.contactNo ? "border border-red-500" : ""}`}
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
                                className={`w-2/3 p-2 rounded-md ${errors.address ? "border border-red-500" : ""}`}
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
                                className={`w-2/3 p-2 rounded-md ${errors.email ? "border border-red-500" : ""}`}
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
                                className={`w-2/3 p-2 rounded-md ${errors.password ? "border border-red-500" : ""}`}
                            />
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button type="button" onClick={onClose}
                                className="bg-gray-200 text-black px-4 py-2 text-sm font-semibold rounded-md hover:bg-gray-300">
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

            {/* Success Modal */}
            <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
        </>
    );
};

export default AddMentorModal;
