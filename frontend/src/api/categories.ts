import { api } from "./axios";
import type { ApiResponse, Category } from "@/types";

export const getCategories = async () => {
  const { data } = await api.get<ApiResponse<Category[]>>("/categories");
  return data;
};

export const createCategory = async (payload: { name: string; description?: string; parent?: string }) => {
  const { data } = await api.post<ApiResponse<Category>>("/categories", payload);
  return data;
};

export const deleteCategory = async (id: string) => {
  const { data } = await api.delete<ApiResponse<null>>(`/categories/${id}`);
  return data;
};