import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "@/api/auth";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import CategoryManager from "@/components/admin/CategoryManager";
import ProductForm from "@/components/admin/ProductForm";
import ProductList from "@/components/admin/ProductList";
import OrderManager from "@/components/admin/OrderManager";
import AccountSettings from "@/components/admin/AccountSettings";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin } = useAdminAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogout = async () => {
    await logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
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

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <CategoryManager />
            <ProductForm onCreated={() => setRefreshKey((k) => k + 1)} />
          </div>
          <div className="flex flex-col gap-6">
            <ProductList refreshKey={refreshKey} />
            <OrderManager />
          </div>
        </div>

        <div className="mt-6">
          <AccountSettings />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;