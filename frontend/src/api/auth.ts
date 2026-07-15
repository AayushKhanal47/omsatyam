import { api } from "./axios";
import type { ApiResponse } from "@/types";

export interface Admin {
  id: string;
  name: string;
  email: string;
}

export const loginAdmin = async (email: string, password: string) => {
  const { data } = await api.post<ApiResponse<Admin>>("/auth/login", { email, password });
  return data;
};

export const logoutAdmin = async () => {
  const { data } = await api.post<ApiResponse<null>>("/auth/logout");
  return data;
};

export const getMe = async () => {
  const { data } = await api.get<ApiResponse<Admin>>("/auth/me");
  return data;
};
export const changePassword = async (currentPassword: string, newPassword: string) => {
  const { data } = await api.put<ApiResponse<null>>("/auth/change-password", { currentPassword, newPassword });
  return data;
};

export const updateProfile = async (payload: { name?: string; email?: string }) => {
  const { data } = await api.put<ApiResponse<Admin>>("/auth/profile", payload);
  return data;
};
