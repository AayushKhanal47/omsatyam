import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getBrands } from "@/api/products";

const BrandFilter = () => {
  const [brands, setBrands] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeBrand = searchParams.get("brand");

  useEffect(() => {
    getBrands().then((res) => setBrands(res.data));
  }, []);

  if (brands.length === 0) return null;

  const handleSelect = (brand: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (brand) {
      params.set("brand", brand);
    } else {
      params.delete("brand");
    }
    navigate(`/?${params.toString()}#shop`);
  };

  return (
    <div className="flex items-center gap-x-1 gap-y-2 overflow-x-auto border-b border-border pb-3">
      <span className="mr-2 flex-shrink-0 font-mono text-[10px] uppercase tracking-wide text-text-secondary">
        Brand
      </span>
      <button
        onClick={() => handleSelect(null)}
        className={`flex-shrink-0 border-b-2 px-3 py-1.5 text-sm font-medium transition-colors ${
          !activeBrand
            ? "border-primary text-primary"
            : "border-transparent text-text-secondary hover:text-text"
        }`}
      >
        All
      </button>
      {brands.map((brand) => (
        <button
          key={brand}
          onClick={() => handleSelect(brand)}
          className={`flex-shrink-0 border-b-2 px-3 py-1.5 text-sm font-medium transition-colors ${
            activeBrand === brand
              ? "border-primary text-primary"
              : "border-transparent text-text-secondary hover:text-text"
          }`}
        >
          {brand}
        </button>
      ))}
    </div>
  );
};

export default BrandFilter;
