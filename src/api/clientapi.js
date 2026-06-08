import axios from "axios";
import getBaseUrl from "../utils/baseURL";
import { clearAdmin, getToken } from "../utils/auth";

const api = axios.create({
  baseURL: getBaseUrl(),
});
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      clearAdmin();
      window.location.href = "/admin-login";
    }
    return Promise.reject(err);
  },
);
export default api;
