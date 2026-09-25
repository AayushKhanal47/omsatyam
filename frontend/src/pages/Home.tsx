import { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { Category, Product } from "@/types";
import { useCatalog } from "@/hooks/useCatalog";
import { usePageTitle } from "@/hooks/usePageTitle";
import { findBrand } from "@/lib/brands";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import BrandMarquee from "@/components/home/BrandMarquee";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import ProductRail from "@/components/home/ProductRail";
import Spotlight from "@/components/home/Spotlight";
import ShopByBrand from "@/components/home/ShopByBrand";
import ClinicCta from "@/components/home/ClinicCta";
import LocalStore from "@/components/home/LocalStore";
import WhyChooseUs from "@/components/WhyChooseUs";

const byCategory = (products: Product[], categories: Category[], pattern: RegExp) => {
  const cat = categories.find((c) => pattern.test(c.name));
  return cat ? products.filter((p) => p.category?._id === cat._id) : [];
};

const Home = () => {
  const location = useLocation();
  const { products, categories } = useCatalog();

  usePageTitle(
    "Dental Supplier in Nepal",
    "Om Satyam Dental & Surgical supplies quality dental and surgical products across Nepal, including dental chairs, imaging, handpieces, instruments, consumables and equipment from trusted brands."
  );

  const sections = useMemo(() => {
    if (!products || !categories) return null;
    // Only feature products from known brands that have a photo.
    const showcase = products.filter((p) => p.images?.[0] && findBrand(p.brand));
    const pick = (pattern: RegExp) => byCategory(showcase, categories, pattern);
    // Two from each equipment category, with anything marked featured first.
    const equipment = [/chair|unit/i, /imaging|x-?ray/i, /microscope/i, /handpiece/i].flatMap((re) => pick(re).slice(0, 2));
    const featured = [...new Set([...showcase.filter((p) => p.isFeatured), ...equipment])].slice(0, 8);
    const withPoints = (list: Product[]) => list.find((p) => p.description.includes("\n- ")) ?? list[0];
    return {
      featured,
      imaging: withPoints(pick(/imaging|x-?ray/i)),
      handpiece: withPoints(pick(/handpiece/i)),
      endo: pick(/endodontic/i).slice(0, 4),
      consumables: [...pick(/consumable/i), ...pick(/restorative/i)].slice(0, 4),
    };
  }, [products, categories]);

  // Old links such as /?search=… or /?category=… now live on the catalogue page.
  if (location.search && /(^|[?&])(search|category|brand)=/.test(location.search)) {
    return <Navigate to={`/products${location.search}`} replace />;
  }

  const categorySlug = (pattern: RegExp) => categories?.find((c) => pattern.test(c.name))?.slug;

  return (
    <div>
      <Hero products={products} />
      <TrustStrip />
      <BrandMarquee />
      <CategoryShowcase categories={categories} products={products} />

      <ProductRail
        className="bg-white"
        eyebrow="Clinic equipment"
        title="Chairs, imaging & handpieces"
        description="The bigger investments — for setting up a new practice or upgrading the one you have."
        products={sections?.featured ?? null}
        viewAllTo="/products"
      />

      <Spotlight eyebrow="Diagnostic imaging" product={sections?.imaging} tone="cream" />

      <ProductRail
        eyebrow="Endodontics"
        title="Endo motors, apex locators & activators"
        products={sections ? sections.endo : null}
        viewAllTo={`/products?category=${categorySlug(/endodontic/i) ?? ""}`}
      />

      <Spotlight eyebrow="Handpieces & motors" product={sections?.handpiece} reverse tone="cream" />

      <ProductRail
        eyebrow="Everyday essentials"
        title="Consumables & restorative materials"
        products={sections ? sections.consumables : null}
        viewAllTo={`/products?category=${categorySlug(/consumable/i) ?? ""}`}
      />

      <ShopByBrand products={products} />
      <LocalStore />
      <WhyChooseUs />
      <ClinicCta />
    </div>
  );
};

export default Home;
