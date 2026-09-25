import type { Product } from "@/types";

// Logos for the brands we carry. `match` lists the spellings used in product data.
export interface BrandInfo {
  name: string;
  logo?: string;
  match: string[];
}

export const brandList: BrandInfo[] = [
  { name: "Bondent", logo: "/brands/bondent.svg", match: ["bondent", "bondent(vinci smile)"] },
  { name: "Hongke", logo: "/brands/honkey.avif", match: ["hongke", "honkey"] },
  { name: "Orikam", logo: "/brands/orikam.png", match: ["orikam", "orikam healthcare"] },
  { name: "VinciSmile", logo: "/brands/vincismile.png", match: ["vinci smile", "vincismile"] },
  { name: "Betterway", logo: "/brands/betterway-logo.png", match: ["betterway"] },
  { name: "Youjoy", logo: "/brands/youjoy-logo.png", match: ["youjoy"] },
  { name: "Genoray", logo: "/brands/genoary.png", match: ["genoray", "geonary"] },
  { name: "Alwings", logo: "/brands/alwings.webp", match: ["alwings"] },
  { name: "Exlin", logo: "/brands/exlin.png", match: ["exlin"] },
  { name: "SONZ", logo: "/brands/sonz.png", match: ["sonz"] },
  { name: "Prima Dental", logo: "/brands/primadental-full-logo.png", match: ["prima dental"] },
  { name: "Dome", logo: "/brands/dome.png", match: ["dome", "domed"] },
  { name: "TEALTH", match: ["tealth"] },
  { name: "DTC", match: ["dtc"] },
  { name: "PM DentMedix", match: ["pm dentmedix"] },
];

export const findBrand = (productBrand?: string) => {
  const key = productBrand?.trim().toLowerCase();
  if (!key) return undefined;
  return brandList.find((b) => b.match.includes(key));
};

// Brands that have products, with how many, most first.
export const brandCounts = (products: Product[]) => {
  const counts = new Map<string, number>();
  for (const p of products) {
    const brand = findBrand(p.brand);
    if (brand) counts.set(brand.name, (counts.get(brand.name) ?? 0) + 1);
  }
  return brandList
    .map((b) => ({ ...b, count: counts.get(b.name) ?? 0 }))
    .filter((b) => b.count > 0)
    .sort((a, b) => b.count - a.count);
};
