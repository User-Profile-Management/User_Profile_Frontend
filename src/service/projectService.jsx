import axios from "axios";


const BASE_URL = "http://localhost:8080/api/projects";

const getToken = () => localStorage.getItem("token");

const projectService = {

  addProject: async (projectData) => {
    try {
        const response = await axios.post(`${BASE_URL}`, projectData, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error posting project:", error.response?.data);
        return null;
    }
},
deleteProject: async (projectId) => {
  try {
      const token = getToken();
      if (!token) {
          console.error("Error: No authentication token found!");
          return;
      }

      const response = await axios.delete(`${BASE_URL}/${projectId}`, {
          headers: {
              Authorization: `Bearer ${token}`,  // ✅ Ensure correct token format
              "Content-Type": "application/json",
          },
      });

      return response.data;
  } catch (error) {
      console.error("Error deleting project:", error.response?.data || error);
      throw error;
  }
},



    getProjectsCount: async () => {
      try {
        const response = await axios.get(`${BASE_URL}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        });
        return response.data.response?.length|| 0;
      } catch (error) {
        console.error("Error fetching projects count:", error.response?.data);
        return 0;
      }
    },
  
    getProjectsList: async () => {
      try {
        const response = await axios.get(`${BASE_URL}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        });
        console.log("API Response:", response.data);
        return response.data.response.map(project => ({
          projectId: project.projectId,
            name: project.projectName,
           
        }));
    }
        catch (error) {
        console.error("Error fetching projects list:", error.response?.data);
        return [];
      }
    }
};

export default projectService;
