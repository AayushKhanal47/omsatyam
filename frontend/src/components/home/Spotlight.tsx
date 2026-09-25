import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import type { Product } from "@/types";
import { whatsappLink } from "@/lib/contact";
import Reveal from "@/components/Reveal";

interface SpotlightProps {
  eyebrow: string;
  product: Product | undefined;
  reverse?: boolean;
  tone?: "white" | "cream";
}

// Splits a product description into an intro paragraph and its "- " bullet points.
const summarise = (description: string) => {
  const lines = description.split("\n").map((l) => l.trim());
  const intro = lines.find((l) => l && !l.startsWith("-") && !l.endsWith(":")) ?? "";
  const points = lines.filter((l) => l.startsWith("- ")).map((l) => l.slice(2)).slice(0, 4);
  return { intro: intro.length > 260 ? intro.slice(0, 257).trimEnd() + "…" : intro, points };
};

const Spotlight = ({ eyebrow, product, reverse = false, tone = "white" }: SpotlightProps) => {
  if (!product) return null;
  const { intro, points } = summarise(product.description);

  return (
    <section className={tone === "cream" ? "bg-cream/60" : "bg-white"}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className={reverse ? "lg:order-2" : ""}>
          <Link
            to={`/product/${product.slug}`}
            className="group block overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_40px_80px_-50px_rgba(14,43,45,0.45)]"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </Link>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
          {product.brand && <p className="mt-4 text-sm font-medium text-text-secondary">{product.brand}</p>}
          <h2 className="mt-1 font-display text-3xl font-bold leading-tight tracking-tight text-text sm:text-4xl">
            {product.name}
          </h2>
          {intro && <p className="mt-5 text-base leading-relaxed text-text-secondary">{intro}</p>}
          {points.length > 0 && (
            <ul className="mt-6 grid gap-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-text">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={`/product/${product.slug}`}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              View product <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={whatsappLink(`Hi, I'd like a quote for: ${product.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
            >
              Request a quote
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Spotlight;
