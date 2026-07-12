import { useState, type FormEvent } from "react";
import { Package, CheckCircle2, Truck, XCircle, Clock } from "lucide-react";
import { trackOrder } from "@/api/orders";
import type { Order } from "@/types";
import { usePageTitle } from "@/hooks/usePageTitle";

const statusSteps = ["pending", "confirmed", "delivered"];

const statusIcon = {
  pending: Clock,
  confirmed: CheckCircle2,
  delivered: Truck,
  cancelled: XCircle,
};

const TrackOrder = () => {
  usePageTitle("Track your order", "Check the status of your Om Satyam order.");

  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setOrder(null);
    setLoading(true);
    try {
      const res = await trackOrder(orderId.trim(), phone.trim());
      setOrder(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Order not found. Check your Order ID and phone number.");
    } finally {
      setLoading(false);
    }
  };

  const StatusIcon = order ? statusIcon[order.status] : Package;
  const currentStepIndex = order ? statusSteps.indexOf(order.status) : -1;

  return (
    <div className="mx-auto max-w-2xl animate-fade-in-up px-6 py-16">
      <h1 className="font-display text-2xl font-semibold text-text">Track your order</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Enter your Order ID and the phone number you used at checkout.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 rounded-lg border border-border bg-surface p-6">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Order ID</label>
          <input
            required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g. 668f1a2b3c4d5e6f7a8b9c0d"
            className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Phone number</label>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
        >
          {loading ? "Searching..." : "Track order"}
        </button>
        {error && <p className="rounded-md bg-danger/10 px-3.5 py-2.5 text-sm text-danger">{error}</p>}
      </form>

      {order && (
        <div className="mt-6 animate-fade-in-up rounded-lg border border-border bg-surface p-6">
          <div className="flex items-center gap-3">
            <StatusIcon className="h-6 w-6 text-primary" />
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-text-secondary">Status</p>
              <p className="font-display text-lg font-semibold capitalize text-text">{order.status}</p>
            </div>
          </div>

          {order.status !== "cancelled" && (
            <div className="mt-6 flex items-center">
              {statusSteps.map((step, i) => (
                <div key={step} className="flex flex-1 items-center">
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      i <= currentStepIndex ? "bg-primary text-white" : "bg-border text-text-secondary"
                    }`}
                  >
                    {i + 1}
                  </div>
                  {i < statusSteps.length - 1 && (
                    <div className={`h-0.5 flex-1 ${i < currentStepIndex ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 border-t border-border pt-4">
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
      )}
    </div>
  );
};

export default TrackOrder;
