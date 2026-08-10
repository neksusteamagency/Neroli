import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "@/utils/products";
import { getAllOrders } from "@/utils/orders";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllProducts(), getAllOrders()])
      .then(([p, o]) => {
        setProducts(p);
        setOrders(o);
      })
      .finally(() => setLoading(false));
  }, []);

  const revenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + (o.total || 0), 0);
  const pending = orders.filter((o) => o.status === "pending").length;

  const stats = [
    { label: "Total Products", value: products.length },
    { label: "Total Orders", value: orders.length },
    { label: "Revenue", value: `$${revenue.toFixed(2)}` },
    { label: "Pending Orders", value: pending },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-light">Dashboard</h1>
        <p className="text-sm text-text-secondary">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-card border border-border p-6">
            <p className="text-[11px] tracking-[0.1em] uppercase text-text-secondary mb-2">
              {s.label}
            </p>
            <p className="font-display text-3xl">{loading ? "—" : s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-card border border-border p-6">
          <h3 className="text-sm font-medium mb-5">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            <Link to="/admin/products" className="text-sm text-olive hover:underline">
              + Add New Product
            </Link>
            <Link to="/admin/orders" className="text-sm text-text-secondary hover:text-olive">
              → View All Orders
            </Link>
            <Link to="/admin/inventory" className="text-sm text-text-secondary hover:text-olive">
              → Manage Inventory
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-card border border-border p-6">
          <h3 className="text-sm font-medium mb-5">Recent Orders</h3>
          {orders.length === 0 ? (
            <p className="text-sm text-text-secondary">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 5).map((o) => (
                <div key={o.id} className="flex justify-between text-sm border-b border-border pb-3 last:border-0">
                  <span className="font-mono text-olive">#{o.id.slice(0, 8).toUpperCase()}</span>
                  <span className="text-text-secondary">{o.userName}</span>
                  <span>${o.total?.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
