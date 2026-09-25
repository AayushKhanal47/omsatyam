import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ExternalLink, LogOut, Menu, X } from "lucide-react";
import { logoutAdmin } from "@/api/auth";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { admin } = useAdminAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLogout = async () => {
    await logoutAdmin();
    navigate("/admin/login");
  };

  const brand = (
    <Link to="/admin/dashboard" className="flex items-center gap-3" onClick={() => setMobileNavOpen(false)}>
      <img src="/logo.png" alt="" className="h-9 w-9 object-contain" />
      <span className="font-display text-lg font-semibold text-admin-navy">Om Satyam</span>
    </Link>
  );

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between border-b border-admin-border p-5">
        {brand}
        {mobileNavOpen && (
          <button onClick={() => setMobileNavOpen(false)} className="lg:hidden" aria-label="Close menu">
            <X className="h-5 w-5 text-admin-navy" />
          </button>
        )}
      </div>
      <AdminSidebar onNavigate={() => setMobileNavOpen(false)} />
      <div className="border-t border-admin-border p-3">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-admin-navy transition-colors hover:bg-admin-bg"
        >
          <ExternalLink className="h-4 w-4" />
          View site
        </a>
        <div className="mt-2 flex items-center justify-between gap-2 px-3 py-1">
          <span className="truncate text-xs text-admin-muted">{admin?.name || admin?.email}</span>
          <button
            onClick={handleLogout}
            className="flex flex-shrink-0 items-center gap-1.5 text-xs font-medium text-red-500 transition-colors hover:text-red-600"
          >
            <LogOut className="h-3.5 w-3.5" />
            Log out
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="admin-theme min-h-screen bg-admin-bg text-text lg:flex">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-admin-border bg-white lg:flex">
        {sidebarContent}
      </aside>

      {/* Mobile top bar + drawer */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-admin-border bg-white px-4 py-3 lg:hidden">
        {brand}
        <button onClick={() => setMobileNavOpen(true)} className="text-admin-navy" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </header>
      {mobileNavOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileNavOpen(false)} />
          <aside className="animate-fade-in fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-white shadow-lg lg:hidden">
            {sidebarContent}
          </aside>
        </>
      )}

      <main className="min-w-0 max-w-[1100px] flex-1 p-5 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
