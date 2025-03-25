
import axios from "axios";


const API_URL = "http://localhost:8080/api/auth/login"; 

const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL, { email, password });

        if (response.data?.response?.token) {
            localStorage.setItem("token", response.data.response.token); // Save token
            return response.data;
        } else {
            throw new Error("Login failed, no token received.");
        }
    } catch (error) {
        throw error.response?.data?.message || "Login failed. Please check your credentials.";
    }
};

const logout = () => {
    localStorage.removeItem("token");
};

export default { login, logout };
