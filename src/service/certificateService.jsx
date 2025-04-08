import axios from "axios";

const BASE_URL = "http://localhost:8080/api/users/certificates";

const getToken = () => localStorage.getItem("token") || localStorage.getItem("authToken");


const certificateService = {
  addCertificate: async (certificateName, issuedBy, file) => {
    try {
      const formData = new FormData();
      formData.append("certificateName", certificateName);
      formData.append("issuedBy", issuedBy);
      formData.append("file", file);

      const response = await axios.post(`${BASE_URL}/certificates`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error uploading certificate:", error.response?.data || error);
      throw error.response?.data || error;
    }
  },

  // For current logged-in user
  getCertificatesList: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response.data.response || [];
    } catch (error) {
      console.error("Error fetching certificates:", error.response?.data || error);
      return [];
    }
  },

  // For any specific user (e.g., mentor viewing a student's certs)
  getCertificatesListForUser: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/get/${userId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response.data.response || [];
    } catch (error) {
      console.error(`Error fetching certificates for user ${userId}:`, error.response?.data || error);
      return [];
    }
  },

  downloadCertificate: async (certificateId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${certificateId}/download`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        responseType: "blob",
      });

      return response.data;
    } catch (error) {
      console.error("Error downloading certificate:", error.response?.data || error);
      throw error;
    }
  },

  deleteCertificate: async (certificateId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${certificateId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error deleting certificate:", error.response?.data || error);
      throw error;
    }
  },
};

export default certificateService;
