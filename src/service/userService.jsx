import axios from "axios";
import Profile from "../assets/profile.svg";

const BASE_URL = "http://localhost:8080/api/users";

const getToken = () => localStorage.getItem("token") || localStorage.getItem("authToken");


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
      const response = await axios.get(
        `${BASE_URL}/count?role=STUDENT&status=ACTIVE`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.response || 0;
    } catch (error) {
      console.error("Error fetching students count:", error);
      return 0;
    }
  },
  acceptUser: async (userId, userData) => {
    try {
      const response = await axios.put(`${BASE_URL}/${userId}`, userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(
        "Accept user error:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  getMentorsCount: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/count?role=MENTOR&status=ACTIVE`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.response || 0;
    } catch (error) {
      console.error("Error fetching mentors count:", error);
      return 0;
    }
  },

  getStudentsList: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}?role=STUDENT&status=ACTIVE`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
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
  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error);
      throw error.response?.data || error;
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

      return response.data.response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return [];
    }
  },
  updateProfile: async (profileData) => {
    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("email", profileData.email);
      formData.append("address", profileData.address);
      formData.append("phone", profileData.phone);
      formData.append("emergencyContact", profileData.emergencyContact);

      if (profileData.profilePicture) {
        formData.append("profilePicture", profileData.profilePicture);
      }
      const response = await axios.put(`${BASE_URL}/profile`, profileData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      return [];
    }
  },
  updatePassword: async (passwordData) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/update-password`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Password updation error:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
  getUserById: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.response; // or adjust based on actual response shape
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  },

  getMentorsList: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}?role=MENTOR&status=ACTIVE`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
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
  
  getStudentById: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/profile/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching student profile by ID:", error);
      throw error;
    }
  },

  getStudentProgress: async () => {
    try {
      const profile = await userService.getUserDetails();
      console.log("Fetched user profile:", profile);
  
      const profileFieldsToCheck = [
        "fullName",
        "dateOfBirth",
        "email",
        "contactNo",
        "address",
        "profilePicture"
      ];
  
      const filledFields = profileFieldsToCheck.filter(
        (field) => profile[field] && profile[field].toString().trim() !== ""
      ).length;
  
      const totalFields = profileFieldsToCheck.length;
  
      const profileCompletion =
        totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
  
      console.log(`Profile completeness: ${profileCompletion}%`);
  
      return profileCompletion;

  } catch (error) {
    console.error("Error calculating profile completion:", error);
    throw error; 
  }
}
  
};

console.log("Exporting userService:", userService);
export default userService;
