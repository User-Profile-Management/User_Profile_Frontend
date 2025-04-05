import axios from "axios";

const BASE_URL = "http://localhost:8080/api/user-projects";

const getToken = () => localStorage.getItem("token");

const userprojectService = {
    getProjectsList: async (userId) => {
        try {
          const response = await axios.get(`${BASE_URL}/users/${userId}`, {
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
      
};

export default userprojectService;
