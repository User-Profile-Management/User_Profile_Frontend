import React, { useState, useEffect } from "react";
import AlertModal from "../../components/modals/AlertModal";
import userService from "../../service/userService";
import projectService from "../../service/projectService";

const AddProjectModal = ({ isOpen, onClose, onAdd }) => {
  const [projectData, setProjectData] = useState({
    projectName: "",
    description: "",
    mentor: "",
  });
  const [mentors, setMentors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  useEffect(() => {
    if (isOpen) {
      fetchMentors();
    }
  }, [isOpen]);

  const fetchMentors = async () => {
    try {
      const response = await userService.getMentorsList();
      if (response.length) {
        setMentors(response);
      }
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    let hasError = false;

    for (const key in projectData) {
      if (!projectData[key]) {
        newErrors[key] = true;
        hasError = true;
      }
    }

    if (hasError) {
      setErrorMessage("Please fill in the required fields");
      setErrors(newErrors);
      return;
    }

    setErrorMessage("");

    const payload = {
      projectName: projectData.projectName,
      description: projectData.description,
      mentorId: projectData.mentor,
    };

    try {
      await projectService.addProject(payload);
      onAdd();
      setSuccessModalOpen(true);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-brightness-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-[700px] shadow-lg">
            <h2 className="text-xl font-semibold text-left">Add Project</h2>
            <p className="text-sm text-gray-500 text-left mb-4">
              Allocate a new project and track progress efficiently.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                {
                  label: "Project Name",
                  name: "projectName",
                  type: "text",
                  placeholder: "Enter project",
                },
                {
                  label: "Description",
                  name: "description",
                  type: "textarea",
                  placeholder: "Enter description",
                },
              ].map(({ label, name, type, placeholder }) => (
                <div className="flex items-center" key={name}>
                  <label className="w-1/3 font-medium">{label}</label>
                  {type === "textarea" ? (
                    <textarea
                      name={name}
                      value={projectData[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className={`w-2/3 p-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none ${
                        errors[name]
                          ? "border-red-500 border-2"
                          : "border-gray-300"
                      }`}
                    />
                  ) : (
                    <input
                      type={type}
                      name={name}
                      value={projectData[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className={`w-2/3 p-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none ${
                        errors[name]
                          ? "border-red-500 border-2"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}

              <div className="flex items-center">
                <label className="w-1/3 font-medium">Select Mentor</label>
                <select
                  name="mentor"
                  value={projectData.mentor}
                  onChange={handleChange}
                  className={`w-2/3 p-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none ${
                    errors.mentor
                      ? "border-red-500 border-2"
                      : "border-gray-300"
                  }`}
                >
                  <option value="" disabled>
                    Select mentor
                  </option>
                  {mentors.map((mentor) => (
                    <option key={mentor.userId} value={mentor.userId}>
                      {mentor.name}
                    </option>
                  ))}
                </select>
              </div>

              {errorMessage && (
                <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-200 text-sm font-semibold text-black px-4 py-3 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white text-sm font-semibold px-4 py-3 rounded-md hover:bg-blue-700"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AlertModal
        isOpen={alert.isOpen}
        onClose={() => setAlert((prev) => ({ ...prev, isOpen: false }))}
        type={alert.type}
        title={alert.title}
        message={alert.message}
      />
    </>
  );
};

export default AddProjectModal;
