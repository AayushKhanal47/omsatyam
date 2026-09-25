import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/types";
import { useCatalog } from "@/hooks/useCatalog";
import { usePageTitle } from "@/hooks/usePageTitle";
import { brandCounts, findBrand } from "@/lib/brands";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

const PAGE_SIZE = 24;

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "name_asc", label: "Name: A to Z" },
  { value: "name_desc", label: "Name: Z to A" },
];

const matchesSearch = (p: Product, query: string) => {
  const haystack = [p.name, p.brand, p.sku, p.category?.name, p.description].join(" ").toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
};

const Products = () => {
  const { products, categories, error } = useCatalog();
  const [params, setParams] = useSearchParams();
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const search = params.get("search") ?? "";
  const categoryParam = params.get("category") ?? "";
  const brandParam = params.get("brand") ?? "";
  const sort = params.get("sort") ?? "newest";
  const [searchInput, setSearchInput] = useState(search);
  useEffect(() => setSearchInput(search), [search]);

  const activeCategory = categories?.find((c) => c.slug === categoryParam || c._id === categoryParam);
  const activeBrand = brandParam ? findBrand(brandParam)?.name ?? brandParam : "";

  usePageTitle(
    activeCategory?.name ?? (activeBrand ? `${activeBrand} products` : "All products"),
    "Browse dental chairs, imaging, handpieces, endodontics, instruments and consumables available from Om Satyam across Nepal."
  );

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: key === "search" });
    setVisible(PAGE_SIZE);
  };

  const brandMatches = (p: Product) =>
    !activeBrand || findBrand(p.brand)?.name === activeBrand || p.brand === activeBrand;
  const categoryMatches = (p: Product) => !activeCategory || p.category?._id === activeCategory._id;
  const searchMatches = (p: Product) => !search || matchesSearch(p, search);

  // Counts reflect the other active filters, so each number shows what you'd get by clicking it.
  const { results, categoryCounts, brands } = useMemo(() => {
    const all = products ?? [];
    const results = all.filter((p) => searchMatches(p) && categoryMatches(p) && brandMatches(p));
    results.sort((a, b) =>
      sort === "name_asc"
        ? a.name.localeCompare(b.name)
        : sort === "name_desc"
          ? b.name.localeCompare(a.name)
          : (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
    );
    const forCategories = all.filter((p) => searchMatches(p) && brandMatches(p));
    const categoryCounts = new Map<string, number>();
    forCategories.forEach((p) => p.category && categoryCounts.set(p.category._id, (categoryCounts.get(p.category._id) ?? 0) + 1));
    const brands = brandCounts(all.filter((p) => searchMatches(p) && categoryMatches(p)));
    return { results, categoryCounts, brands };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, search, activeCategory?._id, activeBrand, sort]);

  const hasFilters = Boolean(search || activeCategory || activeBrand);
  const title = activeCategory?.name ?? (activeBrand || (search ? `Results for “${search}”` : "All products"));

  const filterPanel = (
    <div className="flex flex-col gap-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setParam("search", searchInput.trim());
          setFiltersOpen(false);
        }}
        className="relative"
      >
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search products"
          className="w-full rounded-full border border-border bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
      </form>

      <div>
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-secondary">Categories</h3>
        <div className="mt-3 flex flex-col gap-0.5">
          <FilterButton active={!activeCategory} onClick={() => setParam("category", "")} label="All categories" count={undefined} />
          {categories
            ?.filter((c) => categoryCounts.get(c._id) || c._id === activeCategory?._id)
            .map((c) => (
              <FilterButton
                key={c._id}
                active={c._id === activeCategory?._id}
                onClick={() => {
                  setParam("category", c._id === activeCategory?._id ? "" : c.slug);
                  setFiltersOpen(false);
                }}
                label={c.name}
                count={categoryCounts.get(c._id) ?? 0}
              />
            ))}
        </div>
      </div>

      <div>
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-secondary">Brands</h3>
        <div className="mt-3 flex flex-col gap-0.5">
          <FilterButton active={!activeBrand} onClick={() => setParam("brand", "")} label="All brands" count={undefined} />
          {brands.map((b) => (
            <FilterButton
              key={b.name}
              active={b.name === activeBrand}
              onClick={() => {
                setParam("brand", b.name === activeBrand ? "" : b.name);
                setFiltersOpen(false);
              }}
              label={b.name}
              count={b.count}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <section className="border-b border-border bg-cream/50">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
          <nav className="flex items-center gap-2 text-xs text-text-secondary">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary">Products</Link>
            {activeCategory && (
              <>
                <span>/</span>
                <span className="text-text">{activeCategory.name}</span>
              </>
            )}
          </nav>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-text sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-text-secondary">
            {products ? `${results.length} product${results.length === 1 ? "" : "s"}` : "Loading catalogue…"}
            {activeCategory && activeBrand && ` from ${activeBrand}`}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[15rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-40">{filterPanel}</div>
        </aside>

        <div>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-text lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>

            {search && <Chip label={`“${search}”`} onClear={() => setParam("search", "")} />}
            {activeCategory && <Chip label={activeCategory.name} onClear={() => setParam("category", "")} />}
            {activeBrand && <Chip label={activeBrand} onClear={() => setParam("brand", "")} />}
            {hasFilters && (
              <button onClick={() => setParams({})} className="text-sm font-medium text-primary hover:underline">
                Clear all
              </button>
            )}

            <label className="ml-auto flex items-center gap-2 text-sm text-text-secondary">
              <span className="hidden sm:inline">Sort</span>
              <select
                value={sort}
                onChange={(e) => setParam("sort", e.target.value === "newest" ? "" : e.target.value)}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm text-text outline-none focus:border-primary"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {error && (
            <p className="rounded-2xl bg-danger/10 px-5 py-4 text-sm text-danger">Could not load products. Please refresh the page.</p>
          )}

          {products && results.length === 0 && (
            <div className="rounded-3xl border border-dashed border-border px-6 py-16 text-center">
              <p className="font-display text-lg font-semibold text-text">No products found</p>
              <p className="mt-2 text-sm text-text-secondary">Try a different search, or clear the filters.</p>
              <button
                onClick={() => setParams({})}
                className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
              >
                Browse all products
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 xl:grid-cols-3">
            {products === null && !error
              ? Array.from({ length: 9 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : results.slice(0, visible).map((product) => <ProductCard key={product._id} product={product} />)}
          </div>

          {results.length > visible && (
            <div className="mt-14 flex flex-col items-center gap-3">
              <p className="text-xs text-text-secondary">
                Showing {visible} of {results.length}
              </p>
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded-full border border-border bg-white px-7 py-3 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
              >
                Load more products
              </button>
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
          <div className="animate-fade-in absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-bg p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-text">Filters</h2>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X className="h-5 w-5 text-text" />
              </button>
            </div>
            {filterPanel}
          </div>
        </div>
      )}
    </div>
  );
};

const FilterButton = ({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number | undefined;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
      active ? "bg-primary-soft font-semibold text-primary" : "text-text hover:bg-primary-soft/60"
    }`}
  >
    <span>{label}</span>
    {count !== undefined && <span className="text-xs text-text-secondary">{count}</span>}
  </button>
);

const Chip = ({ label, onClear }: { label: string; onClear: () => void }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft py-1.5 pl-3.5 pr-2 text-sm font-medium text-primary">
    {label}
    <button onClick={onClear} aria-label={`Remove ${label} filter`} className="rounded-full p-0.5 hover:bg-primary/10">
      <X className="h-3.5 w-3.5" />
    </button>
  </span>
);

export default Products;
