import api from "../utils/api";

const ProjectService = {
  getAllProjects: async () => {
    return await api.get("/projects");
  },

  getProjectById: async (projectId) => {
    return await api.get(`/projects/${projectId}`);
  },

  createProject: async (projectData) => {
    return await api.post("/projects", projectData);
  },

  updateProject: async (projectId, projectData) => {
    return await api.put(`/projects/${projectId}`, projectData);
  },

  deleteProject: async (projectId) => {
    return await api.delete(`/projects/${projectId}`);
  },
};

export default ProjectService;
