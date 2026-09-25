import { BadgeCheck, Headphones, MessageCircle, Truck } from "lucide-react";

const items = [
  { icon: Truck, title: "Nationwide delivery", desc: "Same-day in Chitwan" },
  { icon: BadgeCheck, title: "Genuine products", desc: "Authorised brand channels" },
  { icon: Headphones, title: "Expert guidance", desc: "Help choosing the right fit" },
  { icon: MessageCircle, title: "Order on WhatsApp", desc: "Quick quotes and replies" },
];

const TrustStrip = () => (
  <section className="border-y border-border bg-white">
    <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4 [&>*:nth-child(odd)]:border-r [&>*]:border-border max-lg:[&>*:nth-child(-n+2)]:border-b lg:[&>*:not(:last-child)]:border-r">
      {items.map((item) => (
        <div key={item.title} className="flex items-center gap-3 bg-white px-5 py-6 sm:px-6">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
            <item.icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-text">{item.title}</p>
            <p className="text-xs text-text-secondary">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TrustStrip;
