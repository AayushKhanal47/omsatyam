import { api } from "./axios";
import type { ApiResponse, Product, Category } from "@/types";

export interface GetProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sort?: string;
}

export const getProducts = async (params: GetProductsParams = {}) => {
  const { data } = await api.get<ApiResponse<Product[]>>("/products", { params });
  return data;
};

export const getProductBySlug = async (slug: string) => {
  const { data } = await api.get<ApiResponse<Product>>(`/products/${slug}`);
  return data;
};

export const getCategories = async () => {
  const { data } = await api.get<ApiResponse<Category[]>>("/categories");
  return data;
};