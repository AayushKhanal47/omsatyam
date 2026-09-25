import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useCatalog } from "@/hooks/useCatalog";
import { whatsappLink } from "@/lib/contact";
import Logo from "./Logo";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";

const navLinks = [
  { label: "Products", to: "/products" },
  { label: "Brands", to: "/brands" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Track order", to: "/track-order" },
];

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-text"}`;

const Navbar = () => {
  const totalItems = useCartStore((state) => state.totalItems());
  const { categories } = useCatalog();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setMobileOpen(false), [location.pathname, location.search]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-40">
      <TopBar />
      <header
        className={`border-b bg-white/90 backdrop-blur-md transition-shadow ${
          scrolled ? "border-border shadow-[0_8px_24px_-18px_rgba(14,43,45,0.4)]" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-3 sm:px-8">
          <Link to="/" className="flex-shrink-0" aria-label="Om Satyam home">
            <Logo className="h-12 sm:h-14" />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            <NavLink to="/products" end className={linkCls}>
              Products
            </NavLink>
            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-medium text-text transition-colors hover:text-primary">
                Categories <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="rounded-2xl border border-border bg-white p-2 shadow-xl">
                  {categories?.map((cat) => (
                    <Link
                      key={cat._id}
                      to={`/products?category=${cat.slug}`}
                      className="block rounded-xl px-3 py-2 text-sm text-text transition-colors hover:bg-primary-soft hover:text-primary"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <Link
                    to="/products"
                    className="mt-1 block rounded-xl border-t border-border px-3 pb-2 pt-3 text-sm font-semibold text-primary"
                  >
                    View all products →
                  </Link>
                </div>
              </div>
            </div>
            {navLinks.slice(1).map((link) => (
              <NavLink key={link.to} to={link.to} className={linkCls}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto hidden w-full max-w-[15rem] md:block">
            <SearchBar />
          </div>

          <div className="ml-auto flex items-center gap-3 md:ml-0">
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-text transition-colors hover:bg-primary-soft hover:text-primary"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <a
              href={whatsappLink("Hi, I'd like some advice on dental equipment and supplies.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden whitespace-nowrap rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover xl:block"
            >
              WhatsApp us
            </a>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-text hover:bg-primary-soft lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="px-5 pb-3 md:hidden">
          <SearchBar />
        </div>

        {mobileOpen && (
          <div className="animate-fade-in max-h-[70vh] overflow-y-auto border-t border-border bg-white px-5 py-4 lg:hidden">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={({ isActive }) => `${linkCls({ isActive })} py-2.5 text-base`}>
                  {link.label}
                </NavLink>
              ))}
            </div>
            {categories && categories.length > 0 && (
              <>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">Categories</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat._id}
                      to={`/products?category=${cat.slug}`}
                      className="rounded-full border border-border px-3 py-1.5 text-sm text-text"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
