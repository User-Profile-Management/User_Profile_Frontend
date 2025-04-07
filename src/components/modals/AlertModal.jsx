import React from "react";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

const iconMap = {
  success: <CheckCircle className="text-green-500 w-6 h-6" />,
  error: <XCircle className="text-red-500 w-6 h-6" />,
  warning: <AlertTriangle className="text-yellow-500 w-6 h-6" />,
  info: <Info className="text-blue-500 w-6 h-6" />,
};

const AlertModal = ({
  isOpen,
  onClose,
  type = "info", // "success" | "error" | "warning" | "info"
  title = "Alert",
  message = "Something happened.",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-brightness-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[400px] text-center">
        <div className="flex justify-center mb-2">{iconMap[type]}</div>
        <h2 className="text-2xl font-bold text-black">{title}</h2>
        <p className="text-gray-600 mt-2">{message}</p>

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

export default AlertModal;
