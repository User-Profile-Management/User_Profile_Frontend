import axios from "axios";
import Profile from "/home/sreevidyavijayan/Desktop/User_Profile_Frontend/src/assets/profile.png";
const BASE_URL = "http://localhost:8080/api";

const authService = {
   
    login: async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
            const token = response.data?.response?.token;
    
            if (token) {
                localStorage.setItem("token", token);
                
                return response.data;
            } else {
                throw new Error("Login failed, no token received.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            throw error.response?.data?.message || "Login failed. Please check your credentials.";
        }
    },
    logout: () => {
        localStorage.removeItem("token"); 
    },
    
   
    
    
    
    
};

export default authService;
