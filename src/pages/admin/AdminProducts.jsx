import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { getAllProducts, createProduct, editProduct, removeProduct } from "@/utils/products";
import ProductFormModal from "@/components/ProductFormModal";
import { CATEGORY_TREE } from "@/data/products";
export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  function load() {
    setLoading(true);
    getAllProducts().then(setProducts).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleSave(data) {
    if (editing) {
      await editProduct(editing.id, data);
    } else {
      await createProduct(data);
    }
    setShowForm(false);
    setEditing(null);
    load();
  }

  async function handleDelete() {
    await removeProduct(deleteTarget.id);
    setDeleteTarget(null);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-light">Products</h1>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-olive text-white text-xs tracking-[0.08em] uppercase px-5 py-3 rounded-input hover:bg-olive-hover transition-colors"
        >
          <Plus size={14} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-card border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left bg-bg-secondary/30">
              <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Image</th>
              <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Name</th>
              <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Category</th>
              <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Price</th>
              <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Stock</th>
              <th className="px-5 py-4 text-[11px] tracking-[0.1em] uppercase text-text-secondary font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-text-secondary">Loading…</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-text-secondary">No products yet</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3">
                    <div className="w-12 h-14 rounded-md bg-bg-secondary overflow-hidden">
                      {p.image && <img src={p.image} alt="" className="w-full h-full object-cover" />}
                    </div>
                  </td>
                  <td className="px-5 py-3">{p.name}</td>
                  <td className="px-5 py-3 text-text-secondary">{CATEGORY_TREE[p.category]?.label || p.category}</td>
                  <td className="px-5 py-3">${p.price}</td>
                  <td className="px-5 py-3">
                    <span className={p.stock <= 0 ? "text-red-700" : p.stock <= 5 ? "text-amber-600" : ""}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setEditing(p); setShowForm(true); }}
                        className="w-8 h-8 border border-border rounded-md flex items-center justify-center hover:border-olive hover:text-olive"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(p)}
                        className="w-8 h-8 border border-border rounded-md flex items-center justify-center hover:border-red-600 hover:text-red-600"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ProductFormModal
          product={editing}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[60] bg-text-primary/40 backdrop-blur-[2px] flex items-center justify-center p-4">
          <div className="bg-white rounded-card max-w-sm w-full p-8 text-center">
            <h3 className="text-xl font-light mb-2">Delete Product</h3>
            <p className="text-text-secondary text-sm mb-6">
              Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleDelete}
                className="bg-red-700 text-white text-xs tracking-[0.08em] uppercase px-6 py-3 rounded-input"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="border border-border text-xs tracking-[0.08em] uppercase px-6 py-3 rounded-input"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
