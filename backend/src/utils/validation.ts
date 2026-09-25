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

// Keep in sync with frontend/src/lib/limits.ts
export const MAX_QTY_PER_ITEM = 50;
export const MAX_ORDER_LINES = 30;

export const orderItemSchema = z.object({
  product: z.string().regex(/^[a-f\d]{24}$/i, "Invalid product"),
  quantity: z
    .number()
    .int()
    .min(1, "Quantity must be at least 1")
    .max(MAX_QTY_PER_ITEM, `You can order up to ${MAX_QTY_PER_ITEM} of each product online`),
});

export const createOrderSchema = z.object({
  customerName: z.string().trim().min(2, "Name is required").max(100, "Name is too long"),
  clinicName: z.string().trim().max(120, "Clinic name is too long").optional(),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s-]{7,20}$/, "Enter a valid phone number"),
  address: z.string().trim().min(5, "Address is required").max(300, "Address is too long"),
  items: z
    .array(orderItemSchema)
    .min(1, "Order must contain at least one item")
    .max(MAX_ORDER_LINES, `An online order can have up to ${MAX_ORDER_LINES} different products`),
  notes: z.string().trim().max(1000, "Notes are too long").optional(),
  website: z.string().optional(),
  turnstileToken: z.string().optional(),
});
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
});