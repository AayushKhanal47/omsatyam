import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";

const Navbar = () => {
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight text-text">
          Om Satyam
          <span className="ml-2 font-mono text-xs font-normal text-text-secondary">
            SURGICAL &amp; DENTAL
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-text hover:text-primary">
            Products
          </Link>
          <Link
            to="/cart"
            className="relative text-sm font-medium text-text hover:text-primary"
          >
            Cart
            {totalItems > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;