import axios from "axios";
import Profile from "/home/sreevidyavijayan/Desktop/User_Profile_Frontend/src/assets/profile.png";
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
    },
    logout: () => {
        localStorage.removeItem("token"); 
    },
    getStudentsCount: async () =>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/users?role=STUDENT&status=ACTIVE`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type":"application/json",
                },
            });
            return response.data.response?.length|| 0;
        }
        catch(error){
            console.error("error fetching students count:",error);
            return 0;

        }

    },
    getMentorsCount: async () =>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/users?role=MENTOR&status=ACTIVE`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type":"application/json",
                },
            });
            return response.data.response?.length|| 0;
        }
        catch(error){
            console.error("error fetching mentors count:",error);
            return 0;

        }

    },
    getProjectsCount: async () =>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/projects`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type":"application/json",
                },
            });
            return response.data.response?.length|| 0;
        }
        catch(error){
            console.error("error fetching projects count:",error);
            return 0;

        }

    },
    getStudentsList: async () =>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/users?role=STUDENT&status=ACTIVE`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type":"application/json",
                },
            });
            console.log("API Response:", response.data);
            return response.data.response.map(student => ({
                name: student.fullName,
                userId: student.userId,
                image: student.profilePicture ? `data:image/png;base64,${student.profilePicture}`
                : Profile
            }));
        }
        catch(error){
            console.error("error fetching students list",error);
            return [];

        }

    },
    getMentorsList: async () =>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/users?role=MENTOR&status=ACTIVE`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type":"application/json",
                },
            });
            console.log("API Response:", response.data);
            return response.data.response.map(mentor => ({
                name: mentor.fullName,
                userId: mentor.userId,
                image: mentor.profilePicture ? `data:image/png;base64,${mentor.profilePicture}`
                : Profile
            }));
        }
        catch(error){
            console.error("error fetching mentors list",error);
            return [];

        }

    },
    getProjectsList: async () =>{
        try{
            const token = localStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/projects`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type":"application/json",
                },
            });
            console.log("API Response:", response.data);
            return response.data.response.map(project => ({
                name: project.projectName,
               
            }));
        }
        catch(error){
            console.error("error fetching projects list",error);
            return [];

        }
    }

    
    
    
    
};

export default authService;
