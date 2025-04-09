import React from "react";

const ErrorModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-brightness-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[400px]">
        <h2 className="text-2xl font-bold text-center text-black">
          Login Failed
        </h2>
        <p className="text-gray-600 text-center mt-2">
          This user is not registered.
        </p>

        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black hover:text-white px-4 py-2 rounded-md hover:bg-gray-800 w-1/2"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
