import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart, Minus, Plus, Truck, Shield, ChevronRight, Check,
  Sun, Moon, Snowflake, Flower2, Leaf, Hourglass, Wind,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import { DAYTIME_OPTIONS, SEASON_OPTIONS } from "@/data/products";

const ACCORD_COLORS = {
  "Warm Spicy": "#C0392B",
  "Fresh Spicy": "#7CB342",
  "Woody": "#6D4C33",
  "Aromatic": "#16897E",
  "Lavender": "#D8BFE8",
  "Citrus": "#F0B429",
  "Floral": "#E091C4",
  "Amber": "#C68642",
  "Musky": "#8E8E8E",
  "Sweet": "#E8A0BF",
  "Fresh": "#4FB6C9",
  "Powdery": "#D9C7E0",
};

const SEASON_ICONS = {
  Winter: Snowflake,
  Spring: Flower2,
  Summer: Sun,
  Autumn: Leaf,
};

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart, toggleWishlist, wishlist } = useStore();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [capacity, setCapacity] = useState(product?.capacities?.[0] ?? null);

  const related = useMemo(() => {
    if (!product) return [];
    const others = products.filter((p) => p.id !== product.id);
    const productNoteList = [
      ...(product.notes?.top || []),
      ...(product.notes?.heart || []),
      ...(product.notes?.base || []),
    ].map((n) => n.toLowerCase());

    const scored = others.map((p) => {
      let score = 0;
      if (p.category === product.category) score += 3;
      if (p.brand === product.brand) score += 2;
      const pNoteList = [
        ...(p.notes?.top || []),
        ...(p.notes?.heart || []),
        ...(p.notes?.base || []),
      ].map((n) => n.toLowerCase());
      score += pNoteList.filter((n) => productNoteList.includes(n)).length;
      return { p, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 4).map((s) => s.p);
  }, [product]);

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center">
        <p className="text-text-secondary">Product not found.</p>
        <Link to="/shop" className="text-olive underline mt-4 inline-block">
          Back to Shop
        </Link>
      </div>
    );
  }

  const images = [product.image, product.imageHover].filter(Boolean);
  const isWishlisted = wishlist.some((w) => w.id === product.id);
  const outOfStock = (product.stock ?? 0) <= 0;

  return (
    <div className="pt-28 md:pt-32">
      <div className="container-luxe">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-text-secondary mb-10">
          <Link to="/shop" className="hover:text-olive">Shop</Link>
          <ChevronRight size={12} />
          <span>{product.category}</span>
          <ChevronRight size={12} />
          <span className="text-text-primary">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="max-w-sm mx-auto lg:mx-0 w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="aspect-[3/4] rounded-card overflow-hidden bg-bg-secondary mb-4"
            >
              <img
                src={images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-20 rounded-img overflow-hidden border-2 transition-colors ${
                      activeImg === i ? "border-olive" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="eyebrow mb-2">{product.brand}</p>
            <h1 className="text-[32px] md:text-[40px] font-light mb-1">
              {product.name}
            </h1>
            <p className="text-text-secondary text-sm mb-6">{product.category}</p>
            <p className="font-display text-3xl text-text-primary mb-6">
              ${product.price}
            </p>

            <p className="text-text-secondary leading-relaxed mb-6">
              {product.description}
            </p>

            {product.capacities?.length > 0 && (
              <div className="mb-6 pb-6 border-b border-border">
                <p className="text-[11px] tracking-[0.14em] uppercase text-text-secondary mb-3">
                  Capacity
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.capacities.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCapacity(c)}
                      className={`text-xs px-4 py-2 rounded-full border transition-colors ${
                        capacity === c
                          ? "bg-olive text-white border-olive"
                          : "border-border text-text-secondary hover:border-olive hover:text-olive"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.extras?.length > 0 && (
              <div className="mb-6 pb-6 border-b border-border">
                <p className="text-[11px] tracking-[0.14em] uppercase text-text-secondary mb-3">
                  Add Extras
                </p>
                <div className="flex flex-col gap-2">
                  {product.extras.map((extra) => (
                    <label
                      key={extra.name}
                      className="flex items-center justify-between text-sm cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <input type="checkbox" className="accent-olive" />
                        {extra.name}
                      </span>
                      <span className="text-text-secondary">+${extra.price}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <p className={`text-sm mb-6 ${outOfStock ? "text-red-700" : "text-olive"}`}>
              {outOfStock
                ? "Currently out of stock"
                : product.stock <= 5
                ? `Only ${product.stock} left in stock`
                : "In stock — ready to ship"}
            </p>

            {!outOfStock && (
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border border-border rounded-input">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center hover:text-olive"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                    className="w-11 h-11 flex items-center justify-center hover:text-olive"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <Button
                  onClick={() => addToCart(product, qty)}
                  variant="primary"
                  size="lg"
                  className="flex-1"
                >
                  Add to Cart
                </Button>
                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label="Toggle wishlist"
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-olive transition-colors shrink-0"
                >
                  <Heart size={17} className={isWishlisted ? "fill-olive text-olive" : ""} />
                </button>
              </div>
            )}

            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <Truck size={16} strokeWidth={1.4} className="text-olive shrink-0" />
                Free delivery on orders over $150
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <Shield size={16} strokeWidth={1.4} className="text-olive shrink-0" />
                100% authentic, sourced directly from the house
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main accords + notes grid */}
        <div className="mt-20 grid md:grid-cols-2 gap-6 pb-8">
          {product.accords?.length > 0 && (
            <div className="bg-bg-secondary/60 rounded-2xl p-6">
              <p className="text-xs tracking-[0.12em] uppercase text-text-secondary mb-4">
                main accords
              </p>
              <div className="space-y-2.5">
                {product.accords.map((a) => (
                  <div
                    key={a.name}
                    className="h-10 rounded-full flex items-center px-5 text-sm font-medium text-white whitespace-nowrap overflow-hidden"
                    style={{
                      width: `${Math.max(a.intensity, 45)}%`,
                      backgroundColor: ACCORD_COLORS[a.name] || "#6F7050",
                    }}
                  >
                    {a.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.notes && (
            <div className="bg-bg-secondary/60 rounded-2xl p-6">
              <p className="text-xs tracking-[0.12em] uppercase text-text-secondary mb-4">
                notes
              </p>
              <div className="grid grid-cols-3 gap-x-4 gap-y-5">
                {["top", "heart", "base"]
                  .flatMap((tier) => product.notes[tier] || [])
                  .map((note) => {
                    const iconPath = `/notes/${note.toLowerCase().replace(/\s+/g, "-")}.png`;
                    return (
                      <div key={note} className="flex flex-col items-center text-center">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-1.5 shadow-sm overflow-hidden">
                          <img
                            src={iconPath}
                            alt={note}
                            className="w-9 h-9 object-contain"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "block";
                            }}
                          />
                          <span className="font-display text-lg text-olive" style={{ display: "none" }}>
                            {note.charAt(0)}
                          </span>
                        </div>
                        <p className="text-xs text-text-primary">{note}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        {/* Longevity / Sillage + Day-Night */}
        <div className="grid md:grid-cols-2 gap-6 pb-6">
          {(product.longevity || product.sillage) && (
            <div className="bg-bg-secondary/60 rounded-2xl p-6 flex gap-4">
              {product.longevity && (
                <div className="flex-1 bg-white rounded-xl px-4 py-4 flex items-center gap-2.5 text-sm">
                  <Hourglass size={16} className="text-olive shrink-0" />
                  <span>
                    <strong className="font-medium">{product.longevity}</strong>{" "}
                    <span className="text-text-secondary">Longevity</span>
                  </span>
                </div>
              )}
              {product.sillage && (
                <div className="flex-1 bg-white rounded-xl px-4 py-4 flex items-center gap-2.5 text-sm">
                  <Wind size={16} className="text-olive shrink-0" />
                  <span>
                    <strong className="font-medium">{product.sillage}</strong>{" "}
                    <span className="text-text-secondary">Sillage</span>
                  </span>
                </div>
              )}
            </div>
          )}

          {product.dayTime?.length > 0 && (
            <div className="bg-bg-secondary/60 rounded-2xl p-6">
              <p className="text-xs tracking-[0.12em] uppercase text-text-secondary mb-4">day time</p>
              <div className="flex gap-3">
                {DAYTIME_OPTIONS.map((d) => {
                  const active = product.dayTime.includes(d);
                  const Icon = d === "Day" ? Sun : Moon;
                  return (
                    <div
                      key={d}
                      className={`flex-1 rounded-xl px-4 py-4 flex items-center justify-center gap-2 text-sm font-medium ${
                        active ? "bg-text-primary text-white" : "bg-white text-text-secondary/50"
                      }`}
                    >
                      <Icon size={15} />
                      {d}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Seasons */}
        {product.seasons?.length > 0 && (
          <div className="bg-bg-secondary/60 rounded-2xl p-6 mb-10">
            <p className="text-xs tracking-[0.12em] uppercase text-text-secondary mb-4">seasons</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SEASON_OPTIONS.map((s) => {
                const active = product.seasons.includes(s);
                const Icon = SEASON_ICONS[s];
                return (
                  <div
                    key={s}
                    className={`rounded-xl px-4 py-3 flex items-center gap-2 text-sm ${
                      active ? "bg-white text-text-primary" : "bg-white/40 text-text-secondary/40"
                    }`}
                  >
                    <Icon size={15} className={active ? "text-olive" : ""} />
                    {s}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Ingredients checklist */}
        {product.ingredients?.length > 0 && (
          <div className="pb-24 pt-4 border-t border-border">
            <p className="eyebrow mb-5 mt-8">Ingredients</p>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-bg-secondary text-text-secondary"
                >
                  <Check size={12} className="text-olive" />
                  {ing}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related */}
        <div className="pb-24">
          <p className="eyebrow mb-8 text-center">You May Also Like</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 max-w-4xl mx-auto">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}