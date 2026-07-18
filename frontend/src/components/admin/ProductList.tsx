import { useEffect, useState } from "react";
import { getProducts } from "@/api/products";
import { deleteProduct } from "@/api/adminProducts";
import type { Product } from "@/types";

interface ProductListProps {
  refreshKey: number;
  onEdit: (product: Product) => void;
}

const ProductList = ({ refreshKey, onEdit }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await getProducts({ limit: 50 });
    setProducts(res.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [refreshKey]);

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this product from the store?")) return;
    await deleteProduct(id);
    await load();
  };

  return (
    <div className="animate-fade-in-up animate-delay-1 rounded-lg border border-border bg-surface p-6">
      <h2 className="font-display text-lg font-semibold text-text">Your products</h2>

      {loading && <p className="mt-4 text-sm text-text-secondary">Loading...</p>}

      {!loading && products.length === 0 && (
        <p className="mt-4 text-sm text-text-secondary">No products yet.</p>
      )}

      <div className="mt-4 flex flex-col gap-2">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between rounded-md border border-border px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-text">{product.name}</p>
              <p className="font-mono text-xs text-text-secondary">
                {product.category?.name} · {product.priceOnRequest ? "Contact for price" : `Rs. ${product.price}`} · Stock: {product.stock}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => onEdit(product)}
                className="font-mono text-xs uppercase text-primary hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="font-mono text-xs uppercase text-danger hover:underline"
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
