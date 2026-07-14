import { Link } from "react-router-dom";
import { Share2, AtSign, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "9779843966885";

const Footer = () => {
  const whatsappUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent("Hi, I have a question about your products.");

  return (
    <footer className="bg-footer">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            {/* The footer logo is bumped up safely to h-16 without affecting layout */}
            <Logo className="h-16" />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Genuine dental and surgical supplies for clinics and practitioners across Nepal.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"><Share2 className="h-4 w-4" /></a>
              <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"><AtSign className="h-4 w-4" /></a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"><MessageCircle className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-white/50">Categories</h4>
            <div className="mt-3 flex flex-col gap-2">
              <Link to="/" className="text-sm text-white/80 hover:text-white">Instruments</Link>
              <Link to="/" className="text-sm text-white/80 hover:text-white">Consumables</Link>
              <Link to="/" className="text-sm text-white/80 hover:text-white">Equipment</Link>
              <Link to="/" className="text-sm text-white/80 hover:text-white">Disposables</Link>
              <Link to="/track-order" className="text-sm text-white/80 hover:text-white">Track order</Link>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-white/50">Quick links</h4>
            <div className="mt-3 flex flex-col gap-2">
              <Link to="/" className="text-sm text-white/80 hover:text-white">All products</Link>
              <Link to="/cart" className="text-sm text-white/80 hover:text-white">Cart</Link>
              <Link to="/about" className="text-sm text-white/80 hover:text-white">About us</Link>
              <Link to="/contact" className="text-sm text-white/80 hover:text-white">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wide text-white/50">Contact us</h4>
            <div className="mt-3 flex flex-col gap-2.5 text-sm text-white/85">
              <span className="flex items-center gap-2"><Phone className="h-4 w-4 flex-shrink-0" /> +977 9855046299</span>
              <span className="flex items-center gap-2"><Mail className="h-4 w-4 flex-shrink-0" /> omsatyam299@gmail.com</span>
              <span className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" /> Bharatpur, Chitwan, Nepal</span>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-md bg-whatsapp px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-whatsapp-hover"><MessageCircle className="h-4 w-4" />Chat on WhatsApp</a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Om Satyam Dental &amp; Surgical. All rights reserved.</span>
          <span>Delivery: Nepal-wide, same-day available in Chitwan</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;