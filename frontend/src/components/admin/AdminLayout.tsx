import { Outlet, useNavigate } from "react-router-dom";
import { logoutAdmin } from "@/api/auth";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { admin } = useAdminAuth();

  const handleLogout = async () => {
    await logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-display text-lg font-semibold text-text">Om Satyam Admin</h1>
            {admin && <p className="text-xs text-text-secondary">Signed in as {admin.email}</p>}
          </div>
          <button
            onClick={handleLogout}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-bg"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-6">
        <aside className="w-56 flex-shrink-0 rounded-lg border border-border bg-surface">
          <AdminSidebar />
        </aside>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
