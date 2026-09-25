import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useCatalog } from "@/hooks/useCatalog";
import { usePageTitle } from "@/hooks/usePageTitle";
import { brandCounts } from "@/lib/brands";
import Reveal from "@/components/Reveal";
import ClinicCta from "@/components/home/ClinicCta";

const Brands = () => {
  const { products } = useCatalog();
  const brands = products ? brandCounts(products) : null;

  usePageTitle("Brands", "Dental and surgical brands available from Om Satyam in Nepal — Bondent, Hongke, Orikam, VinciSmile, Betterway and more.");

  return (
    <div>
      <section className="border-b border-border bg-cream/50">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Our brands</p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-text sm:text-5xl">
            Trusted manufacturers, genuine products
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            We work with established dental and surgical manufacturers and their authorised channels, so every product
            you order is the real thing.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {brands === null &&
          Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-48 animate-pulse rounded-3xl bg-border/70" />)}
        {brands?.map((brand, i) => {
          const samples = products!
            .filter((p) => p.images?.[0] && brand.match.includes((p.brand ?? "").trim().toLowerCase()))
            .slice(0, 3);
          return (
            <Reveal key={brand.name} delay={(i % 3) * 80}>
              <Link
                to={`/products?brand=${encodeURIComponent(brand.name)}`}
                className="group flex h-full flex-col rounded-3xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_48px_-28px_rgba(14,43,45,0.4)]"
              >
                <div className="flex h-16 items-center">
                  {brand.logo ? (
                    <img src={brand.logo} alt={brand.name} loading="lazy" className="max-h-12 max-w-[60%] object-contain" />
                  ) : (
                    <span className="font-display text-2xl font-bold tracking-tight text-text">{brand.name}</span>
                  )}
                </div>
                <div className="mt-5 flex gap-2">
                  {samples.map((p) => (
                    <img key={p._id} src={p.images[0]} alt="" loading="lazy" className="h-16 w-16 rounded-xl border border-border object-cover" />
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-sm text-text-secondary">
                    {brand.count} product{brand.count === 1 ? "" : "s"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    View range <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <ClinicCta />
    </div>
  );
};

export default Brands;
