import { api } from "./axios";
import type { ApiResponse, Product, Category } from "@/types";

export interface GetProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
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
export const getBrands = async () => {
  const { data } = await api.get<ApiResponse<string[]>>("/products/brands");
  return data;
};

// The products endpoint caps each page at 50, so walk every page to get the full catalogue.
export const getAllProducts = async () => {
  const first = await getProducts({ limit: 50, page: 1 });
  const totalPages = first.pagination?.totalPages ?? 1;
  const rest = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) => getProducts({ limit: 50, page: i + 2 }))
  );
  return [first, ...rest].flatMap((res) => res.data);
};
