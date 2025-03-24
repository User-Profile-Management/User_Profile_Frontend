import api from "../utils/api";

const UserService = {
  register: async (userData) => {
    return await api.post("/users/register", userData);
  },

  getProfile: async () => {
    return await api.get("/users/profile");
  },

  updateProfile: async (updatedData) => {
    return await api.put("/users/profile", updatedData);
  },

  getUserById: async (userId) => {
    return await api.get(`/users/${userId}`);
  },
};

export default UserService;
