import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Clock, CheckCircle2, Truck, XCircle } from "lucide-react";
import { trackOrdersByPhone } from "@/api/orders";
import type { Order, OrderStatus } from "@/types";
import { usePageTitle } from "@/hooks/usePageTitle";

const statusIcon: Record<OrderStatus, typeof Clock> = {
  pending: Clock,
  confirmed: CheckCircle2,
  delivered: Truck,
  cancelled: XCircle,
};

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-accent/15 text-accent",
  confirmed: "bg-primary/15 text-primary",
  delivered: "bg-success/15 text-success",
  cancelled: "bg-danger/15 text-danger",
};

const TrackOrder = () => {
  usePageTitle("Track your order", "Check the status of your Om Satyam order.");

  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setOrders(null);
    setLoading(true);
    try {
      const res = await trackOrdersByPhone(phone.trim());
      if (res.data.length === 0) {
        setError("No orders found for this phone number.");
      } else {
        setOrders(res.data);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl animate-fade-in-up px-6 py-16">
      <h1 className="font-display text-2xl font-semibold text-text">Track your order</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Enter the phone number you used at checkout to see all your orders.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex gap-2 rounded-lg border border-border bg-surface p-4">
        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g. 98XXXXXXXX"
          className="flex-1 rounded-md border border-border bg-bg px-3.5 py-2.5 text-sm outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <p className="mt-4 rounded-md bg-danger/10 px-3.5 py-2.5 text-sm text-danger">{error}</p>
      )}

      {orders && orders.length > 0 && (
        <div className="mt-6 flex flex-col gap-3">
          {orders.map((order) => {
            const Icon = statusIcon[order.status];
            return (
              <div key={order._id} className="animate-fade-in-up rounded-lg border border-border bg-surface p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-text-secondary" />
                    <span className="text-xs text-text-secondary">
                      {new Date(order.createdAt).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>

                <div className="mt-3 border-t border-border pt-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm text-text-secondary">
                      <span>{item.name} x{item.quantity}</span>
                      <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="mt-2 flex justify-between text-sm font-semibold text-text">
                    <span>Total</span>
                    <span>Rs. {order.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-8 text-center text-sm text-text-secondary">
        Prefer WhatsApp?{" "}
        <Link to="/contact" className="font-medium text-primary hover:underline">
          Contact us directly
        </Link>
      </p>
    </div>
  );
};

export default TrackOrder;
