import { api } from "./axios";
import type { ApiResponse, Order } from "@/types";

export interface OrderItemInput {
  product: string;
  quantity: number;
}

export interface CreateOrderInput {
  customerName: string;
  clinicName?: string;
  website?: string;
  phone: string;
  address: string;
  items: OrderItemInput[];
  notes?: string;
}

export const createOrder = async (orderData: CreateOrderInput) => {
  const { data } = await api.post<ApiResponse<Order>>("/orders", orderData);
  return data;
};

export const getOrders = async (status?: string, page = 1) => {
  const { data } = await api.get<ApiResponse<Order[]>>("/orders", {
    params: { status: status || undefined, page, limit: 20 },
  });
  return data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const { data } = await api.put<ApiResponse<Order>>(`/orders/${id}/status`, { status });
  return data;
};

export const trackOrder = async (orderId: string, phone: string) => {
  const { data } = await api.get<ApiResponse<Order>>(`/orders/track/${orderId}`, {
    params: { phone },
  });
  return data;
};

export const trackOrdersByPhone = async (phone: string) => {
  const { data } = await api.get<ApiResponse<Order[]>>("/orders/track-by-phone", {
    params: { phone },
  });
  return data;
};
