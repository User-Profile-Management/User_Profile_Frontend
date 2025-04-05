import axios from "axios";
import Profile from "../assets/profile.svg";

const BASE_URL = "http://localhost:8080/api/users";

const getToken = () => localStorage.getItem("token");

const userService = {
  signup: async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, userData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data; 
    } catch (error) {
        console.error("Signup error:", error.response?.data || error.message);
        throw error; 
    }
},


  getStudentsCount: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/count?role=STUDENT&status=ACTIVE`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
  

      return response.data.response || 0; // Ensure it returns a number
    } catch (error) {
      console.error("Error fetching students count:", error);
      return 0;
    }
  },

  getMentorsCount: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/count?role=MENTOR&status=ACTIVE`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.response || 0;
    } catch (error) {
      console.error("Error fetching mentors count:", error);
      return 0;
    }
  },

  getStudentsList: async () => {
    try {
      const response = await axios.get(`${BASE_URL}?role=STUDENT&status=ACTIVE`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.response.map((student) => ({
        name: student.fullName,
        userId: student.userId,
        image: student.profilePicture
          ? `data:image/png;base64,${student.profilePicture}`
          : Profile,
      }));
    } catch (error) {
      console.error("Error fetching students list:", error);
      return [];
    }
  },

  getApprovalList: async () => {
    try {
      const response = await axios.get(` ${BASE_URL}?status=PENDING`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.response.map((approval) => ({
        name: approval.fullName,
        userId: approval.userId,
        image: approval.profilePicture
          ? `data:image/png;base64,${approval.profilePicture}`
          : Profile,
      }));
    } catch (error) {
      console.error("Error fetching approval list:", error);
      return [];
    }
  },
  getUserDetails: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
  
      const data = response.data;
  
      return [{
        name: data.fullName,
        userId: data.userId,
        email: data.email,
        roleName: data.roleName,
        image: data.profilePicture
          ? `data:image/png;base64,${data.profilePicture}`
          : Profile,
      }];
    } catch (error) {
      console.error("Error fetching user data:", error);
      return [];
    }
  },

  getMentorsList: async () => {
    try {
      const response = await axios.get(`${BASE_URL}?role=MENTOR&status=ACTIVE`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.response.map((mentor) => ({
        name: mentor.fullName,
        userId: mentor.userId,
        image: mentor.profilePicture
          ? `data:image/png;base64,${mentor.profilePicture}`
          : Profile,
      }));
    } catch (error) {
      console.error("Error fetching mentors list:", error);
      return [];
    }
  },
};
console.log("Exporting userService:", userService);
export default userService;
