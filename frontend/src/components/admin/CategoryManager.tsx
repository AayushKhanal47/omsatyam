import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { getCategories, createCategory, deleteCategory } from "@/api/categories";
import type { Category } from "@/types";

const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await createCategory({ name: name.trim() });
      setName("");
      await loadCategories();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category? Products using it may be affected.")) return;
    await deleteCategory(id);
    await loadCategories();
  };

  return (
    <div className="animate-fade-in-up rounded-lg border border-border bg-surface p-6">
      <h2 className="font-display text-lg font-semibold text-text">Categories</h2>

      <form onSubmit={handleAdd} className="mt-4 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Surgical Instruments"
          className="flex-1 rounded-md border border-border bg-bg px-3.5 py-2 text-sm text-text outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
        >
          Add
        </button>
      </form>

      {error && <p className="mt-2 text-sm text-danger">{error}</p>}

      <ul className="mt-4 flex flex-col gap-2">
        {categories.map((cat) => (
          <li
            key={cat._id}
            className="flex items-center justify-between rounded-md border border-border px-3.5 py-2 text-sm"
          >
            <span className="text-text">{cat.name}</span>
            <button
              onClick={() => handleDelete(cat._id)}
              className="font-mono text-xs uppercase text-danger hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
        {categories.length === 0 && (
          <p className="text-sm text-text-secondary">No categories yet — add one above.</p>
        )}
      </ul>
    </div>
  );
};

export default CategoryManager;