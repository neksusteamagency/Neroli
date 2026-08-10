import { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/Button";
import { CATEGORIES } from "@/data/products";

export default function ProductFormModal({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    name: product?.name || "",
    category: product?.category || CATEGORIES[0],
    price: product?.price || "",
    stock: product?.stock || "",
    image: product?.image || "",
    notes: product?.notes || "",
    description: product?.description || "",
  });
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.category || !form.price || form.stock === "") return;
    setSaving(true);
    await onSave({
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
    });
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-[60] bg-text-primary/40 backdrop-blur-[2px] flex items-center justify-center p-4">
      <div className="bg-white rounded-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
        <button onClick={onClose} className="absolute top-6 right-6" aria-label="Close">
          <X size={20} />
        </button>
        <h3 className="text-2xl font-light mb-6">
          {product ? "Edit Product" : "Add New Product"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Product Name *" name="name" value={form.name} onChange={handleChange} />
            <div>
              <Label>Category *</Label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-border rounded-input px-4 py-3 text-sm outline-none focus:border-olive"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <Field label="Price ($) *" name="price" type="number" step="0.01" value={form.price} onChange={handleChange} />
            <Field label="Stock Quantity *" name="stock" type="number" value={form.stock} onChange={handleChange} />
          </div>
          <Field label="Image URL" name="image" value={form.image} onChange={handleChange} />
          <Field label="Fragrance Notes" name="notes" value={form.notes} onChange={handleChange} />
          <div>
            <Label>Description</Label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-border rounded-input px-4 py-3 text-sm outline-none focus:border-olive resize-none"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? "Saving…" : product ? "Save Changes" : "Add Product"}
            </Button>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <label className="text-[11px] tracking-[0.1em] uppercase text-text-secondary mb-2 block">
      {children}
    </label>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        {...props}
        className="w-full border border-border rounded-input px-4 py-3 text-sm outline-none focus:border-olive"
      />
    </div>
  );
}
