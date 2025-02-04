// src/utils/axiosInstance.ts
import axios from "axios";
import { useAuth } from "../context/authContext";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = useAuth();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
