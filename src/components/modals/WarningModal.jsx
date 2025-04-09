import React from "react";

const WarningModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[400px]">
                <h2 className="text-2xl font-bold text-center text-black">Please Wait</h2>
                <p className="text-gray-600 text-center mt-2">Your request is under progress.</p>

                <div className="flex justify-center mt-6">
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
};

export default WarningModal;
