import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Check, Minus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { createOrder } from "@/api/orders";
import { usePageTitle } from "@/hooks/usePageTitle";
import { whatsappLink } from "@/lib/contact";
import { MAX_CART_LINES, MAX_QTY_PER_ITEM } from "@/lib/limits";
import { TURNSTILE_SITE_KEY } from "@/lib/turnstile";
import Turnstile from "@/components/Turnstile";

const inputCls =
  "w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-text outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";
const labelCls = "mb-1.5 block text-sm font-medium text-text";

const Cart = () => {
  usePageTitle("Cart", "Review your cart and checkout.");

  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCartStore();

  const [customerName, setCustomerName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [placed, setPlaced] = useState(false);

  const allPriceOnRequest = items.every((item) => item.product.priceOnRequest);
  const needsVerification = Boolean(TURNSTILE_SITE_KEY) && !turnstileToken;

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\s+/g, "");
    const nepalMobilePattern = /^(\+977)?9[6-9]\d{8}$/;
    if (!nepalMobilePattern.test(cleaned)) {
      setPhoneError("Enter a valid 10-digit Nepal mobile number (e.g. 98XXXXXXXX)");
      return false;
    }
    setPhoneError(null);
    return true;
  };

  const whatsappMessage = () => {
    const lines = items.map((item) =>
      item.product.priceOnRequest
        ? `- ${item.product.name} x${item.quantity}`
        : `- ${item.product.name} x${item.quantity} (Rs. ${item.product.price * item.quantity})`
    );
    return `Hi, I'd like to order:\n\n${lines.join("\n")}${allPriceOnRequest ? "" : `\n\nTotal: Rs. ${totalPrice()}`}`;
  };

  const handleCheckout = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validatePhone(phone)) return;
    if (needsVerification) {
      setError("Please complete the verification check below.");
      return;
    }

    setLoading(true);
    try {
      await createOrder({
        customerName,
        clinicName: clinicName || undefined,
        phone,
        address,
        items: items.map((item) => ({ product: item.product._id, quantity: item.quantity })),
        notes: notes || undefined,
        website,
        turnstileToken: turnstileToken ?? undefined,
      });
      clearCart();
      setPlaced(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not place order. Please try again.");
      // Turnstile tokens are single-use, so get a fresh one for the retry.
      setTurnstileReset((n) => n + 1);
    } finally {
      setLoading(false);
    }
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-lg animate-scale-in px-6 py-24 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="font-display text-2xl font-bold text-text">Order placed</h1>
        <p className="mt-3 text-sm text-text-secondary">
          We've received your order and will contact you shortly to confirm the price and delivery.
        </p>
        <p className="mt-2 text-sm text-text-secondary">You can check its status anytime with your phone number.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/products" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover">
            Continue shopping
          </Link>
          <Link to="/track-order" className="rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-text hover:border-primary">
            Track your order
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-text">Your cart is empty</h1>
        <p className="mt-2 text-sm text-text-secondary">Find what your clinic needs in the catalogue.</p>
        <Link to="/products" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl animate-fade-in-up px-5 py-10 sm:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight text-text">Your cart</h1>
      <p className="mt-1 text-sm text-text-secondary">
        {totalItems()} item{totalItems() === 1 ? "" : "s"} · up to {MAX_QTY_PER_ITEM} of each product and{" "}
        {MAX_CART_LINES} different products per online order
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.product._id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-white p-4 sm:flex-nowrap">
              <Link to={`/product/${item.product.slug}`} className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-white">
                {item.product.images?.[0] && (
                  <img src={item.product.images[0]} alt="" className="h-full w-full object-contain" />
                )}
              </Link>
              <div className="min-w-0 flex-1">
                <Link to={`/product/${item.product.slug}`} className="line-clamp-2 text-sm font-semibold text-text hover:text-primary">
                  {item.product.name}
                </Link>
                <p className="mt-1 text-sm text-text-secondary">
                  {item.product.priceOnRequest ? "Price on request" : `Rs. ${item.product.price.toLocaleString()}`}
                </p>
                {item.quantity >= MAX_QTY_PER_ITEM && (
                  <p className="mt-1 text-xs text-accent">Online limit reached — message us for more.</p>
                )}
              </div>
              <div className="flex items-center rounded-full border border-border">
                <button
                  onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-9 w-9 items-center justify-center text-text hover:text-primary disabled:opacity-30"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                  disabled={item.quantity >= MAX_QTY_PER_ITEM}
                  aria-label="Increase quantity"
                  className="flex h-9 w-9 items-center justify-center text-text hover:text-primary disabled:opacity-30"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                onClick={() => removeItem(item.product._id)}
                aria-label={`Remove ${item.product.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:bg-danger/10 hover:text-danger"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          {!allPriceOnRequest && (
            <div className="flex items-center justify-between rounded-2xl border border-border bg-white px-5 py-4">
              <span className="text-sm font-medium text-text">Total (listed prices)</span>
              <span className="font-display text-lg font-bold text-text">Rs. {totalPrice().toLocaleString()}</span>
            </div>
          )}

          <a
            href={whatsappLink(whatsappMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp py-3 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-hover"
          >
            Order via WhatsApp instead
          </a>
        </div>

        <form onSubmit={handleCheckout} className="flex h-fit flex-col gap-4 rounded-3xl border border-border bg-white p-6 lg:sticky lg:top-40">
          <h2 className="font-display text-lg font-semibold text-text">Checkout details</h2>

          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div>
            <label className={labelCls}>
              Full name <span className="text-danger">*</span>
            </label>
            <input required maxLength={100} value={customerName} onChange={(e) => setCustomerName(e.target.value)} className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>
              Clinic / practice name <span className="text-text-secondary">(optional)</span>
            </label>
            <input
              maxLength={120}
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              placeholder="e.g. Smile Dental Clinic"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>
              Phone number <span className="text-danger">*</span>
            </label>
            <input
              required
              type="tel"
              maxLength={20}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (phoneError) validatePhone(e.target.value);
              }}
              onBlur={(e) => validatePhone(e.target.value)}
              className={`${inputCls} ${phoneError ? "border-danger" : ""}`}
            />
            {phoneError && <p className="mt-1 text-xs text-danger">{phoneError}</p>}
          </div>

          <div>
            <label className={labelCls}>
              Delivery address <span className="text-danger">*</span>
            </label>
            <textarea required rows={2} maxLength={300} value={address} onChange={(e) => setAddress(e.target.value)} className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Notes (optional)</label>
            <textarea rows={2} maxLength={1000} value={notes} onChange={(e) => setNotes(e.target.value)} className={inputCls} />
          </div>

          <Turnstile onToken={setTurnstileToken} resetKey={turnstileReset} />

          {error && <p className="rounded-xl bg-danger/10 px-3.5 py-2.5 text-sm text-danger">{error}</p>}

          <button
            type="submit"
            disabled={loading || needsVerification}
            className="mt-1 rounded-full bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
          >
            {loading ? "Placing order…" : "Place order"}
          </button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-text-secondary">
            <ShieldCheck className="h-3.5 w-3.5" /> We'll contact you to confirm your order.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Cart;
