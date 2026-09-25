import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
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
          eyebrow="Shop by department"
          title="What does your clinic need today?"
          description="Pick a department to see everything we stock in it — from chairs and X-ray to burs, cements and bibs."
          align="center"
        />
      </Reveal>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {products === null &&
          Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-40 animate-pulse rounded-3xl bg-border/70" />)}
        {tiles.map(({ cat, count, image }, i) => (
          <Reveal key={cat._id} delay={(i % 4) * 70}>
            <Link
              to={`/products?category=${cat.slug}`}
              className="group relative flex h-40 overflow-hidden rounded-3xl border border-border bg-white p-4 transition-all duration-300 hover:border-primary/30 hover:bg-primary-soft/50 sm:h-44 sm:p-5"
            >
              <div className="relative z-10 flex max-w-[62%] flex-col">
                <h3 className="font-display text-sm font-semibold leading-snug text-text sm:text-base">{cat.name}</h3>
                <p className="mt-1 text-xs text-text-secondary">{count} items</p>
                <span className="mt-auto flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              {image && (
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className="absolute -bottom-2 -right-2 h-28 w-28 rounded-2xl object-cover shadow-md transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-2 sm:h-32 sm:w-32"
                />
              )}
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;
