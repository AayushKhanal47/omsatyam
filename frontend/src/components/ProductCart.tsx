import { Link } from "react-router-dom";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-shadow hover:shadow-md">
      {/* Corner spec tag — the signature element */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
        <span className="rounded bg-primary/90 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-white">
          {product.category?.name || "Uncategorized"}
        </span>
        {!product.inStock && (
          <span className="rounded bg-danger/90 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-white">
            Out of stock
          </span>
        )}
      </div>

      <Link to={`/product/${product.slug}`} className="block aspect-square bg-bg">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-secondary">
            No image
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-display text-sm font-semibold leading-snug text-text hover:text-primary">
            {product.name}
          </h3>
        </Link>

        {product.sku && (
          <span className="font-mono text-xs text-text-secondary">#{product.sku}</span>
        )}

        <div className="mt-2 flex items-center justify-between">
          {product.priceOnRequest ? (
            <span className="font-mono text-sm font-semibold text-accent">
              Contact for price
            </span>
          ) : (
            <span className="font-mono text-base font-semibold text-text">
              Rs. {product.price.toLocaleString()}
            </span>
          )}
        </div>

        <button
          onClick={() => addItem(product)}
          disabled={!product.inStock}
          className="mt-3 w-full rounded-md bg-primary py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
        >
          {product.inStock ? "Add to cart" : "Out of stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;