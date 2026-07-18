import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "@/components/admin/ProductList";
import type { Product } from "@/types";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [refreshKey] = useState(0);

  const handleEdit = (product: Product) => {
    navigate(`/admin/dashboard/products/${product._id}/edit`, { state: { product } });
  };

  return (
    <div className="animate-fade-in-up">
      <ProductList refreshKey={refreshKey} onEdit={handleEdit} />
    </div>
  );
};

export default ProductsPage;
