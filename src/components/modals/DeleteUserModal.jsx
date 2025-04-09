import React from "react";

const DeleteUserModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[400px]">
        <h2 className="text-2xl font-bold text-center text-black">
          Are you sure?
        </h2>
        <p className="text-gray-600 text-center mt-2">
          This user will be permanently deleted.
        </p>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 w-1/2 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-red-700 w-1/2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
