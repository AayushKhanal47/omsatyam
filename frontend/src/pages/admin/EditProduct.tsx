import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import ProductForm from "@/components/admin/ProductForm";
import { getProducts } from "@/api/products";
import type { Product } from "@/types";

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const stateProduct = (location.state as { product?: Product } | null)?.product;

  const [product, setProduct] = useState<Product | null>(stateProduct || null);
  const [loading, setLoading] = useState(!stateProduct);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (stateProduct || !id) return;

    // Fallback if the page was opened/refreshed directly without navigation state
    getProducts({ limit: 50 })
      .then((res) => {
        const found = res.data.find((p) => p._id === id);
        if (found) {
          setProduct(found);
        } else {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [id, stateProduct]);

  const handleSaved = () => {
    navigate("/admin/dashboard/products");
  };

  if (loading) {
    return <p className="text-sm text-text-secondary">Loading product...</p>;
  }

  if (notFound || !product) {
    return (
      <div>
        <p className="text-sm text-text-secondary">Product not found.</p>
        <Link to="/admin/dashboard/products" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up max-w-2xl">
      <ProductForm
        key={product._id}
        editingProduct={product}
        onCreated={handleSaved}
        onCancelEdit={() => navigate("/admin/dashboard/products")}
      />
    </div>
  );
};

export default EditProduct;
