import WhatsAppButton from "./WhatsAppButton";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-text">Om Satyam</h3>
            <p className="mt-2 text-sm text-text-secondary">
              Surgical and dental supplies for dental clinics and practitioners across Nepal.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-text-secondary">
              Contact
            </h4>
            <p className="mt-2 text-sm text-text">Bharatpur, Chitwan, Nepal</p>
            <div className="mt-3">
              <WhatsAppButton variant="inline" message="Hi, I have a question about your products." />
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-text-secondary">
              Store hours
            </h4>
            <p className="mt-2 text-sm text-text">9:00 AM – 6:00 PM</p>
          </div>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-xs text-text-secondary">
          © {new Date().getFullYear()} Om Satyam Dental &amp; Surgical. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;