import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { getAllProducts, editProduct } from "@/utils/products";

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    getAllProducts().then(setProducts).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function adjust(p, delta) {
    const newStock = Math.max(0, p.stock + delta);
    setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, stock: newStock } : x)));
    await editProduct(p.id, { stock: newStock });
  }

  async function setStock(p, value) {
    const newStock = Math.max(0, parseInt(value) || 0);
    setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, stock: newStock } : x)));
    await editProduct(p.id, { stock: newStock });
  }

  return (
    <div>
      <h1 className="text-3xl font-light mb-8">Inventory</h1>
      <div className="bg-white rounded-card border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left bg-bg-secondary/30">
              <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Product</th>
              <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Category</th>
              <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Stock</th>
              <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-text-secondary">Loading…</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-medium">{p.name}</td>
                  <td className="px-5 py-3 text-text-secondary">{p.category}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => adjust(p, -1)}
                        className="w-7 h-7 border border-border rounded-full flex items-center justify-center hover:border-olive"
                      >
                        <Minus size={12} />
                      </button>
                      <input
                        type="number"
                        value={p.stock}
                        onChange={(e) => setStock(p, e.target.value)}
                        className="w-16 text-center border border-border rounded-md px-2 py-1"
                      />
                      <button
                        onClick={() => adjust(p, 1)}
                        className="w-7 h-7 border border-border rounded-full flex items-center justify-center hover:border-olive"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={
                        p.stock <= 0
                          ? "text-red-700"
                          : p.stock <= 5
                          ? "text-amber-600"
                          : "text-emerald-700"
                      }
                    >
                      {p.stock <= 0 ? "Out of Stock" : p.stock <= 5 ? "Low Stock" : "In Stock"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
