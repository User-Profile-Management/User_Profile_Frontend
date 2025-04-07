import axios from "axios";
const BASE_URL = "http://localhost:8080/api";

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const token = response.data?.response?.token;

      if (token) {
        localStorage.setItem("getToken", token); // consistent with SignIn
        return response.data;
      } else {
        throw new Error("Login failed, no token received.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      throw (
        error.response?.data?.message || "Login failed. Please check your credentials."
      );
    }
  },

  logout: () => {
    localStorage.removeItem("getToken");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("getToken");
  },

  getToken: () => localStorage.getItem("getToken"),
};

export default authService;
