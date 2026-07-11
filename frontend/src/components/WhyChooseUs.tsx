import { ShieldCheck, Truck, MessageCircle, BadgeCheck } from "lucide-react";

const points = [
  { icon: ShieldCheck, title: "Genuine products", desc: "Sourced from certified brands only" },
  { icon: Truck, title: "Nepal-wide delivery", desc: "Delivered to your clinic or practice" },
  { icon: MessageCircle, title: "WhatsApp support", desc: "Order or ask questions directly" },
  { icon: BadgeCheck, title: "Trusted since day one", desc: "Serving practitioners across Nepal" },
];

const WhyChooseUs = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((point, i) => (
          <div
            key={point.title}
            className={`animate-fade-in-up rounded-lg border border-border bg-surface p-5 animate-delay-${i + 1}`}
          >
            <point.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-3 font-display text-sm font-semibold text-text">{point.title}</h3>
            <p className="mt-1 text-xs text-text-secondary">{point.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;