import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "@/api/auth";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin } = useAdminAuth();

  const handleLogout = async () => {
    await logoutAdmin();
    navigate("/admin/login");
  };

  const stats = [
    { label: "Products", value: "—" },
    { label: "Categories", value: "—" },
    { label: "Pending orders", value: "—" },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-display text-lg font-semibold text-text">Om Satyam Admin</h1>
            {admin && (
              <p className="text-xs text-text-secondary">Signed in as {admin.email}</p>
            )}
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
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`animate-fade-in-up rounded-lg border border-border bg-surface p-6 animate-delay-${i + 1}`}
            >
              <p className="font-mono text-xs uppercase tracking-wide text-text-secondary">
                {stat.label}
              </p>
              <p className="mt-2 font-display text-2xl font-semibold text-text">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 animate-fade-in-up animate-delay-3 rounded-lg border border-dashed border-border p-10 text-center">
          <p className="text-sm text-text-secondary">
            Product and order management coming next — this is the dashboard shell.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;