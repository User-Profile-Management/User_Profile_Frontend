import axios from "axios";

const BASE_URL = "http://localhost:8080/api/user-projects";

const getToken = () => localStorage.getItem("token") || localStorage.getItem("authToken");


const userprojectService = {
    getProjectsList: async () => {
        try {
          const response = await axios.get(`${BASE_URL}`, {
            headers: {
              Authorization: `Bearer ${getToken()}`,
              "Content-Type": "application/json",
            },
          });
    
          return response.data.response;
        } catch (error) {
          console.error("Error fetching projects:", error);
          return [];
        }
      },
     

      getProjectsByStudentId: async (studentId) => {
        try {
          const response = await axios.get(`${BASE_URL}/users/${studentId}`, {
            headers: {
              Authorization: `Bearer ${getToken()}`, // Include the token in the request header
              "Content-Type": "application/json",
            },
          });
    
          return response.data; // Assuming response.data contains the list of projects
        } catch (error) {
          console.error("Error fetching student projects:", error);
          throw error; // Throwing error for handling in the component
        }
      },
      
      
};

export default userprojectService;
