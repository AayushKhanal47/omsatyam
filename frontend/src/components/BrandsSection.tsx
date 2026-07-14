interface Brand {
  name: string;
  logo: string;
}
const brands: Brand[] = [
  { name: "Bondent", logo: "/brands/bondent.svg" },
  { name: "Betterway", logo: "/brands/betterway.jpeg" },
  { name: "Dome", logo: "/brands/dome.png" },
  { name: "Exlin", logo: "/brands/exlin.png" },
  { name: "GDC", logo: "/brands/gdc.png" },
  { name: "Genoray", logo: "/brands/genoary.png" }, // filename is genoary.png
  { name: "Honkey", logo: "/brands/honkey.avif" },
  { name: "Orikam", logo: "/brands/orikam.png" },
  { name: "Prima Dental", logo: "/brands/primadental-full-logo.png" },
  { name: "Shofu", logo: "/brands/shofu.png" },
  { name: "Sonz", logo: "/brands/sonz.png" },
  { name: "Ultradent", logo: "/brands/ultradent.png" },
  { name: "Vincismile", logo: "/brands/vincismile.png" },
  { name: "Youjoy", logo: "/brands/youjoy.png" },
  { name: "Alwings", logo: "/brands/alwings.webp" },
];

const BrandsSection = () => {
  return (
    <section
      id="brands"
      className="border-y border-border bg-surface py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center font-display text-3xl font-bold text-text">
          Brands We Carry
        </h2>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {brands.map((brand, i) => (
            <div
              key={brand.name}
              className={`animate-fade-in-up animate-delay-${
                (i % 3) + 1
              } flex h-32 items-center justify-center rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-16 w-auto object-contain"
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