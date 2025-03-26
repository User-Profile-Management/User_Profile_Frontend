
import axios from "axios";


const BASE_URL = "http://localhost:8080/api";

const authService = {
    signup: async (userData) =>{
        return await axios.post(`${BASE_URL}/users/register`,userData)
    },
    login: async (email,password) =>{
        try{
            const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
            if (response.data?.token) {
                localStorage.setItem("token", response.data.token); // Store token
                return response.data;
            }
            else {
                throw new Error("Login failed, no token received.");
            }
        }
        catch (error) {
            throw error.response?.data?.message || "Login failed. Please check your credentials.";
        }
    },
    logout: () => {
        localStorage.removeItem("token");
    }
};

export default authService;
