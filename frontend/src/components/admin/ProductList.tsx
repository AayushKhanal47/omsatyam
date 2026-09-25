import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { deleteProduct } from "@/api/adminProducts";
import type { Product } from "@/types";
import { cardCls, inputCls } from "./ui";

interface ProductListProps {
  products: Product[] | null;
  onEdit: (product: Product) => void;
  onDeleted: () => void;
}

const ProductList = ({ products, onEdit, onDeleted }: ProductListProps) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!products || !q) return products;
    return products.filter((p) =>
      [p.name, p.brand, p.sku, p.category?.name].some((v) => v?.toLowerCase().includes(q))
    );
  }, [products, query]);

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this product from the store?")) return;
    await deleteProduct(id);
    onDeleted();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-admin-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, brand, SKU or category"
          className={`${inputCls} pl-10`}
        />
      </div>

      <div className={`${cardCls} divide-y divide-admin-border overflow-hidden`}>
        {products === null && <p className="p-6 text-center text-sm text-admin-slate">Loading…</p>}
        {filtered?.length === 0 && (
          <p className="p-6 text-center text-sm text-admin-slate">
            {query ? `No products match "${query}".` : "No products yet."}
          </p>
        )}

        {filtered?.map((product) => (
          <div key={product._id} className="flex items-center gap-4 p-4">
            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-admin-bg">
              {product.images?.[0] && (
                <img src={product.images[0]} alt="" loading="lazy" className="h-full w-full object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-admin-navy">{product.name}</p>
              <p className="truncate text-xs text-admin-muted">
                {[product.brand, product.category?.name, `Stock ${product.stock}`, `${product.images?.length ?? 0} photo${product.images?.length === 1 ? "" : "s"}`]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
            <p className="hidden flex-shrink-0 text-sm font-semibold text-admin-navy sm:block">
              {product.priceOnRequest ? "Contact for price" : `Rs. ${product.price.toLocaleString()}`}
            </p>
            <div className="flex flex-shrink-0 items-center gap-3">
              <button onClick={() => onEdit(product)} className="text-xs font-semibold text-primary hover:text-primary-hover">
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="text-xs font-semibold text-red-500 transition-colors hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
