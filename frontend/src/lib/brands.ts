import type { Product } from "@/types";

// The brands we carry. `match` lists the spellings used in product data.
export interface BrandInfo {
  name: string;
  logo?: string;
  about?: string;
  match: string[];
}

// e_trim crops the white padding around these logos.
const cloud = "https://res.cloudinary.com/dqgoeun3z/image/upload/e_trim:10/";

export const brandList: BrandInfo[] = [
  {
    name: "Bondent",
    logo: "/brands/bondent.svg",
    about: "Chinese manufacturer (United Dental Changzhou) of dental and endodontic equipment, imaging and microscopes.",
    match: ["bondent", "bondent(vinci smile)"],
  },
  {
    name: "Hongke",
    logo: "/brands/honkey.avif",
    about: "Foshan-based maker of dental units, dental chairs and supporting clinic equipment.",
    match: ["hongke", "honkey"],
  },
  {
    name: "Orikam",
    logo: "/brands/orikam.png",
    about: "Indian dental device company (est. 2013, Gurugram) behind the Neoendo range of endodontic and restorative materials.",
    match: ["orikam", "orikam healthcare"],
  },
  {
    name: "VinciSmile",
    logo: "/brands/vincismile.png",
    about: "Restorative and prosthetic materials — impression materials, cements, composites and zirconia blocks.",
    match: ["vinci smile", "vincismile"],
  },
  {
    name: "TEALTH",
    logo: cloud + "v1788857049/smart-surgident/images/jh6hbrnznuucp1zpwaut.jpg",
    about: "Foshan manufacturer (est. 2012) of precision dental handpieces and surgical motor systems.",
    match: ["tealth", "tealth foshan medical equipment"],
  },
  {
    name: "Betterway",
    logo: "/brands/betterway-logo.png",
    about: "Foshan dental technology company making endo motors, apex locators, activators and curing lights.",
    match: ["betterway"],
  },
  {
    name: "Youjoy",
    logo: "/brands/youjoy-logo.png",
    about: "Ningbo-based equipment maker (est. 2005) of intraoral scanners, portable X-ray and clinic utilities.",
    match: ["youjoy"],
  },
  {
    name: "DTC",
    logo: cloud + "v1788856102/smart-surgident/images/bjllvihl1gglngxtnupd.webp",
    about: "Hangzhou DTC Medical Apparatus (est. 2004) — orthodontic brackets, pliers, elastics and materials.",
    match: ["dtc", "hangzhou dtc medical apparatus co"],
  },
  {
    name: "Genoray",
    logo: "/brands/genoary.png",
    about: "South Korean X-ray imaging company (est. 2001) making diagnostic systems for dental and medical use.",
    match: ["genoray", "geonary"],
  },
  {
    name: "Alwings",
    logo: "/brands/alwings.webp",
    about: "Shanghai supplier (est. 2018) of everyday dental and medical consumables and disposables.",
    match: ["alwings"],
  },
  {
    name: "Exlin",
    logo: "/brands/exlin.png",
    about: "Manufacturer of precision dental and surgical instruments — forceps, needle holders and more.",
    match: ["exlin"],
  },
  {
    name: "SONZ",
    logo: "/brands/sonz.png",
    about: "Chinese manufacturer of dental treatment and sterilisation equipment, including steam sterilisers.",
    match: ["sonz"],
  },
  {
    name: "PM DentMedix",
    logo: cloud + "v1788929748/smart-surgident/images/hkzg4dvfvmk7fcclhusj.jpg",
    about: "Taiwan-based dental equipment supplier (est. 2005) covering treatment equipment, lighting, imaging and polishers.",
    match: ["pm dentmedix", "pm dentmedix inc."],
  },
  {
    name: "Prima Dental",
    logo: "/brands/primadental-full-logo.png",
    about: "UK manufacturer of precision dental rotary instruments and milling solutions.",
    match: ["prima dental", "prima dental group"],
  },
  {
    name: "Dome",
    logo: "/brands/dome.png",
    about: "Indian dental and medical equipment company focused on reliable solutions for healthcare facilities.",
    match: ["dome", "domed"],
  },
  {
    name: "HUGE Dental",
    logo: cloud + "v1788857414/smart-surgident/images/rezut9gpdofqu74uanc9.webp",
    about: "Chinese dental materials manufacturer serving clinics, dental laboratories and digital dentistry.",
    match: ["huge dental", "huge"],
  },
  {
    name: "Zetin",
    logo: cloud + "v1788929612/smart-surgident/images/amuehmosnok4sn7cjccn.jpg",
    about: "Zhengzhou-based maker of equipment for dental laboratories, clinics and digital workflows.",
    match: ["zetin"],
  },
  {
    name: "FastForm",
    logo: cloud + "v1789282678/smart-surgident/images/y7uehncz7ztbkmhltwmx.png",
    match: ["fastform"],
  },
  {
    name: "Hongrun Technology",
    logo: cloud + "v1789282899/smart-surgident/images/uryghxwrk37fxec7nuyj.webp",
    match: ["hongrun technology", "hongrun"],
  },
  {
    name: "Foshan Yiyuan",
    logo: cloud + "v1789284784/smart-surgident/images/rsyfky8tukytep8szqxc.jpg",
    about: "Foshan Yiyuan Medical Technology Co., Ltd.",
    match: ["foshan yiyuan", "foshan yiyuan medical technology co,.ltd"],
  },
];

export const findBrand = (productBrand?: string) => {
  const key = productBrand?.trim().toLowerCase();
  if (!key) return undefined;
  return brandList.find((b) => b.match.includes(key));
};

// Brands with how many products each, most first. Brands without products are left out unless asked for.
export const brandCounts = (products: Product[], includeEmpty = false) => {
  const counts = new Map<string, number>();
  for (const p of products) {
    const brand = findBrand(p.brand);
    if (brand) counts.set(brand.name, (counts.get(brand.name) ?? 0) + 1);
  }
  return brandList
    .map((b) => ({ ...b, count: counts.get(b.name) ?? 0 }))
    .filter((b) => includeEmpty || b.count > 0)
    .sort((a, b) => b.count - a.count);
};
