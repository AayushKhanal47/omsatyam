import { Link } from "react-router-dom";
import { PackagePlus, Package, ClipboardList } from "lucide-react";

const AdminOverview = () => {
  const cards = [
    { to: "/admin/dashboard/add-product", label: "Add Product", desc: "List a new item in your store", icon: PackagePlus },
    { to: "/admin/dashboard/products", label: "Manage Products", desc: "Edit, update stock, or remove products", icon: Package },
    { to: "/admin/dashboard/orders", label: "View Orders", desc: "Track and update order statuses", icon: ClipboardList },
  ];

  return (
    <div className="animate-fade-in-up">
      <h2 className="font-display text-xl font-semibold text-text">Welcome back</h2>
      <p className="mt-1 text-sm text-text-secondary">Choose what you'd like to manage.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary"
          >
            <card.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-3 font-display text-sm font-semibold text-text">{card.label}</h3>
            <p className="mt-1 text-xs text-text-secondary">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
