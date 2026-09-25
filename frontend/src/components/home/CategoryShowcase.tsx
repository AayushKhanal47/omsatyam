import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Category, Product } from "@/types";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

interface CategoryShowcaseProps {
  categories: Category[] | null;
  products: Product[] | null;
}

const CategoryShowcase = ({ categories, products }: CategoryShowcaseProps) => {
  const tiles = (categories ?? [])
    .map((cat) => {
      const inCat = (products ?? []).filter((p) => p.category?._id === cat._id);
      return { cat, count: inCat.length, image: inCat.find((p) => p.images?.[0])?.images[0] };
    })
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Explore the range"
          title={<>A full range for the<br className="hidden sm:block" /> modern practice</>}
          description="From treatment units and imaging to everyday consumables — sourced from established manufacturers and supported across Nepal."
          action={
            <Link to="/products" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary">
              View all products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />
      </Reveal>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {products === null &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] animate-pulse rounded-3xl bg-border/70" />
          ))}
        {tiles.map(({ cat, count, image }, i) => (
          <Reveal key={cat._id} delay={(i % 3) * 90}>
            <Link
              to={`/products?category=${cat.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-ink"
            >
              {image && (
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
                  {count} product{count === 1 ? "" : "s"}
                </p>
                <h3 className="mt-1 font-display text-base font-semibold leading-tight text-white sm:text-2xl">{cat.name}</h3>
                <span className="mt-3 hidden items-center gap-1.5 text-sm font-semibold text-white sm:inline-flex">
                  Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;
