import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductBySlug } from "@/api/products";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { usePageTitle } from "@/hooks/usePageTitle";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "9779800000000";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.show);
  const [added, setAdded] = useState(false);

  usePageTitle(product?.name || "Product", product?.description);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setActiveImage(0);
    getProductBySlug(slug)
      .then((res) => setProduct(res.data))
      .catch(() => setError("Product not found"))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    showToast(product.name + " added to cart");
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappMessage = product
    ? `Hi, I'm interested in: ${product.name}${product.sku ? ` (#${product.sku})` : ""}. Could you share more details?`
    : "";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-lg bg-border" />
          <div className="flex flex-col gap-3">
            <div className="h-4 w-1/4 animate-pulse rounded bg-border" />
            <div className="h-8 w-3/4 animate-pulse rounded bg-border" />
            <div className="h-6 w-1/3 animate-pulse rounded bg-border" />
            <div className="h-20 w-full animate-pulse rounded bg-border" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <p className="text-sm text-text-secondary">Product not found.</p>
        <Link to="/" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl animate-fade-in-up px-6 py-10">
      <Link to="/" className="text-sm text-text-secondary hover:text-primary">
        ← Back to products
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-lg border border-border bg-surface">
            {product.images && product.images.length > 0 ? (
              <img src={product.images[activeImage]} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-text-secondary">
                No image
              </div>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                    i === activeImage ? "border-primary" : "border-border"
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium uppercase tracking-wide text-primary">
              {product.category?.name}
            </span>
            <h1 className="mt-3 font-display text-2xl font-semibold text-text sm:text-3xl">
              {product.name}
            </h1>
            {product.sku && (
              <p className="mt-1 font-mono text-sm text-text-secondary">#{product.sku}</p>
            )}
          </div>

          <div>
            {product.priceOnRequest ? (
              <p className="font-mono text-xl font-semibold text-accent">Contact for price</p>
            ) : (
              <p className="font-mono text-2xl font-semibold text-text">
                Rs. {product.price.toLocaleString()}
              </p>
            )}
            <p className={`mt-1 text-sm ${product.inStock ? "text-success" : "text-danger"}`}>
              {product.inStock ? "In stock" : "Out of stock"}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-text-secondary">{product.description}</p>

          {product.specifications.length > 0 && (
            <div className="rounded-lg border border-border">
              <table className="w-full text-sm">
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr key={i} className={i !== 0 ? "border-t border-border" : ""}>
                      <td className="px-4 py-2.5 font-mono text-xs uppercase text-text-secondary">
                        {spec.key}
                      </td>
                      <td className="px-4 py-2.5 text-text">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {product.inStock && (
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-md border border-border">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-text hover:bg-bg"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-text hover:bg-bg"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 rounded-md bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
              >
                {added ? "Added ✓" : "Add to cart"}
              </button>
            </div>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-whatsapp py-2.5 text-sm font-medium text-whatsapp transition-colors hover:bg-whatsapp/10"
          >
            Ask about this on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
