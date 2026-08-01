import { Building2, Package, Truck, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Building2, value: "100+", label: "Clinics served" },
  { icon: Package, value: "500+", label: "Products in catalog" },
  { icon: Truck, value: "Nepal-wide", label: "Delivery coverage" },
  { icon: ShieldCheck, value: "100%", label: "Genuine products" },
];

const TrustBar = () => {
  return (
    <div className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <stat.icon className="h-5 w-5 text-primary" />
            <p className="mt-2 font-display text-xl font-semibold text-text">{stat.value}</p>
            <p className="mt-0.5 text-xs text-text-secondary">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;
