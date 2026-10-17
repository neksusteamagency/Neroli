import { useRef } from "react";
import { Link } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";

export default function BestSellerCarousel() {
  const scrollerRef = useRef(null);
  const { toggleWishlist, wishlist } = useStore();
const { products } = useStore();
  function scroll(dir) {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  return (
    <section className="section-pad bg-bg-primary">
      <div className="container-luxe">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <p className="eyebrow">Customer Favorites</p>
          <div className="flex items-center gap-4">
            <Link
              to="/shop"
              className="flex items-center gap-1 text-[11px] tracking-[0.1em] uppercase text-text-secondary hover:text-olive transition-colors"
            >
              Shop All Best Sellers <ArrowRight size={13} />
            </Link>
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll(-1)}
                aria-label="Scroll left"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-olive hover:text-olive transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scroll(1)}
                aria-label="Scroll right"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-olive hover:text-olive transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x"
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((p, i) => {
            const isWishlisted = wishlist.some((w) => w.id === p.id);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="shrink-0 w-[160px] sm:w-[200px] snap-start"
              >
                <Link to={`/product/${p.id}`} className="group block">
                  <div className="relative aspect-square rounded-card overflow-hidden bg-bg-secondary mb-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(p);
                      }}
                      className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center"
                    >
                      <Heart size={12} className={isWishlisted ? "fill-olive text-olive" : ""} />
                    </button>
                  </div>
                  <p className="text-[10px] tracking-[0.1em] uppercase text-text-secondary">
                    {p.brand}
                  </p>
                  <h4 className="text-[15px] font-light truncate">{p.name}</h4>
                  <p className="text-sm text-text-secondary">${p.price}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
