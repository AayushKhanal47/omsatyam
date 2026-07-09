import { api } from "./axios";
import type { ApiResponse, Product } from "@/types";

export interface ProductInput {
  name: string;
  description: string;
  category: string;
  price: number;
  priceOnRequest: boolean;
  images: string[];
  stock: number;
  specifications: { key: string; value: string }[];
  brand?: string;
  sku?: string;
  isFeatured: boolean;
}

export const createProduct = async (payload: ProductInput) => {
  const { data } = await api.post<ApiResponse<Product>>("/products", payload);
  return data;
};

export const updateProduct = async (id: string, payload: Partial<ProductInput>) => {
  const { data } = await api.put<ApiResponse<Product>>(`/products/${id}`, payload);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await api.delete<ApiResponse<null>>(`/products/${id}`);
  return data;
};