import CategoryManager from "@/components/admin/CategoryManager";
import ProductForm from "@/components/admin/ProductForm";

const AddProduct = () => {
  return (
    <div className="animate-fade-in-up grid gap-6 lg:grid-cols-2">
      <CategoryManager />
      <ProductForm />
    </div>
  );
};

export default AddProduct;