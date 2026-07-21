import { MapPin, Phone } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-topbar">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2 text-xs text-white/95 sm:flex-nowrap sm:justify-between sm:px-6">
        <span className="flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5 shrink-0" />
          +977 9855046299
        </span>

        <span className="flex items-center gap-1.5 text-center">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          Bharatpur, Chitwan, Nepal
        </span>

        <span className="hidden md:block">
          Genuine products, delivered across Nepal
        </span>
      </div>
    </div>
  );
};

export default TopBar;