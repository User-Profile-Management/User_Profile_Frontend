import React from "react";

function ConfirmationModal({ isOpen, onClose, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[350px]">
                <p className="text-black text-center text-lg">{message}</p>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-1/2"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
