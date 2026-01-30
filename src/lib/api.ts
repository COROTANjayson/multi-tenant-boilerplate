import axios from "axios";
import { useAuthStore } from "@/app/store/auth.store";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Adjust base URL as needed
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, { hasToken: !!token });
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
