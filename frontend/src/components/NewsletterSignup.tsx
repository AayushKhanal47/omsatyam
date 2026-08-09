import { Bell, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "9779855046299";

const NewsletterSignup = () => {
  const message = "Hi, I'd like to receive updates on new products and offers from Om Satyam.";
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="flex flex-col items-start justify-between gap-5 rounded-lg border border-dashed border-primary/40 bg-primary/5 p-6 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Bell className="h-4 w-4 text-primary" />
          </span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wide text-primary">Stay in the loop</p>
            <h3 className="mt-0.5 font-display text-base font-semibold text-text">New products and offers, straight to WhatsApp</h3>
          </div>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="group flex flex-shrink-0 items-center gap-1.5 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover">
          Get updates
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
};

export default NewsletterSignup;
