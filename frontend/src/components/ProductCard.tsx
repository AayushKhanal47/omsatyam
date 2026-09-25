import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { findBrand } from "@/lib/brands";
import { addToCartMessage } from "@/lib/limits";

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
  const brand = findBrand(product.brand)?.name ?? product.brand;

  return (
    <div className="group flex h-full flex-col rounded-3xl border border-border bg-white p-3 transition-all duration-300 hover:border-primary/25 hover:shadow-[0_18px_36px_-24px_rgba(14,43,45,0.45)]">
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-2xl border border-border/70 bg-white"
      >
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-text-secondary">No image</div>
        )}

        <div className="absolute left-2.5 top-2.5 flex gap-1.5">
          {!product.inStock && (
            <span className="rounded-md bg-danger px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
              Out of stock
            </span>
          )}
          {product.inStock && isNew(product.createdAt) && (
            <span className="rounded-md bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
              New
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-1.5 pb-1 pt-3.5">
        {product.category?.name && (
          <span className="w-fit rounded-md bg-primary-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
            {product.category.name}
          </span>
        )}
        <Link to={`/product/${product.slug}`} className="mt-2">
          <h3 className="line-clamp-2 font-display text-[15px] font-semibold leading-snug text-text transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>
        {brand && <p className="mt-1 truncate text-xs text-text-secondary">by {brand}</p>}

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className={`text-sm font-semibold ${product.priceOnRequest ? "text-accent" : "text-text"}`}>
            {product.priceOnRequest ? "Price on request" : `Rs. ${product.price.toLocaleString()}`}
          </span>
          {product.inStock && (
            <button
              onClick={() => {
                showToast(addToCartMessage(addItem(product), product.name));
              }}
              aria-label={`Add ${product.name} to cart`}
              className="flex h-9 flex-shrink-0 items-center gap-1 rounded-full bg-primary pl-2.5 pr-3.5 text-xs font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
