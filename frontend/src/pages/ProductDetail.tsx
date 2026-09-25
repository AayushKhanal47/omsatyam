import { useEffect, useState, type ReactNode } from "react";
import { useParams, Link } from "react-router-dom";
import { BadgeCheck, Check, Headphones, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { getProductBySlug, getProducts } from "@/api/products";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { usePageTitle } from "@/hooks/usePageTitle";
import { findBrand } from "@/lib/brands";
import { whatsappLink } from "@/lib/contact";
import { addToCartMessage, MAX_QTY_PER_ITEM } from "@/lib/limits";

// Renders a plain-text description: "Heading:" lines, "- " bullets and paragraphs.
const DescriptionBody = ({ text }: { text: string }) => {
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];
  const flush = () => {
    if (bullets.length) {
      blocks.push(
        <ul key={blocks.length} className="grid gap-2.5">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Check className="h-2.5 w-2.5" />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      );
      bullets = [];
    }
  };
  for (const raw of text.replace(/\*\*/g, "").split("\n")) {
    const line = raw.trim();
    if (line.startsWith("- ")) {
      bullets.push(line.slice(2));
      continue;
    }
    flush();
    if (!line) continue;
    blocks.push(
      line.endsWith(":") && line.length < 60 ? (
        <h3 key={blocks.length} className="pt-2 font-display text-base font-semibold text-text">
          {line.slice(0, -1)}
        </h3>
      ) : (
        <p key={blocks.length}>{line}</p>
      )
    );
  }
  flush();
  return <div className="flex flex-col gap-4 text-sm leading-relaxed text-text-secondary sm:text-[15px]">{blocks}</div>;
};

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
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  usePageTitle(product?.name || "Product", product?.description);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);
    setActiveImage(0);
    setQuantity(1);

    getProductBySlug(slug)
      .then((res) => {
        setProduct(res.data);
        return getProducts({ category: res.data.category?._id, limit: 9 });
      })
      .then((res) => {
        if (res) setRelatedProducts(res.data.filter((p: Product) => p.slug !== slug && p.images?.[0]).slice(0, 4));
      })
      .catch(() => setError("Product not found"))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    const result = addItem(product, quantity);
    showToast(addToCartMessage(result, product.name));
    if (result === "item-max" || result === "cart-full") return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-3xl bg-border/70" />
          <div className="flex flex-col gap-4">
            <div className="h-4 w-1/4 animate-pulse rounded bg-border/70" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-border/70" />
            <div className="h-6 w-1/3 animate-pulse rounded bg-border/70" />
            <div className="h-28 w-full animate-pulse rounded bg-border/70" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24 text-center sm:px-8">
        <p className="font-display text-xl font-semibold text-text">Product not found</p>
        <Link to="/products" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
          Browse all products
        </Link>
      </div>
    );
  }

  const brand = findBrand(product.brand);
  const brandLabel = brand?.name ?? product.brand;
  const quoteUrl = whatsappLink(
    `Hi, I'm interested in: ${product.name}${product.sku ? ` (#${product.sku})` : ""}. Could you share the price and details?`
  );

  return (
    <div className="animate-fade-in-up">
      <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-text-secondary">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">Products</Link>
          {product.category && (
            <>
              <span>/</span>
              <Link to={`/products?category=${product.category.slug}`} className="hover:text-primary">
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="line-clamp-1 text-text">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-40 lg:self-start">
          <div className="aspect-square overflow-hidden rounded-3xl border border-border bg-white">
            {product.images?.length > 0 ? (
              <img src={product.images[activeImage]} alt={product.name} className="h-full w-full object-contain" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-text-secondary">No image</div>
            )}
          </div>

          {product.images?.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 bg-white transition-colors ${
                    i === activeImage ? "border-primary" : "border-border hover:border-primary/40"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {brandLabel && (
            <Link
              to={`/products?brand=${encodeURIComponent(brandLabel)}`}
              className="text-xs font-semibold uppercase tracking-[0.16em] text-primary hover:underline"
            >
              {brandLabel}
            </Link>
          )}
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-text sm:text-4xl">
            {product.name}
          </h1>
          {product.sku && <p className="mt-2 text-sm text-text-secondary">SKU: {product.sku}</p>}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <p className="font-display text-2xl font-bold text-text">
              {product.priceOnRequest ? "Contact for price" : `Rs. ${product.price.toLocaleString()}`}
            </p>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                product.inStock ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
              }`}
            >
              {product.inStock ? "In stock" : "Out of stock"}
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            {product.inStock && (
              <div className="flex gap-3">
                <div className="flex items-center rounded-full border border-border bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-12 w-11 items-center justify-center text-text hover:text-primary"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(MAX_QTY_PER_ITEM, q + 1))}
                    disabled={quantity >= MAX_QTY_PER_ITEM}
                    className="flex h-12 w-11 items-center justify-center text-text hover:text-primary disabled:opacity-30"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  <ShoppingBag className="h-4 w-4" />
                  {added ? "Added to cart ✓" : "Add to cart"}
                </button>
              </div>
            )}
            <a
              href={quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-whatsapp text-sm font-semibold text-whatsapp transition-colors hover:bg-whatsapp/10"
            >
              Request a quote on WhatsApp
            </a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-border bg-white p-4">
            {[
              { icon: BadgeCheck, label: "Genuine product" },
              { icon: Truck, label: "Nepal-wide delivery" },
              { icon: Headphones, label: "Expert support" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                <item.icon className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium text-text">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <h2 className="font-display text-lg font-semibold text-text">Overview</h2>
            <div className="mt-4">
              <DescriptionBody text={product.description} />
            </div>
          </div>

          {product.specifications.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-lg font-semibold text-text">Specifications</h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-white">
                <table className="w-full text-sm">
                  <tbody>
                    {product.specifications.map((spec, i) => (
                      <tr key={i} className={i % 2 ? "bg-bg" : ""}>
                        <td className="w-2/5 px-4 py-3 align-top font-medium text-text-secondary">{spec.key}</td>
                        <td className="px-4 py-3 text-text">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm">
            {product.category && (
              <div>
                <dt className="text-text-secondary">Category</dt>
                <dd className="mt-1 font-medium">
                  <Link to={`/products?category=${product.category.slug}`} className="text-text hover:text-primary">
                    {product.category.name}
                  </Link>
                </dd>
              </div>
            )}
            {brandLabel && (
              <div>
                <dt className="text-text-secondary">Brand</dt>
                <dd className="mt-1 font-medium text-text">{brandLabel}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-12 border-t border-border bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">You may also like</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">
                  More in {product.category?.name ?? "this category"}
                </h2>
              </div>
              {product.category && (
                <Link to={`/products?category=${product.category.slug}`} className="text-sm font-semibold text-primary hover:underline">
                  View all
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
