import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "@/api/orders";
import type { Order, OrderStatus } from "@/types";

const statusOptions: OrderStatus[] = ["pending", "confirmed", "delivered", "cancelled"];

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-accent/15 text-accent",
  confirmed: "bg-primary/15 text-primary",
  delivered: "bg-success/15 text-success",
  cancelled: "bg-danger/15 text-danger",
};

const OrderManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadOrders = async () => {
    setLoading(true);
    const res = await getOrders(filter || undefined);
    setOrders(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, [filter]);

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await updateOrderStatus(id, status);
      await loadOrders();
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="animate-fade-in-up rounded-lg border border-border bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-text">Orders</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-md border border-border bg-bg px-3 py-1.5 text-sm outline-none focus:border-primary"
        >
          <option value="">All statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {loading && <p className="text-sm text-text-secondary">Loading...</p>}

      {!loading && orders.length === 0 && (
        <p className="text-sm text-text-secondary">No orders yet.</p>
      )}

      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <div key={order._id} className="rounded-lg border border-border p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-text">{order.customerName}</p>
                <p className="text-xs text-text-secondary">{order.phone} &middot; {order.address}</p>
                <p className="mt-1 text-xs text-text-secondary">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>

            <div className="mt-3 border-t border-border pt-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-xs text-text-secondary">
                  <span>{item.name} x{item.quantity}</span>
                  <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="mt-2 flex justify-between text-sm font-medium text-text">
                <span>Total</span>
                <span>Rs. {order.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {order.notes && (
              <p className="mt-2 rounded-md bg-bg px-3 py-2 text-xs text-text-secondary">
                Note: {order.notes}
              </p>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {statusOptions.map((s) => (
                <button
                  key={s}
                  disabled={s === order.status || updatingId === order._id}
                  onClick={() => handleStatusChange(order._id, s)}
                  className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-text transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Mark {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManager;
