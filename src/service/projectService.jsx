import axios from "axios";


const BASE_URL = "http://localhost:8080/api/projects";

const getToken = () => localStorage.getItem("token");

const projectService = {
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
