import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import type { Product } from "@/types";
import { whatsappLink } from "@/lib/contact";

interface HeroProps {
  products: Product[] | null;
  brandCount: number;
  categoryCount: number;
}

const Hero = ({ products, brandCount, categoryCount }: HeroProps) => {
  const spotlight = products?.find((p) => p.images?.[0] && /chair|unit/i.test(p.name)) ?? products?.find((p) => p.images?.[0]);

  const stats = [
    { value: products ? `${products.length}+` : "–", label: "Products" },
    { value: brandCount ? `${brandCount}` : "–", label: "Trusted brands" },
    { value: categoryCount ? `${categoryCount}` : "–", label: "Categories" },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:pb-24 lg:pt-20">
        <div className="animate-fade-in-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Dental &amp; surgical supply · Nepal
          </p>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-text sm:text-5xl lg:text-6xl">
            Everything your <span className="text-primary">clinic</span> needs, delivered across Nepal
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
            Dental chairs, imaging, handpieces, endodontics, instruments and everyday consumables — genuine products
            from trusted manufacturers, with honest advice before and after you buy.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(11,94,100,0.7)] transition-colors hover:bg-primary-hover"
            >
              Browse the catalogue
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={whatsappLink("Hi, I'd like some advice on dental equipment and supplies.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-7 py-3.5 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
            >
              Get a quote on WhatsApp
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-bold text-text sm:text-3xl">{s.value}</dt>
                <dd className="mt-1 text-xs text-text-secondary sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative animate-fade-in lg:pl-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_40px_80px_-40px_rgba(14,43,45,0.35)]">
            <img
              src="/banners/banner4.jpeg"
              alt="Dental chairs, handpieces, instruments and consumables"
              className="aspect-[4/3] w-full object-contain p-6"
            />
          </div>

          <div className="absolute -left-2 top-8 hidden items-center gap-3 rounded-2xl border border-border bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:flex lg:-left-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-success/10 text-success">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-text">100% genuine</p>
              <p className="text-xs text-text-secondary">Direct from manufacturers</p>
            </div>
          </div>

          {spotlight && (
            <Link
              to={`/product/${spotlight.slug}`}
              className="absolute -bottom-6 right-4 hidden w-64 items-center gap-3 rounded-2xl border border-border bg-white p-3 shadow-xl transition-transform hover:-translate-y-1 sm:flex"
            >
              <img src={spotlight.images[0]} alt="" className="h-14 w-14 flex-shrink-0 rounded-xl object-cover" />
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">In the catalogue</p>
                <p className="line-clamp-2 text-sm font-semibold leading-snug text-text">{spotlight.name}</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
