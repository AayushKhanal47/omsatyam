import { Link } from "react-router-dom";
import { brandList } from "@/lib/brands";

const logos = brandList.filter((b) => b.logo);

const BrandMarquee = () => (
  <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
    <div className="flex flex-col items-center gap-6 overflow-hidden rounded-3xl border border-border bg-white py-6 lg:flex-row lg:gap-0 lg:py-0">
      <Link
        to="/brands"
        className="flex-shrink-0 px-8 text-center transition-colors hover:text-primary lg:border-r lg:border-border lg:py-8 lg:text-left"
      >
        <p className="font-display text-3xl font-bold text-primary">{brandList.length}</p>
        <p className="text-sm text-text-secondary">brands we work with</p>
      </Link>
      <div className="relative w-full min-w-0 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-14 motion-reduce:animate-none">
          {[...logos, ...logos].map((brand, i) => (
            <Link
              key={`${brand.name}-${i}`}
              to={`/products?brand=${encodeURIComponent(brand.name)}`}
              aria-hidden={i >= logos.length}
              tabIndex={i >= logos.length ? -1 : undefined}
              className="flex h-12 w-32 flex-shrink-0 items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              <img src={brand.logo} alt={brand.name} className="max-h-10 max-w-full object-contain mix-blend-multiply" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default BrandMarquee;
