
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Logo from "./Logo";

const Navbar = () => {
  const navigate = useNavigate();

  const totalItems = useCartStore((state) => state.totalItems());

  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/" },
    { label: "Brands", to: "/#brands" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/?search=${encodeURIComponent(search.trim())}`);
    setMobileOpen(false);
  };

  return (
<header className="sticky top-0 z-50 border-b border-white/10 bg-navbar text-white shadow-xl backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <Logo className="h-14 transition-transform duration-300 hover:scale-105" />
        </Link>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden flex-1 max-w-lg md:flex"
        >
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-white/15 bg-white/10 py-2.5 pl-12 pr-4 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-accent"
            />
          </div>
        </form>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium tracking-wide text-white/90 transition hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative text-white transition hover:text-accent"
          >
            <ShoppingCart className="h-6 w-6" />

            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-black">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-md p-1 transition hover:bg-white/10 lg:hidden"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-navbar px-6 py-5 lg:hidden">
          <form onSubmit={handleSearch}>
            <div className="relative mb-5">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
               className="w-full rounded-full border border-white/15 bg-white/10 py-3 pl-12 pr-5 text-sm text-white placeholder:text-white/50 outline-none transition-all duration-300 focus:border-primary focus:bg-white/15 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </form>

          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="border-b border-white/10 py-3 text-sm text-white/90 transition hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
