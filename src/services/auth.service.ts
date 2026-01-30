import api from "@/lib/api";
import { ApiResponse, LoginResponse, RegisterPayload, User } from "@/types/auth";

export const authService = {
  login: async (data: any) => {
    const response = await api.post<ApiResponse<LoginResponse>>("/auth/login", data);
    return response.data.data;
  },
  
  register: async (data: RegisterPayload) => {
    const response = await api.post<ApiResponse<LoginResponse>>("/auth/register", data);
    return response.data.data;
  },

  getMe: async () => {
    const response = await api.get<ApiResponse<User>>("/users/me");
    return response.data.data;
  },
};
