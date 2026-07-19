import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Logo from "./Logo";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const totalItems = useCartStore((state) => state.totalItems());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/#shop" },
    { label: "Brands", to: "/#brands" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <div className="sticky top-0 z-40">
      <TopBar />
      <header className="border-b border-border bg-navbar">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="flex-shrink-0">
            <Logo className="h-16" />
          </Link>

          <div className="hidden flex-1 max-w-md md:block">
            <SearchBar />
          </div>

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
            <SearchBar onNavigate={() => setMobileSearchOpen(false)} />
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
