import { MapPin, Phone } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-topbar">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 text-xs text-white/95 sm:px-6">
        <span className="flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5" />
          +977 9855046299
        </span>
        <span className="hidden items-center gap-1.5 sm:flex">
          <MapPin className="h-3.5 w-3.5" />
          Bharatpur, Chitwan, Nepal
        </span>
        <span className="hidden md:inline">Genuine products, delivered across Nepal</span>
      </div>
    </div>
  );
};

export default TopBar;
