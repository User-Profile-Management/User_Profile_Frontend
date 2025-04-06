import React, { useState } from "react";
import CertificateIcon from "../../assets/certificate.svg";
import ConfirmationModal from "./ConfirmationModal";

const UploadCertificateModal = ({ isOpen, onClose, onUpload }) => {
  const [certificateData, setCertificateData] = useState({
    name: "",
    issuedBy: "",
    certificateFile: null,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificateData({ ...certificateData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/jpg",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF and image files (PNG, JPG) are allowed.");
        return;
      }
      setCertificateData({ ...certificateData, certificateFile: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !certificateData.name ||
      !certificateData.issuedBy ||
      !certificateData.certificateFile
    ) {
      alert("Please fill all the fields.");
      return;
    }

    onUpload(certificateData);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-full max-w-[700px]">
          <h2 className="text-xl font-semibold">Upload Certificate</h2>
          <p className="text-sm text-gray-500 mb-4">
            Please upload certificate details to verify your achievement.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center">
              <label className="w-1/3 font-medium">Certificate Name</label>
              <input
                type="text"
                name="name"
                value={certificateData.name}
                onChange={handleChange}
                placeholder="Enter certificate name"
                className="w-2/3 p-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-zinc-300 focus:outline-none"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 font-medium">Issued By</label>
              <input
                type="text"
                name="issuedBy"
                value={certificateData.issuedBy}
                onChange={handleChange}
                placeholder="Enter issuing organization"
                className="w-2/3 p-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-zinc-300 focus:outline-none"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 font-medium">Certificate</label>
              <div className="w-2/3 relative">
                <input
                  type="file"
                  accept="application/pdf, image/*"
                  id="certificateFile"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="certificateFile"
                  className="flex items-center w-full p-2 border border-zinc-300 rounded-md cursor-pointer text-gray-500 bg-white hover:bg-gray-100 focus:outline-none"
                >
                  <img
                    src={CertificateIcon}
                    alt="Document"
                    className="w-5 h-5 mr-2"
                  />
                  {certificateData.certificateFile
                    ? certificateData.certificateFile.name
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
                Upload Certificate
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        message="Certificate uploaded successfully!"
      />
    </>
  );
};

export default UploadCertificateModal;
