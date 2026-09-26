import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useCatalog } from "@/hooks/useCatalog";
import { ADDRESS, EMAIL, PHONE_DISPLAY, whatsappLink } from "@/lib/contact";
import Logo from "./Logo";

const Footer = () => {
  const { categories, products } = useCatalog();
  const count = (id: string) => products?.filter((p) => p.category?._id === id).length ?? 0;
  const topCategories = (categories ?? [])
    .filter((c) => count(c._id) > 0)
    .sort((a, b) => count(b._id) - count(a._id))
    .slice(0, 6);

  const columns = [
    {
      title: "Shop",
      links: [
        { label: "All products", to: "/products" },
        { label: "Brands", to: "/brands" },
        { label: "Cart", to: "/cart" },
        { label: "Track order", to: "/track-order" },
      ],
    },
    {
      title: "Categories",
      links: topCategories.map((c) => ({ label: c.name, to: `/products?category=${c.slug}` })),
    },
    {
      title: "Company",
      links: [
        { label: "About us", to: "/about" },
        { label: "Contact", to: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Logo tone="dark" size="lg" />
            <p className="mt-5 text-sm leading-relaxed text-white/65">
              Genuine dental and surgical equipment, instruments and consumables for clinics and practitioners
              across Nepal.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-white/80">
              <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="flex items-center gap-2.5 hover:text-white">
                <Phone className="h-4 w-4 text-accent" /> {PHONE_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2.5 hover:text-white">
                <Mail className="h-4 w-4 text-accent" /> {EMAIL}
              </a>
              <span className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-accent" /> {ADDRESS}
              </span>
              <span className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-accent" /> Sun – Fri, 9 AM – 6 PM
              </span>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-white">{col.title}</h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-white/60 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 rounded-2xl bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold">Need help choosing equipment?</p>
            <p className="text-sm text-white/60">Message us on WhatsApp for quick quotes and product advice.</p>
          </div>
          <a
            href={whatsappLink("Hi, I have a question about your products.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-hover"
          >
            Chat on WhatsApp
          </a>
        </div>

        <p
          aria-hidden="true"
          className="pointer-events-none mt-14 select-none whitespace-nowrap text-center font-display text-[15vw] font-bold leading-[0.8] tracking-tighter text-white/[0.05] lg:text-[11rem]"
        >
          Om Satyam
        </p>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Om Satyam Dental &amp; Surgical. All rights reserved.</span>
          <span>Delivery across Nepal · Same-day in Chitwan</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
