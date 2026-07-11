import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";

interface ProductCardProps {
  product: Product;
}

const isNew = (createdAt?: string) => {
  if (!createdAt) return false;
  const days = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
  return days <= 14;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.show);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
        {isNew((product as any).createdAt) && (
          <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-white">
            New
          </span>
        )}
        {!product.inStock && (
          <span className="rounded-full bg-danger px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-white">
            Out of stock
          </span>
        )}
      </div>

      <Link to={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-bg">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-text-secondary">
            No image
          </div>
        )}

        {product.inStock && (
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
              showToast(product.name + " added to cart");
            }}
            className="absolute inset-x-3 bottom-3 flex translate-y-12 items-center justify-center gap-2 rounded-full bg-white/95 py-2.5 text-sm font-medium text-text opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <ShoppingCart className="h-4 w-4" />
            Quick add
          </button>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wide text-primary">
            {product.category?.name || "Uncategorized"}
          </span>
          {product.brand && (
            <span className="text-[10px] uppercase tracking-wide text-text-secondary">
              {product.brand}
            </span>
          )}
        </div>

        <Link to={`/product/${product.slug}`}>
          <h3 className="mt-0.5 font-display text-sm font-semibold leading-snug text-text transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>

        {product.sku && (
          <span className="font-mono text-[11px] text-text-secondary">#{product.sku}</span>
        )}

        <div className="mt-2 flex items-center justify-between">
          {product.priceOnRequest ? (
            <span className="font-mono text-sm font-semibold text-accent">Contact for price</span>
          ) : (
            <span className="font-mono text-base font-semibold text-text">
              Rs. {product.price.toLocaleString()}
            </span>
          )}
          <span className={`h-2 w-2 rounded-full ${product.inStock ? "bg-success" : "bg-danger"}`} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;