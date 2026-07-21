import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  title: string;
  subtitle: string;
  cta: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: "Professional Dental Instruments",
    subtitle:
      "Premium instruments trusted by dental professionals across Nepal.",
    cta: "Browse Products",
    image: "/banners/banner1.jpeg",
  },
  {
    title: "Premium Dental Consumables",
    subtitle:
      "Composites, cements, endodontic materials and daily clinical essentials.",
    cta: "Browse Products",
    image: "/banners/banner2.jpeg",
  },
  {
    title: "Complete Dental Equipment",
    subtitle:
      "Everything your clinic needs from dental chairs to air compressors.",
    cta: "Browse Products",
    image: "/banners/banner3.avif",
  },
  {
    title: "Trusted Dental & Surgical Supplies",
    subtitle:
      "Discover quality products for clinics, hospitals and dental professionals.",
    cta: "Browse Products",
    image: "/banners/banner4.jpeg",
  },
];

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative h-[430px] overflow-hidden md:h-[520px] lg:h-[620px]">
      {/* Background Image */}
      <img
        key={slide.image}
        src={slide.image}
        alt={slide.title}
        className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-xl">
          <span className="mb-5 inline-block rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            Om Satyam Dental & Surgical
          </span>

          <h1
            key={index}
            className="mb-5 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          >
            {slide.title}
          </h1>

          <p
            key={`${index}-subtitle`}
            className="mb-8 max-w-lg text-base leading-7 text-white/90 md:text-lg"
          >
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/#shop"
              className="rounded-lg bg-accent px-6 py-3 font-semibold text-white transition duration-300 hover:scale-105"
            >
              {slide.cta}
            </Link>

            <Link
              to="/contact"
              className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition duration-300 hover:bg-white/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Previous */}
      <button
        onClick={() =>
          setIndex((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="absolute left-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white backdrop-blur-md transition hover:bg-black/50"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next */}
      <button
        onClick={() =>
          setIndex((prev) => (prev + 1) % slides.length)
        }
        className="absolute right-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white backdrop-blur-md transition hover:bg-black/50"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-10 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;