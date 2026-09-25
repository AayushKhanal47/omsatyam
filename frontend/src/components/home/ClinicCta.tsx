import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { whatsappLink } from "@/lib/contact";
import Reveal from "@/components/Reveal";

const ClinicCta = () => (
  <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
    <Reveal>
      <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-14 sm:px-14 sm:py-16">
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Clinic planning &amp; equipment advice</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              Planning a new clinic, or upgrading your setup?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">
              Share your requirements and budget — we'll help you choose the right chairs, imaging, sterilisation and
              instruments, and put together a quote.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <a
              href={whatsappLink("Hi, I'm planning a clinic setup and would like some advice.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-cream"
            >
              Get equipment advice <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  </section>
);

export default ClinicCta;
