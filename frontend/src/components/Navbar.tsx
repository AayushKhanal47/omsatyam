import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Logo from "./Logo";
import TopBar from "./TopBar";

const Navbar = () => {
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.totalItems());
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
      setMobileOpen(false);
      setMobileSearchOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/" },
    { label: "Brands", to: "/#brands" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Track Order", to: "/track-order" },
  ];

  return (
    <div className="sticky top-0 z-40">
      <TopBar />
      <header className="border-b border-border bg-navbar">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          
          {/* Logo container uses negative vertical margins to accommodate the larger size without shifting Navbar height */}
          <Link to="/" className="flex-shrink-0 -my-2 sm:-my-3 flex items-center">
            <Logo className="h-16 lg:h-20" />
          </Link>

          <form onSubmit={handleSearch} className="hidden flex-1 max-w-md md:flex">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search instruments, brands, consumables..."
                className="w-full rounded-full border border-border bg-bg py-2.5 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
          </form>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-medium text-text transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSearchOpen((v) => !v)}
              className="text-text hover:text-primary md:hidden"
              aria-label="Toggle search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link to="/cart" className="relative flex items-center text-text hover:text-primary">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="text-text lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileSearchOpen && (
          <div className="animate-fade-in-up border-t border-border px-6 py-3 md:hidden">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-full border border-border bg-bg py-2.5 pl-9 pr-4 text-sm outline-none focus:border-primary"
                />
              </div>
            </form>
          </div>
        )}

        {mobileOpen && (
          <div className="animate-fade-in-up border-t border-border bg-navbar px-6 py-4 lg:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-text hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;