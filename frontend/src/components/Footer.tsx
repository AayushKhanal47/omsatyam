
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Logo from "./Logo";
import WhatsAppButton from "./WhatsAppButton";

const Footer = () => {
  return (
    <footer className="bg-footer text-footer-text">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <Logo className="h-12" />

            <p className="mt-5 text-sm leading-7 text-footer-text/80">
              Om Satyam Dental &amp; Surgical supplies premium dental,
              surgical instruments, consumables, equipment and clinic
              essentials with reliable service across Nepal.
            </p>

            <div className="mt-6">
              <WhatsAppButton
                variant="inline"
                message="Hi! I would like to know more about your dental products."
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm transition hover:text-accent"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="text-sm transition hover:text-accent"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-sm transition hover:text-accent"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-sm transition hover:text-accent"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="text-sm transition hover:text-accent"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Contact Us
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-accent" />

                <div className="text-sm text-footer-text/80">
                  Bharatpur-10
                  <br />
                  Chitwan, Nepal
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" />

                <span className="text-sm text-footer-text/80">
                  +977-98XXXXXXXX
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" />

                <span className="text-sm text-footer-text/80">
                  info@omsatyamdental.com
                </span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Store Hours
            </h3>

            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 text-accent" />

              <div className="space-y-2 text-sm text-footer-text/80">
                <p>Sunday – Friday</p>
                <p>9:00 AM – 6:00 PM</p>
                <p>Saturday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-white/10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-footer-text/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} Om Satyam Dental &amp; Surgical. All
            rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="transition hover:text-accent"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-accent"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

