import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, LayoutGrid, ClipboardList, UserCog } from "lucide-react";

const sections = [
  {
    title: "Overview",
    links: [{ to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true }],
  },
  {
    title: "Catalogue",
    links: [
      { to: "/admin/dashboard/products", label: "Products", icon: Package },
      { to: "/admin/dashboard/categories", label: "Categories", icon: LayoutGrid },
    ],
  },
  {
    title: "Sales",
    links: [{ to: "/admin/dashboard/orders", label: "Orders", icon: ClipboardList }],
  },
  {
    title: "Settings",
    links: [{ to: "/admin/dashboard/account", label: "Account", icon: UserCog }],
  },
];

const AdminSidebar = ({ onNavigate }: { onNavigate?: () => void }) => {
  return (
    <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-4">
      {sections.map((section) => (
        <div key={section.title}>
          <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-admin-muted">
            {section.title}
          </p>
          <div className="flex flex-col gap-0.5">
            {section.links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={"end" in link ? link.end : false}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? "bg-primary text-white" : "text-admin-navy hover:bg-admin-bg"
                  }`
                }
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default AdminSidebar;
