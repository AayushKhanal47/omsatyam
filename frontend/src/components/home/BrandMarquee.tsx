import { Link } from "react-router-dom";
import { brandList } from "@/lib/brands";

const logos = brandList.filter((b) => b.logo);

const BrandMarquee = () => (
  <section className="overflow-hidden bg-white py-14">
    <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">Brands we carry</p>
    <div className="relative mt-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="animate-marquee flex w-max items-center gap-16 motion-reduce:animate-none">
        {[...logos, ...logos].map((brand, i) => (
          <Link
            key={`${brand.name}-${i}`}
            to={`/products?brand=${encodeURIComponent(brand.name)}`}
            aria-hidden={i >= logos.length}
            tabIndex={i >= logos.length ? -1 : undefined}
            className="flex h-16 w-40 flex-shrink-0 items-center justify-center transition-transform duration-300 hover:scale-105"
          >
            <img src={brand.logo} alt={brand.name} className="max-h-14 max-w-full object-contain mix-blend-multiply" />
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default BrandMarquee;
