import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { CATEGORY_TREE } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";

const CATEGORY_IDS = Object.keys(CATEGORY_TREE);

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState(categoryParam || "all");
  const [activeSubfilter, setActiveSubfilter] = useState(null); // brand or subcategory
  const [sort, setSort] = useState("newest");
  const [filterOpen, setFilterOpen] = useState(false);
  const { products } = useStore();
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
      setActiveSubfilter(null);
    }
  }, [categoryParam]);

  const categoryMeta = activeCategory !== "all" ? CATEGORY_TREE[activeCategory] : null;

  function selectCategory(catId) {
    setActiveCategory(catId);
    setActiveSubfilter(null);
    if (catId === "all") setSearchParams({});
    else setSearchParams({ category: catId });
  }

  const filtered = useMemo(() => {
    let list = [...products];

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);

      // Sub-filter by brand (Brands page, Gift Sets page)
      if (activeSubfilter && (categoryMeta?.type === "brand-list" || categoryMeta?.type === "bundle-list")) {
        list = list.filter((p) => p.brand === activeSubfilter);
      }

      // Sub-filter by subcategory (e.g. Victoria's Secret: Lotion/Splash/etc, Gadgets: Electric/Candles/etc)
      if (activeSubfilter && (categoryMeta?.type === "mixed" || categoryMeta?.type === "electric-split")) {
        list = list.filter((p) => p.subcategory === activeSubfilter);
      }
    }

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [activeCategory, activeSubfilter, sort, categoryMeta]);

  // Build sub-filter chip options depending on category type
  const subfilterOptions = useMemo(() => {
    if (!categoryMeta) return [];
    if (categoryMeta.type === "brand-list" || categoryMeta.type === "bundle-list") {
      return categoryMeta.brands || [];
    }
    if (categoryMeta.type === "electric-split") {
      return Object.values(categoryMeta.subcategories || {}).flat();
    }
    if (categoryMeta.type === "mixed") {
      // Generic → Refill + Victoria's Secret's own subcategories flattened
      const vs = categoryMeta.subcategories?.["victorias-secret"];
      return ["Refill", ...(vs?.subcategories || [])];
    }
    return [];
  }, [categoryMeta]);

  return (
    <div className="pt-28 md:pt-32">
      <div className="container-luxe text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="eyebrow mb-3"
        >
          {categoryMeta?.type === "brand-list" ? "Brands" : "Our Collection"}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[40px] md:text-[52px] font-light"
        >
          {categoryMeta?.label || "All Fragrances"}
        </motion.h1>
      </div>

      <div className="container-luxe">
        {/* Top-level category bar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="hidden md:flex items-center gap-2 flex-wrap">
            <button
              onClick={() => selectCategory("all")}
              className={`text-[12px] tracking-[0.08em] uppercase px-5 py-2.5 rounded-full border transition-colors ${
                activeCategory === "all"
                  ? "bg-olive text-white border-olive"
                  : "border-border text-text-secondary hover:border-olive hover:text-olive"
              }`}
            >
              All
            </button>
            {CATEGORY_IDS.map((id) => (
              <button
                key={id}
                onClick={() => selectCategory(id)}
                className={`text-[12px] tracking-[0.08em] uppercase px-5 py-2.5 rounded-full border transition-colors ${
                  activeCategory === id
                    ? "bg-olive text-white border-olive"
                    : "border-border text-text-secondary hover:border-olive hover:text-olive"
                }`}
              >
                {CATEGORY_TREE[id].label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setFilterOpen(true)}
            className="md:hidden flex items-center gap-2 text-xs tracking-[0.08em] uppercase border border-border rounded-full px-4 py-2.5"
          >
            <SlidersHorizontal size={14} /> Filter
          </button>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs text-text-secondary hidden sm:block">
              {filtered.length} results
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-xs tracking-[0.04em] uppercase border border-border rounded-input px-4 py-2.5 bg-transparent outline-none cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        {/* Sub-filter chip row — brands, subcategories, electric split, etc. */}
        {subfilterOptions.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-10 pb-6 border-b border-border">
            <button
              onClick={() => setActiveSubfilter(null)}
              className={`text-[11px] tracking-[0.06em] uppercase px-4 py-2 rounded-full border transition-colors ${
                !activeSubfilter
                  ? "bg-text-primary text-white border-text-primary"
                  : "border-border text-text-secondary hover:border-olive hover:text-olive"
              }`}
            >
              All
            </button>
            {subfilterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveSubfilter(opt)}
                className={`text-[11px] tracking-[0.06em] uppercase px-4 py-2 rounded-full border transition-colors ${
                  activeSubfilter === opt
                    ? "bg-text-primary text-white border-text-primary"
                    : "border-border text-text-secondary hover:border-olive hover:text-olive"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Mobile filter drawer */}
        {filterOpen && (
          <div className="fixed inset-0 z-50 bg-bg-primary md:hidden p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-display text-xl">Filter</h3>
              <button onClick={() => setFilterOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { selectCategory("all"); setFilterOpen(false); }}
                className={`text-left text-sm tracking-[0.04em] uppercase py-3 border-b border-border ${
                  activeCategory === "all" ? "text-olive" : "text-text-secondary"
                }`}
              >
                All
              </button>
              {CATEGORY_IDS.map((id) => (
                <button
                  key={id}
                  onClick={() => { selectCategory(id); setFilterOpen(false); }}
                  className={`text-left text-sm tracking-[0.04em] uppercase py-3 border-b border-border ${
                    activeCategory === id ? "text-olive" : "text-text-secondary"
                  }`}
                >
                  {CATEGORY_TREE[id].label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products grid */}
        {filtered.length === 0 ? (
          <EmptyState
            title="No fragrances found"
            description="Try a different category."
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-12 pb-24">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}