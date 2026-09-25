import { BadgeCheck, Headphones, PackageCheck, Truck } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const points = [
  {
    icon: BadgeCheck,
    title: "Genuine products",
    desc: "Every product comes from the manufacturer or an authorised channel — no substitutions.",
  },
  {
    icon: Headphones,
    title: "Honest guidance",
    desc: "We help you compare options and choose what actually suits your practice and budget.",
  },
  {
    icon: Truck,
    title: "Delivered across Nepal",
    desc: "Carefully packed and delivered to your clinic, with same-day delivery in Chitwan.",
  },
  {
    icon: PackageCheck,
    title: "Support after purchase",
    desc: "Questions about setup, use or spare parts? We're a WhatsApp message away.",
  },
];

const steps = [
  { n: "01", title: "Browse or ask", desc: "Find products in the catalogue, or tell us what your clinic needs." },
  { n: "02", title: "Get a quote", desc: "Add to cart or message us on WhatsApp for pricing and availability." },
  { n: "03", title: "Receive & set up", desc: "We deliver to your door and help you get started." },
];

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-primary/40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="Why Om Satyam"
            title="A supply partner clinics can rely on"
            description="We focus on genuine equipment, honest advice and dependable support — before and long after you buy."
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point, i) => (
            <Reveal key={point.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <point.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{point.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">How ordering works</p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.n} className="border-t border-white/15 pt-6">
                <span className="font-display text-4xl font-bold text-white/20">{step.n}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default WhyChooseUs;
