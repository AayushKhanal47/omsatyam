import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { createOrder } from "@/api/orders";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "9779800000000";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCartStore();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placed, setPlaced] = useState(false);

  const buildWhatsappMessage = () => {
    const lines = items.map(
      (item) => `- ${item.product.name} x${item.quantity} (Rs. ${item.product.price * item.quantity})`
    );
    return `Hi, I'd like to order:\n\n${lines.join("\n")}\n\nTotal: Rs. ${totalPrice()}`;
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsappMessage())}`;

  const handleCheckout = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createOrder({
        customerName,
        phone,
        address,
        items: items.map((item) => ({ product: item.product._id, quantity: item.quantity })),
        notes: notes || undefined,
      });
      clearCart();
      setPlaced(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-lg animate-scale-in px-6 py-24 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp/10 text-2xl text-success">
          ✓
        </div>
        <h1 className="font-display text-xl font-semibold text-text">Order placed</h1>
        <p className="mt-2 text-sm text-text-secondary">
          We've received your order and will contact you shortly to confirm.
        </p>
        <Link to="/" className="mt-6 inline-block text-sm font-medium text-primary hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <p className="text-sm text-text-secondary">Your cart is empty.</p>
        <Link to="/" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl animate-fade-in-up px-6 py-10">
      <h1 className="font-display text-2xl font-semibold text-text">Your cart</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center gap-4 rounded-lg border border-border bg-surface p-4"
            >
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-bg">
                {item.product.images?.[0] && (
                  <img src={item.product.images[0]} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text">{item.product.name}</p>
                <p className="mt-1 font-mono text-sm text-text-secondary">
                  Rs. {item.product.price.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center rounded-md border border-border">
                <button
                  onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                  className="px-2.5 py-1.5 text-text hover:bg-bg"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                  className="px-2.5 py-1.5 text-text hover:bg-bg"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.product._id)}
                className="text-xs uppercase text-danger hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3">
            <span className="text-sm font-medium text-text">Total</span>
            <span className="font-mono text-lg font-semibold text-text">
              Rs. {totalPrice().toLocaleString()}
            </span>
          </div>

          
         <a
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center gap-2 rounded-md bg-whatsapp py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
>
  Order via WhatsApp instead
</a>
        </div>

        <form
          onSubmit={handleCheckout}
          className="flex h-fit flex-col gap-4 rounded-lg border border-border bg-surface p-6"
        >
          <h2 className="font-display text-lg font-semibold text-text">Checkout details</h2>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">Full name</label>
            <input
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
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

          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">Delivery address</label>
            <textarea
              required
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">Notes (optional)</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-md border border-border bg-bg px-3.5 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          {error && <p className="rounded-md bg-danger/10 px-3.5 py-2.5 text-sm text-danger">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 rounded-md bg-whatsapp py-2.5 text-sm font-medium text-white transition-colors hover:bg-whatsapp-hover disabled:opacity-50"
          >
            {loading ? "Placing order..." : "Place order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cart;
