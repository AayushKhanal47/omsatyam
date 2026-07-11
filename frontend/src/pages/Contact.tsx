    import WhatsAppButton from "@/components/WhatsAppButton";
import { Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="mx-auto max-w-3xl animate-fade-in-up px-6 py-16">
      <h1 className="font-display text-2xl font-semibold text-text">Contact us</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-surface p-5">
          <MapPin className="h-5 w-5 text-primary" />
          <p className="mt-2 text-sm font-medium text-text">Location</p>
          <p className="text-xs text-text-secondary">Bharatpur, Nepal</p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-5">
          <Clock className="h-5 w-5 text-primary" />
          <p className="mt-2 text-sm font-medium text-text">Store hours</p>
          <p className="text-xs text-text-secondary">Sun – Fri, 9 AM – 6 PM</p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-5">
          <Phone className="h-5 w-5 text-primary" />
          <p className="mt-2 text-sm font-medium text-text">Phone</p>
          <p className="text-xs text-text-secondary">Available via WhatsApp</p>
        </div>
      </div>
      <div className="mt-8">
        <WhatsAppButton variant="inline" message="Hi, I'd like to get in touch." />
      </div>
    </div>
  );
};

export default Contact;