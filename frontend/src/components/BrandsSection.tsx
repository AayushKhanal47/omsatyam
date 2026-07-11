interface Brand {
  name: string;
  logo: string;
}

const brands: Brand[] = [
  { name: "Shofu", logo: "/brands/shofu.png" },
  { name: "GDC", logo: "/brands/gdc.png" },
  { name: "Ultradent", logo: "/brands/ultradent.png" },
  // Add more: { name: "Brand Name", logo: "/brands/filename.png" },
];

const BrandsSection = () => {
  return (
    <section id="brands" className="border-y border-border bg-surface py-12">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-8 text-center font-display text-xl font-semibold text-text">
          Brands we carry
        </h2>
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-6">
          {brands.map((brand, i) => (
            <div
              key={brand.name}
              className={`animate-fade-in-up flex h-20 items-center justify-center rounded-lg border border-border bg-bg p-4 grayscale transition-all hover:grayscale-0 animate-delay-${(i % 3) + 1}`}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;