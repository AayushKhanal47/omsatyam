import { z } from "zod";

export const registerAdminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginAdminSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const specificationSchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
});

export const createProductSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0).default(0),
  priceOnRequest: z.boolean().default(false),
  images: z.array(z.string()).default([]),
  stock: z.number().int().min(0).default(0),
  specifications: z.array(specificationSchema).default([]),
  brand: z.string().optional(),
  sku: z.string().optional(),
  isFeatured: z.boolean().default(false),
});

export const updateProductSchema = createProductSchema.partial();

export const createCategorySchema = z.object({
  name: z.string().min(2, "Category name is required"),
  description: z.string().optional(),
  parent: z.string().optional(),
});

export const orderItemSchema = z.object({
  product: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
   clinicName: z.string().optional(),
  phone: z.string().min(7, "Enter a valid phone number"),
  address: z.string().min(5, "Address is required"),
  items: z.array(orderItemSchema).min(1, "Order must contain at least one item"),
  notes: z.string().optional(),
});