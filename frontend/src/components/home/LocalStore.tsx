import { Link } from "react-router-dom";
import { Clock, MapPin, PackageSearch, Phone, ShoppingBag, Zap } from "lucide-react";
import { ADDRESS, PHONE_DISPLAY } from "@/lib/contact";
import Reveal from "@/components/Reveal";

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Om Satyam Dental & Surgical, " + ADDRESS)}`;

// What's specific to Om Satyam: a real store in Bharatpur, same-day Chitwan delivery, and online ordering with tracking.
const LocalStore = () => (
  <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
    <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
      <Reveal className="h-full">
        <div className="relative h-full overflow-hidden rounded-[2rem] bg-cream p-8 sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border-[28px] border-primary/10" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Based in Chitwan</p>
          <h2 className="mt-3 max-w-md font-display text-3xl font-bold leading-tight text-text sm:text-4xl">
            Your neighbourhood dental supplier
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-text-secondary">
            Drop by our store in Bharatpur to see products in person, pick up an order, or talk through what you need.
            Clinics in Chitwan get same-day delivery.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: MapPin, label: "Store", value: ADDRESS },
              { icon: Clock, label: "Open", value: "Sun – Fri, 9 AM – 6 PM" },
              { icon: Zap, label: "In Chitwan", value: "Same-day delivery" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-white/70 p-4">
                <item.icon className="h-5 w-5 text-primary" />
                <p className="mt-3 text-xs text-text-secondary">{item.label}</p>
                <p className="mt-0.5 text-sm font-semibold text-text">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              <MapPin className="h-4 w-4" /> Get directions
            </a>
            <a
              href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
            >
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={120} className="h-full">
        <div className="flex h-full flex-col rounded-[2rem] border border-border bg-white p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Order online</p>
          <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-text sm:text-3xl">
            Add to cart, check out, track it
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Build your order on the site and we'll confirm the price and delivery. Follow its status any time with your
            order ID or phone number.
          </p>
          <div className="mt-auto grid gap-3 pt-8">
            <Link
              to="/products"
              className="flex items-center gap-4 rounded-2xl border border-border p-4 transition-colors hover:border-primary/40 hover:bg-primary-soft/40"
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <ShoppingBag className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-text">Start an order</span>
                <span className="block text-xs text-text-secondary">Browse the catalogue and add to cart</span>
              </span>
            </Link>
            <Link
              to="/track-order"
              className="flex items-center gap-4 rounded-2xl border border-border p-4 transition-colors hover:border-primary/40 hover:bg-primary-soft/40"
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <PackageSearch className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-text">Track an order</span>
                <span className="block text-xs text-text-secondary">Check status with your order ID or phone</span>
              </span>
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default LocalStore;
