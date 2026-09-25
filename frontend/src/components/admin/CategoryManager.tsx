import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { getCategories, createCategory, deleteCategory } from "@/api/categories";
import { getProducts } from "@/api/products";
import type { Category } from "@/types";
import PageHeader from "./PageHeader";
import { cardCls, errorCls, inputCls, labelCls, primaryBtnCls } from "./ui";

const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
    const totals = await Promise.all(
      res.data.map((cat) =>
        getProducts({ category: cat._id, limit: 1 })
          .then((r) => [cat._id, r.pagination?.total ?? 0] as const)
          .catch(() => [cat._id, 0] as const)
      )
    );
    setCounts(Object.fromEntries(totals));
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
    <div className="animate-fade-in-up">
      <PageHeader
        title="Categories"
        subtitle={categories ? `${categories.length} categories` : "Loading…"}
      />
      <div className="grid items-start gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className={`${cardCls} divide-y divide-admin-border overflow-hidden`}>
          {categories === null && <p className="p-6 text-center text-sm text-admin-slate">Loading…</p>}
          {categories?.length === 0 && (
            <p className="p-6 text-center text-sm text-admin-slate">No categories yet — add one.</p>
          )}
          {categories?.map((cat) => (
            <div key={cat._id} className="flex items-center gap-4 p-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-admin-navy">{cat.name}</p>
                <p className="text-xs text-admin-muted">
                  {counts[cat._id] === undefined ? "…" : `${counts[cat._id]} product${counts[cat._id] === 1 ? "" : "s"}`}
                </p>
              </div>
              <button
                onClick={() => handleDelete(cat._id)}
                className="text-xs font-semibold text-red-500 transition-colors hover:text-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleAdd} className={`${cardCls} flex flex-col gap-4 p-6`}>
          <h2 className="text-sm font-semibold text-admin-navy">Add category</h2>
          <div>
            <label className={labelCls}>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Surgical Instruments"
              className={inputCls}
            />
          </div>
          {error && <p className={errorCls}>{error}</p>}
          <button type="submit" disabled={loading} className={primaryBtnCls}>
            {loading ? "Adding…" : "Add category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryManager;
