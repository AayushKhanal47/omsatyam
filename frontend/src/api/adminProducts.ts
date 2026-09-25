import { api } from "./axios";
import { getProducts } from "./products";
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
// The products endpoint caps each page at 50, so walk every page to get the full catalogue.
export const getAllProducts = async () => {
  const first = await getProducts({ limit: 50, page: 1 });
  const totalPages = first.pagination?.totalPages ?? 1;
  const rest = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) => getProducts({ limit: 50, page: i + 2 }))
  );
  return [first, ...rest].flatMap((res) => res.data);
};
