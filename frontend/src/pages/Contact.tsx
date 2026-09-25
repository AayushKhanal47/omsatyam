import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { ADDRESS, EMAIL, PHONE_DISPLAY, whatsappLink } from "@/lib/contact";

const cards = [
  { icon: Phone, title: "Call us", value: PHONE_DISPLAY, href: `tel:${PHONE_DISPLAY.replace(/\s/g, "")}` },
  { icon: Mail, title: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: MapPin, title: "Visit", value: ADDRESS },
  { icon: Clock, title: "Store hours", value: "Sun – Fri, 9 AM – 6 PM" },
];

const Contact = () => {
  usePageTitle("Contact us", "Contact Om Satyam Dental & Surgical in Bharatpur, Chitwan — call, email or message us on WhatsApp.");

  return (
    <div>
      <section className="border-b border-border bg-cream/50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Contact</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-text sm:text-5xl">
            Let's talk about what your clinic needs
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
            Product questions, quotes, bulk orders or clinic setup advice — reach us whichever way suits you.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((card) => {
            const body = (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <card.icon className="h-5 w-5" />
                </span>
                <p className="mt-5 text-sm text-text-secondary">{card.title}</p>
                <p className="mt-1 break-words font-display text-lg font-semibold text-text">{card.value}</p>
              </>
            );
            return card.href ? (
              <a key={card.title} href={card.href} className="rounded-3xl border border-border bg-white p-6 transition-colors hover:border-primary/40">
                {body}
              </a>
            ) : (
              <div key={card.title} className="rounded-3xl border border-border bg-white p-6">
                {body}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col justify-between rounded-3xl bg-ink p-8 text-white">
          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-whatsapp/20 text-whatsapp">
              <MessageCircle className="h-6 w-6" />
            </span>
            <h2 className="mt-6 font-display text-2xl font-bold">The fastest way to reach us</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Send us a message on WhatsApp with the products you're looking for, and we'll get back to you with prices
              and availability.
            </p>
          </div>
          <a
            href={whatsappLink("Hi, I'd like to get in touch.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-whatsapp px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-hover"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
