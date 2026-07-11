import { useEffect, useState } from "react";
import { getProducts } from "@/api/products";
import type { Product } from "@/types";
import ProductCard from "@/components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProducts({ page: 1, limit: 20 });
        setProducts(res.data);
      } catch (err) {
        setError("Could not load products. Is the backend server running?");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-text sm:text-3xl">
          Surgical &amp; Dental Supplies
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Instruments, consumables, and equipment for clinics and practitioners.
        </p>
      </div>

      {loading && (
        <p className="text-sm text-text-secondary">Loading products...</p>
      )}

      {error && (
        <p className="rounded-md bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-sm text-text-secondary">
          No products yet — add some from the admin dashboard.
        </p>
      )}

      <div className="grid animate-fade-in-up grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
