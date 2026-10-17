import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import Button from "@/components/Button";
import {
  CATEGORY_TREE,
  ACCORD_OPTIONS,
  NOTE_OPTIONS,
  INGREDIENT_OPTIONS,
  LONGEVITY_OPTIONS,
  SILLAGE_OPTIONS,
  DAYTIME_OPTIONS,
  SEASON_OPTIONS,
} from "@/data/products";

const SELECTABLE_CATEGORY_IDS = Object.keys(CATEGORY_TREE).filter(
  (id) => CATEGORY_TREE[id].type !== "redirect"
);

function toggleInArray(arr, value) {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export default function ProductFormModal({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    name: product?.name || "",
    category: product?.category || SELECTABLE_CATEGORY_IDS[0],
    brand: product?.brand || "",
    subcategory: product?.subcategory || "",
    price: product?.price ?? "",
    stock: product?.stock ?? "",
    image: product?.image || "",
    imageHover: product?.imageHover || "",
    description: product?.description || "",
    capacities: (product?.capacities || []).join(", "),
    scentOptions: product?.scentOptions || [],
    accords: product?.accords || [],
    notes: product?.notes && typeof product.notes === "object"
      ? product.notes
      : { top: [], heart: [], base: [] },
    ingredients: product?.ingredients || [],
    extras: product?.extras || [],
    longevity: product?.longevity || "",
    sillage: product?.sillage || "",
    dayTime: product?.dayTime || [],
    seasons: product?.seasons || [],
    vsType: product?.vsType || "",
  });
  const [saving, setSaving] = useState(false);

  const categoryMeta = CATEGORY_TREE[form.category];

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleCategoryChange(e) {
    setForm((f) => ({
      ...f,
      category: e.target.value,
      brand: "",
      subcategory: "",
      scentOptions: [],
    }));
  }

  function toggleScentOption(scent) {
    setForm((f) => ({ ...f, scentOptions: toggleInArray(f.scentOptions, scent) }));
  }

  function toggleNote(tier, note) {
    setForm((f) => ({
      ...f,
      notes: { ...f.notes, [tier]: toggleInArray(f.notes[tier], note) },
    }));
  }

  function toggleIngredient(ing) {
    setForm((f) => ({ ...f, ingredients: toggleInArray(f.ingredients, ing) }));
  }

  function toggleAccord(name) {
    setForm((f) => {
      const exists = f.accords.find((a) => a.name === name);
      if (exists) {
        return { ...f, accords: f.accords.filter((a) => a.name !== name) };
      }
      return { ...f, accords: [...f.accords, { name, intensity: 50 }] };
    });
  }

  function setAccordIntensity(name, intensity) {
    setForm((f) => ({
      ...f,
      accords: f.accords.map((a) => (a.name === name ? { ...a, intensity } : a)),
    }));
  }

  function toggleDayTime(val) {
    setForm((f) => ({ ...f, dayTime: toggleInArray(f.dayTime, val) }));
  }

  function toggleSeason(val) {
    setForm((f) => ({ ...f, seasons: toggleInArray(f.seasons, val) }));
  }

  function addExtra() {
    setForm((f) => ({ ...f, extras: [...f.extras, { name: "", price: "" }] }));
  }

  function updateExtra(index, key, value) {
    setForm((f) => ({
      ...f,
      extras: f.extras.map((ex, i) => (i === index ? { ...ex, [key]: value } : ex)),
    }));
  }

  function removeExtra(index) {
    setForm((f) => ({ ...f, extras: f.extras.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.category || !form.price || form.stock === "") return;
    setSaving(true);
    await onSave({
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      capacities: form.capacities
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      extras: form.extras
        .filter((ex) => ex.name)
        .map((ex) => ({ ...ex, price: parseFloat(ex.price) || 0 })),
    });
    setSaving(false);
  }

  let subcategoryOptions = [];
  if (categoryMeta?.type === "mixed") {
    subcategoryOptions = ["Refill", "Victoria's Secret"];
  } else if (categoryMeta?.type === "electric-split") {
    subcategoryOptions = Object.values(categoryMeta.subcategories).flat();
  }

  const isVictoriasSecret = form.subcategory === "Victoria's Secret";
  const vsMeta = categoryMeta?.subcategories?.["victorias-secret"];

  const activeScentPool = isVictoriasSecret
    ? vsMeta?.scentOptions || []
    : categoryMeta?.scentOptions || [];

  const showBrandField = categoryMeta?.type === "brand-list" || categoryMeta?.type === "bundle-list";
  const showScentChecklist =
    categoryMeta?.type === "bottle-with-shared-scents" || (isVictoriasSecret && vsMeta?.scentOptions);

  return (
    <div className="fixed inset-0 z-[60] bg-text-primary/40 backdrop-blur-[2px] flex items-center justify-center p-4">
      <div className="bg-white rounded-card max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
        <button onClick={onClose} className="absolute top-6 right-6" aria-label="Close">
          <X size={20} />
        </button>
        <h3 className="text-2xl font-light mb-6">
          {product ? "Edit Product" : "Add New Product"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Product Name *" name="name" value={form.name} onChange={handleChange} />
            <div>
              <Label>Category *</Label>
              <select
                name="category"
                value={form.category}
                onChange={handleCategoryChange}
                className="w-full border border-border rounded-input px-4 py-3 text-sm outline-none focus:border-olive"
              >
                {SELECTABLE_CATEGORY_IDS.map((id) => (
                  <option key={id} value={id}>{CATEGORY_TREE[id].label}</option>
                ))}
              </select>
            </div>
            <Field label="Price ($) *" name="price" type="number" step="0.01" value={form.price} onChange={handleChange} />
            <Field label="Stock Quantity *" name="stock" type="number" value={form.stock} onChange={handleChange} />
          </div>

          {showBrandField && (
            <div>
              <Label>Brand *</Label>
              <select
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="w-full border border-border rounded-input px-4 py-3 text-sm outline-none focus:border-olive"
              >
                <option value="">Select a brand…</option>
                {categoryMeta.brands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          )}

          {subcategoryOptions.length > 0 && (
            <div>
              <Label>Subcategory *</Label>
              <select
                name="subcategory"
                value={form.subcategory}
                onChange={handleChange}
                className="w-full border border-border rounded-input px-4 py-3 text-sm outline-none focus:border-olive"
              >
                <option value="">Select a subcategory…</option>
                {subcategoryOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}

          {isVictoriasSecret && vsMeta?.subcategories && (
            <div>
              <Label>Product Type *</Label>
              <select
                name="vsType"
                value={form.vsType}
                onChange={handleChange}
                className="w-full border border-border rounded-input px-4 py-3 text-sm outline-none focus:border-olive"
              >
                <option value="">Select a type…</option>
                {vsMeta.subcategories.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          )}

          <Field
            label="Capacities (comma-separated, e.g. 30ml, 50ml, 100ml)"
            name="capacities"
            value={form.capacities}
            onChange={handleChange}
          />

          {showScentChecklist && (
            <div>
              <Label>Available Scents</Label>
              <div className="flex flex-wrap gap-2">
                {activeScentPool.map((scent) => (
                  <ChecklistChip
                    key={scent}
                    label={scent}
                    active={form.scentOptions.includes(scent)}
                    onClick={() => toggleScentOption(scent)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Image URL" name="image" value={form.image} onChange={handleChange} />
            <Field label="Hover Image URL" name="imageHover" value={form.imageHover} onChange={handleChange} />
          </div>

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

          <div>
            <Label>Fragrance Notes</Label>
            <div className="grid sm:grid-cols-3 gap-4 border border-border rounded-input p-4">
              {["top", "heart", "base"].map((tier) => (
                <div key={tier}>
                  <p className="text-[10px] uppercase tracking-wide text-text-secondary mb-2">{tier} notes</p>
                  <div className="flex flex-wrap gap-1.5">
                    {NOTE_OPTIONS.map((note) => (
                      <ChecklistChip
                        key={note}
                        label={note}
                        small
                        active={form.notes[tier].includes(note)}
                        onClick={() => toggleNote(tier, note)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Main Accords</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {ACCORD_OPTIONS.map((accord) => (
                <ChecklistChip
                  key={accord}
                  label={accord}
                  active={form.accords.some((a) => a.name === accord)}
                  onClick={() => toggleAccord(accord)}
                />
              ))}
            </div>
            {form.accords.length > 0 && (
              <div className="space-y-3 border border-border rounded-input p-4">
                {form.accords.map((a) => (
                  <div key={a.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{a.name}</span>
                      <span className="text-text-secondary">{a.intensity}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={a.intensity}
                      onChange={(e) => setAccordIntensity(a.name, parseInt(e.target.value))}
                      className="w-full accent-olive"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <Label>Ingredients</Label>
            <div className="flex flex-wrap gap-2">
              {INGREDIENT_OPTIONS.map((ing) => (
                <ChecklistChip
                  key={ing}
                  label={ing}
                  active={form.ingredients.includes(ing)}
                  onClick={() => toggleIngredient(ing)}
                />
              ))}
            </div>
          </div>

          {/* Fragrance profile: longevity, sillage, day/night, seasons */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label>Longevity</Label>
              <select
                name="longevity"
                value={form.longevity}
                onChange={handleChange}
                className="w-full border border-border rounded-input px-4 py-3 text-sm outline-none focus:border-olive"
              >
                <option value="">Select…</option>
                {LONGEVITY_OPTIONS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Sillage</Label>
              <select
                name="sillage"
                value={form.sillage}
                onChange={handleChange}
                className="w-full border border-border rounded-input px-4 py-3 text-sm outline-none focus:border-olive"
              >
                <option value="">Select…</option>
                {SILLAGE_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label>Best Worn</Label>
            <div className="flex gap-2">
              {DAYTIME_OPTIONS.map((d) => (
                <ChecklistChip
                  key={d}
                  label={d}
                  active={form.dayTime.includes(d)}
                  onClick={() => toggleDayTime(d)}
                />
              ))}
            </div>
          </div>

          <div>
            <Label>Seasons</Label>
            <div className="flex gap-2 flex-wrap">
              {SEASON_OPTIONS.map((s) => (
                <ChecklistChip
                  key={s}
                  label={s}
                  active={form.seasons.includes(s)}
                  onClick={() => toggleSeason(s)}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Add-on Extras</Label>
              <button
                type="button"
                onClick={addExtra}
                className="flex items-center gap-1 text-xs text-olive hover:underline"
              >
                <Plus size={13} /> Add Extra
              </button>
            </div>
            {form.extras.length > 0 && (
              <div className="space-y-2">
                {form.extras.map((ex, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      placeholder="Extra name"
                      value={ex.name}
                      onChange={(e) => updateExtra(i, "name", e.target.value)}
                      className="flex-1 border border-border rounded-input px-3 py-2 text-sm outline-none focus:border-olive"
                    />
                    <input
                      placeholder="Price"
                      type="number"
                      step="0.01"
                      value={ex.price}
                      onChange={(e) => updateExtra(i, "price", e.target.value)}
                      className="w-24 border border-border rounded-input px-3 py-2 text-sm outline-none focus:border-olive"
                    />
                    <button
                      type="button"
                      onClick={() => removeExtra(i)}
                      className="w-9 h-9 border border-border rounded-md flex items-center justify-center hover:border-red-600 hover:text-red-600 shrink-0"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
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

function ChecklistChip({ label, active, onClick, small }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${small ? "text-[10px] px-2.5 py-1" : "text-xs px-3 py-1.5"} rounded-full border transition-colors ${
        active
          ? "bg-olive text-white border-olive"
          : "border-border text-text-secondary hover:border-olive hover:text-olive"
      }`}
    >
      {label}
    </button>
  );
}