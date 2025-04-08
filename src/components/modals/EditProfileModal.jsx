import React, { useState, useEffect } from "react";
import CertificateIcon from "../../assets/certificate.svg";

const EditProfileModal = ({ isOpen, onClose, onSave, userData }) => {
  const [profileData, setProfileData] = useState({
    name: userData.fullName,
    email: userData.email,
    address: "",
    phone: "",
    emergencyContact: "",
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfileData({ ...profileData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !profileData.address ||
      !profileData.phone ||
      !profileData.emergencyContact
    ) {
      alert("Please fill all the fields.");
      return;
    }
    onSave(profileData);
    onClose();

    setProfileData({
      name: userData.name || "",
      email: userData.email || "",
      address: "",
      phone: "",
      emergencyContact: "",
      profilePicture: null,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 backdrop-brightness-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-[700px]">
        <h2 className="text-xl font-semibold">Edit Profile</h2>
        <p className="text-sm text-gray-500 mb-4">
          Update your profile details and upload a profile picture.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center">
            <label className="w-1/3 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              disabled
              className="w-2/3 p-2 border-zinc-100 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              disabled
              className="w-2/3 p-2 border-zinc-100 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 font-medium">Address</label>
            <textarea
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              placeholder="Enter new address"
              className="w-2/3 p-2 border border-zinc-100 rounded-md focus:ring-2 focus:ring-zinc-300 focus:outline-none"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              placeholder="Enter new phone number"
              className="w-2/3 p-2 border border-zinc-100 rounded-md focus:ring-2 focus:ring-zinc-300 focus:outline-none"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 font-medium">Emergency Contact</label>
            <input
              type="text"
              name="emergencyContact"
              value={profileData.emergencyContact}
              onChange={handleChange}
              placeholder="Enter new emergency contact number"
              className="w-2/3 p-2 border border-zinc-100 rounded-md focus:ring-2 focus:ring-zinc-300 focus:outline-none"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 font-medium">Profile Picture</label>
            <div className="w-2/3 relative">
              <input
                type="file"
                accept="image/*"
                id="profilePicture"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="profilePicture"
                className="flex items-center w-full p-2 border border-zinc-100 rounded-md cursor-pointer text-gray-500 bg-white hover:bg-gray-100 focus:outline-none"
              >
                <img
                  src={CertificateIcon}
                  alt="Profile"
                  className="w-5 h-5 mr-2"
                />
                {profileData.profilePicture
                  ? profileData.profilePicture.name
                  : "Choose file"}
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-zinc-100 text-black px-4 py-3 text-sm font-semibold rounded-md hover:bg-zinc-200 "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-3 text-sm font-semibold rounded-md hover:bg-blue-700"
            >
              Update profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
