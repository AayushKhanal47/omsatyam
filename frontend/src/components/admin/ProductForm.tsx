import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { X } from "lucide-react";
import { getCategories } from "@/api/categories";
import { createProduct, updateProduct } from "@/api/adminProducts";
import { uploadImageToCloudinary } from "@/api/cloudinary";
import type { Category, Product } from "@/types";

interface SpecRow {
  key: string;
  value: string;
}

interface ProductFormProps {
  onCreated?: () => void;
  editingProduct?: Product | null;
  onCancelEdit?: () => void;
}

const ProductForm = ({ onCreated, editingProduct, onCancelEdit }: ProductFormProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [priceOnRequest, setPriceOnRequest] = useState(false);
  const [stock, setStock] = useState("0");
  const [brand, setBrand] = useState("");
  const [sku, setSku] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [specs, setSpecs] = useState<SpecRow[]>([{ key: "", value: "" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const isEditing = Boolean(editingProduct);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setDescription(editingProduct.description);
      setCategory(editingProduct.category?._id || "");
      setPrice(editingProduct.priceOnRequest ? "" : String(editingProduct.price));
      setPriceOnRequest(editingProduct.priceOnRequest);
      setStock(String(editingProduct.stock));
      setBrand(editingProduct.brand || "");
      setSku(editingProduct.sku || "");
      setImages(editingProduct.images || []);
      setSpecs(
        editingProduct.specifications.length > 0
          ? editingProduct.specifications
          : [{ key: "", value: "" }]
      );
    }
  }, [editingProduct]);

  const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadError(null);
    try {
      const uploadPromises = Array.from(files).map((file) => uploadImageToCloudinary(file));
      const urls = await Promise.all(uploadPromises);
      setImages((prev) => [...prev, ...urls]);
    } catch (err) {
      setUploadError("One or more images failed to upload. Try again.");
      console.error(err);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSpec = (index: number, field: "key" | "value", value: string) => {
    setSpecs((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const addSpecRow = () => setSpecs((prev) => [...prev, { key: "", value: "" }]);
  const removeSpecRow = (index: number) => setSpecs((prev) => prev.filter((_, i) => i !== index));

  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setPriceOnRequest(false);
    setStock("0");
    setBrand("");
    setSku("");
    setImages([]);
    setSpecs([{ key: "", value: "" }]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!category) {
      setError("Please select a category");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name,
        description,
        category,
        price: priceOnRequest ? 0 : Number(price),
        priceOnRequest,
        images,
        stock: Number(stock),
        specifications: specs.filter((s) => s.key.trim() && s.value.trim()),
        brand: brand || undefined,
        sku: sku || undefined,
        isFeatured: false,
      };

      if (isEditing && editingProduct) {
        await updateProduct(editingProduct._id, payload);
      } else {
        await createProduct(payload);
      }

      resetForm();
      setSuccess(true);
     onCreated?.();
      if (isEditing && onCancelEdit) onCancelEdit();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message || `Failed to ${isEditing ? "update" : "create"} product`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    setError(null);
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in-up flex flex-col gap-4 rounded-lg border border-border bg-surface p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-text">
          {isEditing ? "Edit product" : "Add product"}
        </h2>
        {isEditing && (
          <button type="button" onClick={handleCancel} className="text-sm font-medium text-text-secondary hover:text-text">
            Cancel
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">
            Name <span className="text-danger">*</span>
          </label>
          <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary" />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">
            Category <span className="text-danger">*</span>
          </label>
          <select required value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary">
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">
          Description <span className="text-danger">*</span>
        </label>
        <textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Price (Rs.)</label>
          <input type="number" min="0" disabled={priceOnRequest} value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary disabled:opacity-40" />
          <label className="mt-1.5 flex items-center gap-1.5 text-xs text-text-secondary">
            <input type="checkbox" checked={priceOnRequest} onChange={(e) => setPriceOnRequest(e.target.checked)} />
            Contact for price
          </label>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Stock</label>
          <input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary" />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">SKU (optional)</label>
          <input value={sku} onChange={(e) => setSku(e.target.value)} className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">Brand (optional)</label>
        <input value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary" />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">Product images</label>
        <p className="mb-2 text-xs text-text-secondary">Add one or more photos. The first one is used as the main thumbnail.</p>

        {images.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-3">
            {images.map((url, i) => (
              <div key={i} className="relative">
                <img src={url} alt={`Product ${i + 1}`} className="h-20 w-20 rounded-md border border-border object-cover" />
                {i === 0 && (
                  <span className="absolute -left-1 -top-1 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-semibold text-white">Main</span>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-white"
                  aria-label="Remove image"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageSelect}
          disabled={uploading}
          className="block w-full text-sm text-text-secondary file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3.5 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary-hover"
        />
        {uploading && <p className="mt-1 text-xs text-text-secondary">Uploading...</p>}
        {uploadError && <p className="mt-1 text-xs text-danger">{uploadError}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">Specifications</label>
        {specs.map((spec, i) => (
          <div key={i} className="mb-2 flex gap-2">
            <input placeholder="Key (e.g. Material)" value={spec.key} onChange={(e) => updateSpec(i, "key", e.target.value)} className="w-1/3 rounded-md border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-primary" />
            <input placeholder="Value (e.g. Stainless Steel)" value={spec.value} onChange={(e) => updateSpec(i, "value", e.target.value)} className="flex-1 rounded-md border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-primary" />
            {specs.length > 1 && (
              <button type="button" onClick={() => removeSpecRow(i)} className="px-2 text-sm text-danger">✕</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addSpecRow} className="mt-1 text-sm font-medium text-primary hover:underline">+ Add specification</button>
      </div>

      {error && <p className="rounded-md bg-danger/10 px-3.5 py-2.5 text-sm text-danger">{error}</p>}
      {success && (
        <p className="animate-fade-in rounded-md bg-success/10 px-3.5 py-2.5 text-sm text-success">
          Product {isEditing ? "updated" : "created"} successfully.
        </p>
      )}

      <button type="submit" disabled={loading || uploading} className="mt-2 rounded-md bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50">
        {loading ? (isEditing ? "Saving..." : "Creating...") : (isEditing ? "Save changes" : "Create product")}
      </button>
    </form>
  );
};

export default ProductForm;
