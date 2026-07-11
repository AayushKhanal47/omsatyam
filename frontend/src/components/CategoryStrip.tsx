import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";
import { getCategories } from "@/api/categories";
import type { Category } from "@/types";

const CategoryStrip = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  if (categories.length === 0) return null;

  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl overflow-x-auto px-6 py-4">
        <div className="flex gap-3">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/?category=${cat._id}`}
              className="flex flex-shrink-0 items-center gap-2 rounded-full border border-border bg-bg px-4 py-2 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
            >
              <Stethoscope className="h-4 w-4" />
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryStrip;