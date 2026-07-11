import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "@/api/products";
import type { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryStrip from "@/components/CategoryStrip";
import BrandsSection from "@/components/BrandsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

const Home = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const search = searchParams.get("search") || undefined;
  const category = searchParams.get("category") || undefined;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProducts({ page: 1, limit: 20, search, category });
        setProducts(res.data);
      } catch (err) {
        setError("Could not load products. Is the backend server running?");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search, category]);

  return (
    <div>
      <HeroCarousel />
      <CategoryStrip />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold text-text sm:text-3xl">
            {search ? `Results for "${search}"` : "All products"}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Instruments, consumables, and equipment for clinics and practitioners.
          </p>
        </div>

{loading && (
  <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
)}
        {error && (
          <p className="rounded-md bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-sm text-text-secondary">
            No products found — try a different search or check back soon.
          </p>
        )}

        <div className="grid animate-fade-in-up grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      <BrandsSection />
      <WhyChooseUs />
    </div>
  );
};

export default Home;