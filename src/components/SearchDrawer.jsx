import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "@/context/StoreContext";
import { products } from "@/data/products";

export default function SearchDrawer() {
  const { isSearchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [query]);

  function close() {
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-bg-primary"
        >
          <div className="container-content py-8">
            <div className="flex items-center gap-4 border-b border-text-primary pb-4">
              <Search size={20} strokeWidth={1.4} className="text-text-secondary" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fragrances, notes, collections…"
                className="flex-1 bg-transparent outline-none font-display text-2xl md:text-3xl font-light placeholder:text-text-secondary/50"
              />
              <button onClick={close} aria-label="Close search">
                <X size={22} strokeWidth={1.4} />
              </button>
            </div>

            <div className="mt-10">
              {results.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {results.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      onClick={close}
                      className="group"
                    >
                      <div className="aspect-[3/4] rounded-card overflow-hidden bg-bg-secondary mb-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover img-zoom group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="text-base font-light">{p.name}</h4>
                      <p className="text-sm text-text-secondary">${p.price}</p>
                    </Link>
                  ))}
                </div>
              ) : query ? (
                <p className="text-text-secondary text-sm">No results for "{query}"</p>
              ) : (
                <p className="text-text-secondary text-sm">
                  Try "Santal", "Home Scents", or "Citrus"
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
