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