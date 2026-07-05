export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parent?: string | null;
}

export interface Specification {
  key: string;
  value: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: Category;
  price: number;
  priceOnRequest: boolean;
  images: string[];
  stock: number;
  inStock: boolean;
  specifications: Specification[];
  brand?: string;
  sku?: string;
  isFeatured: boolean;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: Pagination;
}

export interface CartItem {
  product: Product;
  quantity: number;
}