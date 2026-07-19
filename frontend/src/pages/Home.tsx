import { useEffect, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "@/api/products";
import type { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryStrip from "@/components/CategoryStrip";
import BrandsSection from "@/components/BrandsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { usePageTitle } from "@/hooks/usePageTitle";

const Home = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const search = searchParams.get("search") || undefined;
  const category = searchParams.get("category") || undefined;
  usePageTitle("Home", "Genuine dental and surgical supplies for clinics across Nepal.");

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

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location]);

  const isFiltered = Boolean(search || category);

  return (
    <div>
      <HeroCarousel />
      <CategoryStrip />

      <div id="shop" className="mx-auto max-w-6xl px-6 py-10">
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
          <div className="flex flex-col items-start gap-3 rounded-lg border border-dashed border-border px-6 py-10">
            <p className="text-sm text-text-secondary">
              {isFiltered
                ? "No products matched your search or filter."
                : "No products yet — check back soon."}
            </p>
            {isFiltered && (
              <button
                onClick={() => navigate("/")}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
              >
                Clear search and browse all products
              </button>
            )}
          </div>
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
