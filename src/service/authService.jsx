import axios from "axios";


const BASE_URL = "http://localhost:8080/api";

const authService = {
    signup: async (userData) =>{
        return await axios.post(`${BASE_URL}/users/register`,userData)
    },
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
    }
    
    
    
    
};

export default authService;
