import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

interface ProductRailProps {
  eyebrow: string;
  title: string;
  description?: string;
  products: Product[] | null;
  viewAllTo: string;
  className?: string;
}

// A titled grid of product cards, used for the "featured" and per-category rows on the home page.
const ProductRail = ({ eyebrow, title, description, products, viewAllTo, className = "" }: ProductRailProps) => {
  if (products && products.length === 0) return null;

  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            action={
              <Link
                to={viewAllTo}
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
              >
                View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            }
          />
        </Reveal>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {products === null
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.map((product, i) => (
                <Reveal key={product._id} delay={(i % 4) * 70}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
};

export default ProductRail;
