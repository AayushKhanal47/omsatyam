import { useEffect, useState } from "react";
import { getAllProducts } from "@/api/products";
import { getCategories } from "@/api/categories";
import type { Category, Product } from "@/types";

interface Catalog {
  products: Product[];
  categories: Category[];
}

// One shared request per page load, so the home, catalogue and brand pages don't refetch.
let catalogPromise: Promise<Catalog> | null = null;

const loadCatalog = () => {
  if (!catalogPromise) {
    catalogPromise = Promise.all([getAllProducts(), getCategories().then((r) => r.data)])
      .then(([products, categories]) => ({ products, categories }))
      .catch((err) => {
        catalogPromise = null;
        throw err;
      });
  }
  return catalogPromise;
};

export const useCatalog = () => {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    loadCatalog()
      .then((c) => active && setCatalog(c))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, []);

  return { products: catalog?.products ?? null, categories: catalog?.categories ?? null, error };
};
