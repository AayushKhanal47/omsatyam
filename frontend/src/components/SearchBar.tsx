import { useState, useEffect, useRef, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader2 } from "lucide-react";
import { getProducts } from "@/api/products";
import { useDebounce } from "@/hooks/useDebounce";
import type { Product } from "@/types";

interface SearchBarProps {
  variant?: "light" | "dark";
  onNavigate?: () => void;
}

const SearchBar = ({ variant = "light", onNavigate }: SearchBarProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const requestIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const thisRequestId = ++requestIdRef.current;
    setLoading(true);

    getProducts({ search: debouncedQuery, limit: 5 })
      .then((res) => {
        // Discard this result if a newer request has since been made
        if (thisRequestId !== requestIdRef.current) return;
        setSuggestions(res.data);
      })
      .finally(() => {
        if (thisRequestId === requestIdRef.current) setLoading(false);
      });
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
      setShowDropdown(false);
      onNavigate?.();
    }
  };

  const handleSelectProduct = (slug: string) => {
    navigate(`/product/${slug}`);
    setQuery("");
    setShowDropdown(false);
    onNavigate?.();
  };

  const isDark = variant === "dark";

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search
            className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
              isDark ? "text-white/50" : "text-text-secondary"
            }`}
          />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search instruments, brands, consumables..."
            className={`w-full rounded-full border py-2.5 pl-9 pr-9 text-sm outline-none transition-colors ${
              isDark
                ? "border-white/15 bg-white/10 text-white placeholder-white/50 focus:border-white/40"
                : "border-border bg-bg text-text focus:border-primary"
            }`}
          />
          {loading && (
            <Loader2
              className={`absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin ${
                isDark ? "text-white/50" : "text-text-secondary"
              }`}
            />
          )}
        </div>
      </form>

      {showDropdown && query.trim().length >= 2 && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-border bg-surface shadow-lg animate-fade-in">
          {suggestions.map((product) => (
            <button
              key={product._id}
              onClick={() => handleSelectProduct(product.slug)}
              className="flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left last:border-b-0 hover:bg-bg"
            >
              <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-bg">
                {product.images?.[0] && (
                  <img src={product.images[0]} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-text">{product.name}</p>
                <p className="font-mono text-xs text-text-secondary">
                  {product.priceOnRequest ? "Contact for price" : `Rs. ${product.price.toLocaleString()}`}
                </p>
              </div>
            </button>
          ))}
          <button
            onClick={handleSubmit as any}
            className="w-full px-4 py-2.5 text-center text-sm font-medium text-primary hover:bg-bg"
          >
            See all results for "{query}"
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
