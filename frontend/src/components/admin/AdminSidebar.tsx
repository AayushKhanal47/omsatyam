import { NavLink } from "react-router-dom";
import { LayoutDashboard, PackagePlus, Package, ClipboardList, UserCog } from "lucide-react";

const links = [
  { to: "/admin/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/dashboard/add-product", label: "Add Product", icon: PackagePlus },
  { to: "/admin/dashboard/products", label: "Products", icon: Package },
  { to: "/admin/dashboard/orders", label: "Orders", icon: ClipboardList },
  { to: "/admin/dashboard/account", label: "Account", icon: UserCog },
];

const AdminSidebar = () => {
  return (
    <nav className="flex flex-col gap-1 p-4">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) =>
            `flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive ? "bg-primary text-white" : "text-text hover:bg-bg"
            }`
          }
        >
          <link.icon className="h-4 w-4" />
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default AdminSidebar;
