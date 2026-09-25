import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "@/components/admin/ProductList";
import ProductForm from "@/components/admin/ProductForm";
import PageHeader from "@/components/admin/PageHeader";
import { getAllProducts } from "@/api/adminProducts";
import type { Product } from "@/types";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[] | null>(null);

  const load = useCallback(() => {
    getAllProducts().then(setProducts);
  }, []);

  useEffect(load, [load]);

  const handleEdit = (product: Product) => {
    navigate(`/admin/dashboard/products/${product._id}/edit`, { state: { product } });
  };

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Products"
        subtitle={products ? `${products.length} in the catalogue` : "Loading catalogue…"}
      />
      <div className="grid items-start gap-6 xl:grid-cols-[1.5fr_1fr]">
        <ProductList products={products} onEdit={handleEdit} onDeleted={load} />
        <div className="xl:sticky xl:top-10">
          <ProductForm onCreated={load} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
