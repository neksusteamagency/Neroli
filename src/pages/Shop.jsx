import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { products, CATEGORIES } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState(categoryParam || "All");
  const [sort, setSort] = useState("newest");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) setActiveCategory(categoryParam);
  }, [categoryParam]);

  function selectCategory(cat) {
    setActiveCategory(cat);
    if (cat === "All") setSearchParams({});
    else setSearchParams({ category: cat });
  }

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [activeCategory, sort]);

  return (
    <div className="pt-28 md:pt-32">
      <div className="container-luxe text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="eyebrow mb-3"
        >
          Our Collection
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[40px] md:text-[52px] font-light"
        >
          All Fragrances
        </motion.h1>
      </div>

      <div className="container-luxe">
        {/* Filters bar */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div className="hidden md:flex items-center gap-2 flex-wrap">
            {["All", ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => selectCategory(cat)}
                className={`text-[12px] tracking-[0.08em] uppercase px-5 py-2.5 rounded-full border transition-colors ${
                  activeCategory === cat
                    ? "bg-olive text-white border-olive"
                    : "border-border text-text-secondary hover:border-olive hover:text-olive"
                }`}
              >
                {cat}
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

        {/* Mobile filter drawer */}
        {filterOpen && (
          <div className="fixed inset-0 z-50 bg-bg-primary md:hidden p-6">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-display text-xl">Filter</h3>
              <button onClick={() => setFilterOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {["All", ...CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    selectCategory(cat);
                    setFilterOpen(false);
                  }}
                  className={`text-left text-sm tracking-[0.04em] uppercase py-3 border-b border-border ${
                    activeCategory === cat ? "text-olive" : "text-text-secondary"
                  }`}
                >
                  {cat}
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 pb-24">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
