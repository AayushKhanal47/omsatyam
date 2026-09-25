import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types";
import { brandCounts } from "@/lib/brands";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const ShopByBrand = ({ products }: { products: Product[] | null }) => {
  const brands = products ? brandCounts(products).slice(0, 12) : [];

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Shop by brand"
          title="Equipment from trusted global manufacturers"
          description="Genuine product lines sourced directly from the manufacturer or an authorised channel — no grey-market imports."
          action={
            <Link to="/brands" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary">
              All brands <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />
      </Reveal>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {brands.map((brand, i) => (
          <Reveal key={brand.name} delay={(i % 4) * 60}>
            <Link
              to={`/products?brand=${encodeURIComponent(brand.name)}`}
              className="group flex h-full flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_40px_-24px_rgba(14,43,45,0.35)]"
            >
              <div className="flex h-14 w-full items-center justify-center">
                {brand.logo ? (
                  <img src={brand.logo} alt={brand.name} loading="lazy" className="max-h-12 max-w-[80%] object-contain" />
                ) : (
                  <span className="font-display text-xl font-bold tracking-tight text-text">{brand.name}</span>
                )}
              </div>
              <p className="text-xs text-text-secondary">
                {brand.count} product{brand.count === 1 ? "" : "s"}
                <ArrowRight className="ml-1 inline h-3 w-3 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default ShopByBrand;
