import { api } from "./axios";
import type { ApiResponse } from "@/types";

export interface OrderItemInput {
  product: string; // product _id
  quantity: number;
}

export interface CreateOrderInput {
  customerName: string;
  phone: string;
  address: string;
  items: OrderItemInput[];
  notes?: string;
}

export const createOrder = async (orderData: CreateOrderInput) => {
  const { data } = await api.post<ApiResponse<any>>("/orders", orderData);
  return data;
};