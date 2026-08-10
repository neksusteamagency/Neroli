import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Package, LogOut } from "lucide-react";
import { updateProfile } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useAuth } from "@/context/AuthContext";
import { getUserOrders } from "@/utils/orders";
import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";

const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-gold/20 text-gold",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("info");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoadingOrders(true);
    getUserOrders(user.uid)
      .then(setOrders)
      .finally(() => setLoadingOrders(false));
  }, [user]);

  if (!user) {
    return (
      <div className="pt-40 pb-24 text-center px-6">
        <h1 className="text-2xl font-light mb-4">Please sign in</h1>
        <Button as={Link} to="/login" variant="primary">
          Sign In
        </Button>
      </div>
    );
  }

  async function handleSave() {
    await updateProfile(auth.currentUser, { displayName: name });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="container-luxe grid lg:grid-cols-[260px_1fr] gap-10">
        {/* Sidebar */}
        <aside className="h-fit lg:sticky lg:top-32">
          <div className="bg-white rounded-card border border-border p-6 text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-olive text-white flex items-center justify-center font-display text-2xl mx-auto mb-4">
              {(user.displayName || user.email)[0].toUpperCase()}
            </div>
            <h3 className="font-light text-lg">{user.displayName || "Valued Client"}</h3>
            <p className="text-xs text-text-secondary">{user.email}</p>
          </div>
          <nav className="flex lg:flex-col gap-1">
            <button
              onClick={() => setTab("info")}
              className={`flex items-center gap-3 px-4 py-3 text-sm rounded-input transition-colors ${
                tab === "info" ? "bg-olive text-white" : "text-text-secondary hover:bg-bg-secondary"
              }`}
            >
              <User size={16} strokeWidth={1.4} /> My Information
            </button>
            <button
              onClick={() => setTab("orders")}
              className={`flex items-center gap-3 px-4 py-3 text-sm rounded-input transition-colors ${
                tab === "orders" ? "bg-olive text-white" : "text-text-secondary hover:bg-bg-secondary"
              }`}
            >
              <Package size={16} strokeWidth={1.4} /> Order History
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-sm rounded-input text-text-secondary hover:bg-bg-secondary transition-colors"
            >
              <LogOut size={16} strokeWidth={1.4} /> Sign Out
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div>
          {tab === "info" && (
            <div>
              <h2 className="text-3xl font-light mb-1">My Information</h2>
              <p className="text-text-secondary text-sm mb-8">
                Manage your account details
              </p>
              <div className="bg-white rounded-card border border-border p-8 max-w-lg">
                <div className="space-y-5 mb-6">
                  <Row label="Email" value={user.email} />
                  <Row
                    label="Member Since"
                    value={
                      user.metadata?.creationTime
                        ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })
                        : "—"
                    }
                  />
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.1em] uppercase text-text-secondary mb-2 block">
                    Full Name
                  </label>
                  <div className="flex gap-3">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1 border border-border rounded-input px-4 py-3 text-sm outline-none focus:border-olive"
                    />
                    <Button onClick={handleSave} variant="outline">
                      {saved ? "Saved" : "Update"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div>
              <h2 className="text-3xl font-light mb-1">Order History</h2>
              <p className="text-text-secondary text-sm mb-8">
                Track and review your past orders
              </p>

              {loadingOrders ? (
                <p className="text-text-secondary text-sm">Loading orders…</p>
              ) : orders.length === 0 ? (
                <EmptyState
                  icon={Package}
                  title="No orders yet"
                  description="Your order history will appear here."
                  action={
                    <Button as={Link} to="/shop" variant="primary">
                      Start Shopping
                    </Button>
                  }
                />
              ) : (
                <div className="bg-white rounded-card border border-border overflow-hidden overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Order</th>
                        <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Date</th>
                        <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Items</th>
                        <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Total</th>
                        <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} className="border-b border-border last:border-0">
                          <td className="px-5 py-4 font-mono text-olive">
                            #{o.id.slice(0, 8).toUpperCase()}
                          </td>
                          <td className="px-5 py-4 text-text-secondary">
                            {o.createdAt?.toDate
                              ? o.createdAt.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                              : "—"}
                          </td>
                          <td className="px-5 py-4 text-text-secondary">
                            {o.items?.length || 0}
                          </td>
                          <td className="px-5 py-4">${o.total?.toFixed(2)}</td>
                          <td className="px-5 py-4">
                            <span
                              className={`text-[11px] tracking-[0.04em] uppercase px-3 py-1 rounded-full ${
                                STATUS_STYLES[o.status] || "bg-bg-secondary text-text-secondary"
                              }`}
                            >
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-border pb-3">
      <span className="text-[11px] tracking-[0.1em] uppercase text-text-secondary">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}
