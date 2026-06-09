import api from "./client.api";

export const loginAdmin = (data) => api.post("/api/auth/login", data);

export const registerAdmin = (data) => api.post("/api/auth/register", data);

export const getProfile = () => api.get("/api/auth/profile");

export const uploadAvatar = (formData) =>
  api.put("/api/auth/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
