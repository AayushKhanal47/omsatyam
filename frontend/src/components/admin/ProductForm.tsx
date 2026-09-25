import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { X } from "lucide-react";
import { getCategories } from "@/api/categories";
import { createProduct, updateProduct } from "@/api/adminProducts";
import { uploadImageToCloudinary } from "@/api/cloudinary";
import type { Category, Product } from "@/types";
import { cardCls, errorCls, fileInputCls, hintCls, inputCls, labelCls, primaryBtnCls, successCls } from "./ui";

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
    <form onSubmit={handleSubmit} className={`${cardCls} flex flex-col gap-4 p-6`}>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-admin-navy">{isEditing ? "Edit product" : "Add product"}</h2>
        {isEditing && (
          <button type="button" onClick={handleCancel} className="text-xs font-semibold text-admin-slate hover:text-admin-navy">
            Cancel
          </button>
        )}
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-sm font-medium text-admin-navy">Product photos</label>
          <span className="text-xs text-admin-muted">{images.length} added</span>
        </div>
        {images.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-3">
            {images.map((url, i) => (
              <div key={url + i} className="relative">
                <img src={url} alt={`Product ${i + 1}`} className="h-16 w-16 rounded-xl border border-admin-border object-cover" />
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
        <input type="file" accept="image/*" multiple onChange={handleImageSelect} disabled={uploading} className={fileInputCls} />
        <p className={hintCls}>{uploading ? "Uploading…" : "The first photo is used as the main thumbnail."}</p>
        {uploadError && <p className="mt-1 text-xs text-danger">{uploadError}</p>}
      </div>

      <div>
        <label className={labelCls}>Name <span className="text-danger">*</span></label>
        <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>Brand</label>
        <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g. Bondent" className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>Category <span className="text-danger">*</span></label>
        <select required value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelCls}>Description <span className="text-danger">*</span></label>
        <textarea required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className={labelCls}>Price (Rs.)</label>
          <input type="number" min="0" disabled={priceOnRequest} value={price} onChange={(e) => setPrice(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Stock</label>
          <input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>SKU</label>
          <input value={sku} onChange={(e) => setSku(e.target.value)} className={inputCls} />
        </div>
      </div>
      <label className="-mt-2 flex items-center gap-2 text-xs text-admin-slate">
        <input type="checkbox" checked={priceOnRequest} onChange={(e) => setPriceOnRequest(e.target.checked)} className="accent-primary" />
        Contact for price (hide the price on the site)
      </label>

      <div>
        <label className={labelCls}>Specifications</label>
        {specs.map((spec, i) => (
          <div key={i} className="mb-2 flex gap-2">
            <input placeholder="Key (e.g. Material)" value={spec.key} onChange={(e) => updateSpec(i, "key", e.target.value)} className={`${inputCls} w-2/5`} />
            <input placeholder="Value" value={spec.value} onChange={(e) => updateSpec(i, "value", e.target.value)} className={inputCls} />
            {specs.length > 1 && (
              <button type="button" onClick={() => removeSpecRow(i)} className="px-1 text-danger" aria-label="Remove specification">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addSpecRow} className="text-xs font-semibold text-primary hover:text-primary-hover">+ Add specification</button>
      </div>

      {error && <p className={errorCls}>{error}</p>}
      {success && <p className={`animate-fade-in ${successCls}`}>Product {isEditing ? "updated" : "created"} successfully.</p>}

      <button type="submit" disabled={loading || uploading} className={primaryBtnCls}>
        {loading ? (isEditing ? "Saving…" : "Creating…") : (isEditing ? "Save changes" : "Add product")}
      </button>
    </form>
  );
};

export default ProductForm;
