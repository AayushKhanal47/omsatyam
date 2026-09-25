import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getProducts, getBrands } from "@/api/products";
import { getCategories } from "@/api/categories";
import { getOrders } from "@/api/orders";
import type { Order } from "@/types";
import PageHeader from "@/components/admin/PageHeader";
import { cardCls, cardTitleCls, statusBadge } from "@/components/admin/ui";

interface Stats {
  products: number;
  brands: number;
  categories: number;
  orders: number;
  pending: number;
  confirmed: number;
  delivered: number;
}

const quickActions = [
  { to: "/admin/dashboard/products", label: "Add a product" },
  { to: "/admin/dashboard/categories", label: "Add a category" },
  { to: "/admin/dashboard/orders", label: "Review pending orders" },
  { to: "/admin/dashboard/account", label: "Update account details" },
];

const AdminOverview = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    const total = (p: Promise<{ pagination?: { total: number } }>) =>
      p.then((r) => r.pagination?.total ?? 0).catch(() => 0);

    Promise.all([
      total(getProducts({ limit: 1 })),
      getBrands().then((r) => r.data.length).catch(() => 0),
      getCategories().then((r) => r.data.length).catch(() => 0),
      getOrders().catch(() => null),
      total(getOrders("pending")),
      total(getOrders("confirmed")),
      total(getOrders("delivered")),
    ]).then(([products, brands, categories, orders, pending, confirmed, delivered]) => {
      setStats({
        products,
        brands,
        categories,
        orders: orders?.pagination?.total ?? 0,
        pending,
        confirmed,
        delivered,
      });
      setRecentOrders(orders?.data.slice(0, 5) ?? []);
    });
  }, []);

  const cards: { label: string; value?: number; note?: string; to: string }[] = [
    { label: "Products", value: stats?.products, to: "/admin/dashboard/products" },
    { label: "Brands", value: stats?.brands, to: "/admin/dashboard/products" },
    { label: "Categories", value: stats?.categories, to: "/admin/dashboard/categories" },
    { label: "Total orders", value: stats?.orders, to: "/admin/dashboard/orders" },
    { label: "Pending orders", value: stats?.pending, note: "Awaiting confirmation", to: "/admin/dashboard/orders" },
    { label: "Confirmed", value: stats?.confirmed, to: "/admin/dashboard/orders" },
    { label: "Delivered", value: stats?.delivered, to: "/admin/dashboard/orders" },
  ];

  return (
    <div className="animate-fade-in-up">
      <PageHeader title="Dashboard" subtitle="A quick view of the catalogue and orders." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} to={card.to} className={`${cardCls} p-5 transition-colors hover:border-primary/40`}>
            <p className={cardTitleCls}>{card.label}</p>
            <p className="mt-2 font-display text-2xl font-bold text-admin-navy">{card.value ?? "–"}</p>
            {card.note && <p className="mt-1 text-xs text-admin-slate">{card.note}</p>}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className={`${cardCls} p-6`}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className={cardTitleCls}>Recent orders</h2>
            <Link to="/admin/dashboard/orders" className="text-xs font-semibold text-primary hover:text-primary-hover">
              View all
            </Link>
          </div>
          {recentOrders === null && <p className="py-6 text-center text-sm text-admin-slate">Loading…</p>}
          {recentOrders?.length === 0 && <p className="py-6 text-center text-sm text-admin-slate">No orders yet.</p>}
          <ul className="divide-y divide-admin-border">
            {recentOrders?.map((order) => (
              <li key={order._id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-admin-navy">{order.customerName}</p>
                  <p className="text-xs text-admin-muted">
                    {order.items.length} item{order.items.length === 1 ? "" : "s"} · {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${statusBadge[order.status]}`}>
                  {order.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${cardCls} p-6`}>
          <h2 className={`${cardTitleCls} mb-2`}>Quick actions</h2>
          <div className="divide-y divide-admin-border">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className="-mx-2 flex items-center justify-between rounded-lg px-2 py-3 text-sm text-admin-navy transition-colors hover:bg-admin-bg"
              >
                {action.label}
                <ArrowRight className="h-4 w-4 text-admin-muted" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminOverview;
