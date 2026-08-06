import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen((v) => !v)}
              className="text-text lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div>
              <h1 className="font-display text-base font-semibold text-text sm:text-lg">Om Satyam Admin</h1>
              {admin && <p className="text-xs text-text-secondary">{admin.email}</p>}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-text transition-colors hover:bg-bg sm:px-4 sm:py-2 sm:text-sm"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-4 sm:px-6 sm:py-6">
        {/* Desktop sidebar */}
        <aside className="hidden w-56 flex-shrink-0 self-start rounded-lg border border-border bg-surface lg:block">
          <AdminSidebar />
        </aside>

        {/* Mobile sidebar drawer */}
        {mobileNavOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setMobileNavOpen(false)}
            />
            <aside className="animate-fade-in-up fixed left-0 top-0 z-50 h-full w-64 bg-surface shadow-lg lg:hidden">
              <div className="flex items-center justify-between border-b border-border p-4">
                <span className="font-display text-sm font-semibold text-text">Menu</span>
                <button onClick={() => setMobileNavOpen(false)} aria-label="Close menu">
                  <X className="h-5 w-5 text-text" />
                </button>
              </div>
              <AdminSidebar onNavigate={() => setMobileNavOpen(false)} />
            </aside>
          </>
        )}

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
