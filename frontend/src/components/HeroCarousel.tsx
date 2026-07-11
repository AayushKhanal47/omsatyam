import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Precision instruments, trusted by clinics across Nepal",
    subtitle: "Surgical and dental supplies sourced from certified global brands",
    cta: "Shop instruments",
    bg: "bg-primary",
  },
  {
    title: "Genuine consumables, always in stock",
    subtitle: "Composites, cements, and disposables for daily practice",
    cta: "Browse consumables",
    bg: "bg-[#0F4A4E]",
  },
  {
    title: "Order on WhatsApp, delivered to your clinic",
    subtitle: "No account needed — just message us your requirements",
    cta: "Chat with us",
    bg: "bg-[#12595E]",
  },
];

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <div className={`relative overflow-hidden ${slide.bg} transition-colors duration-700`}>
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-6 py-16 sm:py-20">
        <span className="animate-fade-in rounded-full bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-wide text-white/80">
          Om Satyam Surgical &amp; Dental Supply
        </span>
        <h1 key={index} className="animate-fade-in-up max-w-xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
          {slide.title}
        </h1>
        <p key={`${index}-sub`} className="animate-fade-in-up animate-delay-1 max-w-md text-sm text-white/80">
          {slide.subtitle}
        </p>
        <Link
          to="/"
          className="animate-fade-in-up animate-delay-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
        >
          {slide.cta}
        </Link>
      </div>

      <button
        onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => setIndex((i) => (i + 1) % slides.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
