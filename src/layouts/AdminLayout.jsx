import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutGrid, Package, Boxes, ShoppingBag, ArrowLeft, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/inventory", label: "Inventory", icon: Boxes },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-[250px_1fr] bg-bg-primary">
      <aside className="bg-white border-r border-border lg:sticky lg:top-0 lg:h-screen">
        <div className="px-6 py-7 border-b border-border">
          <Link to="/" className="font-display text-xl tracking-[0.18em]">
            NEROLI
          </Link>
          <p className="text-[10px] tracking-[0.18em] uppercase text-olive mt-1">
            Admin Panel
          </p>
        </div>
        <nav className="py-4">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm transition-colors border-l-2 ${
                  isActive
                    ? "border-olive text-olive bg-bg-secondary/40"
                    : "border-transparent text-text-secondary hover:text-olive hover:bg-bg-secondary/20"
                }`
              }
            >
              <l.icon size={16} strokeWidth={1.4} />
              {l.label}
            </NavLink>
          ))}
          <div className="border-t border-border mt-4 pt-4">
            <Link
              to="/"
              className="flex items-center gap-3 px-6 py-3 text-sm text-text-secondary hover:text-olive transition-colors"
            >
              <ArrowLeft size={16} strokeWidth={1.4} /> Back to Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-6 py-3 text-sm text-text-secondary hover:text-olive transition-colors w-full"
            >
              <LogOut size={16} strokeWidth={1.4} /> Sign Out
            </button>
          </div>
        </nav>
      </aside>
      <main className="p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
