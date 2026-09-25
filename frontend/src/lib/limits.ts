// Online order limits. Keep in sync with backend/src/utils/validation.ts
export const MAX_QTY_PER_ITEM = 50;
export const MAX_CART_LINES = 30;

export const addToCartMessage = (result: "added" | "capped" | "item-max" | "cart-full", name: string) =>
  ({
    added: `${name} added to cart`,
    capped: `Added — ${MAX_QTY_PER_ITEM} is the most of one product per online order`,
    "item-max": `You already have ${MAX_QTY_PER_ITEM} of this. Message us on WhatsApp for larger quantities.`,
    "cart-full": `Your cart is full (${MAX_CART_LINES} products). Place this order first, or message us on WhatsApp.`,
  })[result];
