import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { getCategories } from "@/api/categories";
import { createProduct } from "@/api/adminProducts";
import type { Category } from "@/types";

interface SpecRow {
  key: string;
  value: string;
}

const ProductForm = ({ onCreated }: { onCreated: () => void }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [priceOnRequest, setPriceOnRequest] = useState(false);
  const [stock, setStock] = useState("0");
  const [brand, setBrand] = useState("");
  const [sku, setSku] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [specs, setSpecs] = useState<SpecRow[]>([{ key: "", value: "" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

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
    setImageUrl("");
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
      await createProduct({
        name,
        description,
        category,
        price: priceOnRequest ? 0 : Number(price),
        priceOnRequest,
        images: imageUrl ? [imageUrl] : [],
        stock: Number(stock),
        specifications: specs.filter((s) => s.key.trim() && s.value.trim()),
        brand: brand || undefined,
        sku: sku || undefined,
        isFeatured: false,
      });
      resetForm();
      setSuccess(true);
      onCreated();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-in-up flex flex-col gap-4 rounded-lg border border-border bg-surface p-6"
    >
      <h2 className="font-display text-lg font-semibold text-text">Add product</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Category</label>
          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">Description</label>
        <textarea
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Price (Rs.)</label>
          <input
            type="number"
            min="0"
            disabled={priceOnRequest}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary disabled:opacity-40"
          />
          <label className="mt-1.5 flex items-center gap-1.5 text-xs text-text-secondary">
            <input
              type="checkbox"
              checked={priceOnRequest}
              onChange={(e) => setPriceOnRequest(e.target.checked)}
            />
            Contact for price
          </label>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Stock</label>
          <input
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">SKU (optional)</label>
          <input
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Brand (optional)</label>
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Image URL (optional for now)</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">Specifications</label>
        {specs.map((spec, i) => (
          <div key={i} className="mb-2 flex gap-2">
            <input
              placeholder="Key (e.g. Material)"
              value={spec.key}
              onChange={(e) => updateSpec(i, "key", e.target.value)}
              className="w-1/3 rounded-md border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <input
              placeholder="Value (e.g. Stainless Steel)"
              value={spec.value}
              onChange={(e) => updateSpec(i, "value", e.target.value)}
              className="flex-1 rounded-md border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-primary"
            />
            {specs.length > 1 && (
              <button
                type="button"
                onClick={() => removeSpecRow(i)}
                className="px-2 text-sm text-danger"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addSpecRow}
          className="mt-1 text-sm font-medium text-primary hover:underline"
        >
          + Add specification
        </button>
      </div>

      {error && <p className="rounded-md bg-danger/10 px-3.5 py-2.5 text-sm text-danger">{error}</p>}
      {success && (
        <p className="animate-fade-in rounded-md bg-success/10 px-3.5 py-2.5 text-sm text-success">
          Product created successfully.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 rounded-md bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
      >
        {loading ? "Creating…" : "Create product"}
      </button>
    </form>
  );
};

export default ProductForm;