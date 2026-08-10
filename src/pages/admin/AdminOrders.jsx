import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "@/utils/orders";

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState(null);

  function load() {
    setLoading(true);
    getAllOrders().then(setOrders).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleStatusChange(order, status) {
    setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status } : o)));
    await updateOrderStatus(order.id, status);
  }

  return (
    <div>
      <h1 className="text-3xl font-light mb-8">Orders</h1>
      <div className="bg-white rounded-card border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left bg-bg-secondary/30">
              <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Order ID</th>
              <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Client</th>
              <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Email</th>
              <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Total</th>
              <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Status</th>
              <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">View</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-text-secondary">Loading…</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-text-secondary">No orders yet</td></tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-mono text-olive">#{o.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-5 py-3">{o.userName}</td>
                  <td className="px-5 py-3 text-text-secondary">{o.userEmail}</td>
                  <td className="px-5 py-3">${o.total?.toFixed(2)}</td>
                  <td className="px-5 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o, e.target.value)}
                      className="border border-border rounded-md px-2 py-1.5 text-xs outline-none"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3">
                    <button onClick={() => setViewing(o)} className="text-olive text-xs hover:underline">
                      View →
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {viewing && (
        <div className="fixed inset-0 z-[60] bg-text-primary/40 backdrop-blur-[2px] flex items-center justify-center p-4">
          <div className="bg-white rounded-card max-w-lg w-full p-8 max-h-[85vh] overflow-y-auto">
            <h3 className="text-2xl font-light mb-1">Order Details</h3>
            <p className="text-xs tracking-[0.1em] uppercase text-olive mb-6">
              #{viewing.id.slice(0, 8).toUpperCase()}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div><p className="text-text-secondary text-xs mb-1">Delivery To</p>{viewing.address}, {viewing.city}</div>
              <div><p className="text-text-secondary text-xs mb-1">Phone</p>{viewing.phone}</div>
            </div>
            <div className="space-y-3 mb-6">
              {viewing.items?.map((item, i) => (
                <div key={i} className="flex justify-between text-sm border-b border-border pb-2">
                  <span>{item.name} × {item.qty}</span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-border mb-6">
              <span className="text-xs uppercase tracking-[0.1em] text-text-secondary">Total</span>
              <span className="font-display text-2xl">${viewing.total?.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setViewing(null)}
              className="w-full border border-border rounded-input py-3 text-xs uppercase tracking-[0.08em]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
