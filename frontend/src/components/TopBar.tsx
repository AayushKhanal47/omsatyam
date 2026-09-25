import { MapPin, Phone, Truck } from "lucide-react";
import { ADDRESS, PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/contact";

const TopBar = () => {
  return (
    <div className="bg-ink text-white/85">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-5 py-2 text-xs sm:justify-between sm:px-8">
        <span className="hidden items-center gap-1.5 sm:flex">
          <Truck className="h-3.5 w-3.5 shrink-0 text-accent" />
          Genuine products, delivered across Nepal
        </span>
        <div className="flex items-center gap-5">
          <a href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-1.5 hover:text-white">
            <Phone className="h-3.5 w-3.5 shrink-0" />
            {PHONE_DISPLAY}
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {ADDRESS}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
