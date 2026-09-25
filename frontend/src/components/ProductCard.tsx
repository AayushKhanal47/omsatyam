import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { findBrand } from "@/lib/brands";

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
  const badge = !product.inStock ? "Out of stock" : product.isFeatured ? "Featured" : isNew(product.createdAt) ? "New" : null;

  return (
    <div className="group flex flex-col">
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-white transition-shadow duration-300 group-hover:shadow-[0_18px_40px_-20px_rgba(14,43,45,0.35)]"
      >
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-text-secondary">No image</div>
        )}

        {badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider shadow-sm ${
              product.inStock ? "bg-white/95 text-text" : "bg-danger text-white"
            }`}
          >
            {badge}
          </span>
        )}

        {product.inStock && (
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
              showToast(product.name + " added to cart");
            }}
            aria-label={`Add ${product.name} to cart`}
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white opacity-0 shadow-lg transition-all duration-300 hover:bg-primary-hover focus-visible:opacity-100 group-hover:opacity-100 max-lg:opacity-100"
          >
            <Plus className="h-5 w-5" />
          </button>
        )}
      </Link>

      <Link to={`/product/${product.slug}`} className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
            {findBrand(product.brand)?.name ?? (product.brand || product.category?.name || "Om Satyam")}
          </span>
          <ArrowRight className="h-4 w-4 flex-shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" />
        </div>
        <h3 className="mt-1.5 line-clamp-2 font-display text-base font-semibold leading-snug text-text transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm text-text-secondary">
          {product.priceOnRequest ? "Contact for price" : `Rs. ${product.price.toLocaleString()}`}
        </p>
      </Link>
    </div>
  );
};

export default ProductCard;
