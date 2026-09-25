import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";
import { MAX_CART_LINES, MAX_QTY_PER_ITEM } from "@/lib/limits";

// "capped": only part of the quantity fit under the per-item limit. "item-max" / "cart-full": nothing was added.
export type AddResult = "added" | "capped" | "item-max" | "cart-full";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => AddResult;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existing = items.find((item) => item.product._id === product._id);
        if (!existing && items.length >= MAX_CART_LINES) return "cart-full";

        const current = existing?.quantity ?? 0;
        const next = Math.min(current + quantity, MAX_QTY_PER_ITEM);
        if (next === current) return "item-max";

        set({
          items: existing
            ? items.map((item) => (item.product._id === product._id ? { ...item, quantity: next } : item))
            : [...items, { product, quantity: next }],
        });
        return next - current < quantity ? "capped" : "added";
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.product._id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1 || quantity > MAX_QTY_PER_ITEM) return;
        set({
          items: get().items.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    }),
    {
      name: "omsatyam-cart", // saved in localStorage under this key
      // Clamp carts saved before the limits existed.
      merge: (persisted, current) => {
        const items = ((persisted as { items?: CartItem[] })?.items ?? [])
          .slice(0, MAX_CART_LINES)
          .map((item) => ({ ...item, quantity: Math.min(Math.max(1, item.quantity), MAX_QTY_PER_ITEM) }));
        return { ...current, items };
      },
    }
  )
);