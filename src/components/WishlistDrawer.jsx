import { AnimatePresence, motion } from "framer-motion";
import { X, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "@/context/StoreContext";
import Button from "./Button";
import EmptyState from "./EmptyState";

export default function WishlistDrawer() {
  const { isWishlistOpen, setWishlistOpen, wishlist, toggleWishlist, addToCart } = useStore();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWishlistOpen(false)}
            className="fixed inset-0 bg-text-primary/30 backdrop-blur-[2px] z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-bg-alt z-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-border">
              <h3 className="font-display text-xl">Wishlist ({wishlist.length})</h3>
              <button onClick={() => setWishlistOpen(false)} aria-label="Close wishlist">
                <X size={20} strokeWidth={1.4} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {wishlist.length === 0 ? (
                <EmptyState
                  icon={Heart}
                  title="No favorites yet"
                  description="Save fragrances you love to find them later."
                  action={
                    <Button variant="primary" onClick={() => setWishlistOpen(false)} as={Link} to="/shop">
                      Explore Collection
                    </Button>
                  }
                />
              ) : (
                <div className="space-y-6">
                  {wishlist.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <Link to={`/product/${item.id}`} onClick={() => setWishlistOpen(false)} className="w-20 h-24 rounded-img overflow-hidden bg-bg-secondary shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[16px] font-light truncate">{item.name}</h4>
                        <p className="text-sm text-text-secondary mb-3">${item.price}</p>
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="text-[11px] tracking-[0.1em] uppercase text-olive hover:text-olive-hover"
                        >
                          Add to Cart
                        </button>
                      </div>
                      <button
                        onClick={() => toggleWishlist(item)}
                        aria-label="Remove from wishlist"
                        className="text-text-secondary hover:text-text-primary"
                      >
                        <X size={16} strokeWidth={1.4} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
