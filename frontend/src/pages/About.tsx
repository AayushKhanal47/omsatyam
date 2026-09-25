import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import WhyChooseUs from "@/components/WhyChooseUs";
import BrandMarquee from "@/components/home/BrandMarquee";
import ClinicCta from "@/components/home/ClinicCta";

const About = () => {
  usePageTitle(
    "About us",
    "Om Satyam is a dental and surgical supply company in Bharatpur, Chitwan, serving clinics and practitioners across Nepal with genuine products."
  );

  return (
    <div>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
        <div className="animate-fade-in-up">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">About Om Satyam</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-text sm:text-5xl">
            Supplying Nepal's dental clinics with care
          </h1>
          <p className="mt-6 text-base leading-relaxed text-text-secondary sm:text-lg">
            Om Satyam Dental &amp; Surgical is based in Bharatpur, Chitwan. We supply clinics, hospitals and practitioners
            across Nepal with genuine dental equipment, instruments and consumables, sourced from established
            manufacturers and their authorised channels.
          </p>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            We're committed to reliability, fair pricing and honest advice — and to making it easy to get what your
            practice needs, whether through our online catalogue or directly over WhatsApp.
          </p>
          <Link
            to="/products"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            Explore our products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="animate-fade-in overflow-hidden rounded-[2rem] border border-border bg-white">
          <img src="/banners/banner2.jpeg" alt="Dental instruments" className="aspect-[4/3] w-full object-cover" />
        </div>
      </section>

      <BrandMarquee />
      <WhyChooseUs />
      <ClinicCta />
    </div>
  );
};

export default About;
