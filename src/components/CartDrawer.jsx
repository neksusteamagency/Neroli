import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "@/context/StoreContext";
import Button from "./Button";
import EmptyState from "./EmptyState";

export default function CartDrawer() {
  const {
    isCartOpen,
    setCartOpen,
    cart,
    updateQty,
    removeFromCart,
    cartTotal,
  } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
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
              <h3 className="font-display text-xl">Your Bag ({cart.length})</h3>
              <button onClick={() => setCartOpen(false)} aria-label="Close cart">
                <X size={20} strokeWidth={1.4} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cart.length === 0 ? (
                <EmptyState
                  icon={ShoppingBag}
                  title="Your bag is empty"
                  description="Discover fragrances chosen with care."
                  action={
                    <Button variant="primary" onClick={() => setCartOpen(false)} as={Link} to="/shop">
                      Explore Collection
                    </Button>
                  }
                />
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-24 rounded-img overflow-hidden bg-bg-secondary shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[16px] font-light truncate">{item.name}</h4>
                        <p className="text-sm text-text-secondary mb-2">${item.price}</p>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-7 h-7 border border-border rounded-full flex items-center justify-center hover:border-olive transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 border border-border rounded-full flex items-center justify-center hover:border-olive transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        className="text-text-secondary hover:text-text-primary"
                      >
                        <X size={16} strokeWidth={1.4} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-6 border-t border-border">
                <div className="flex justify-between items-center mb-5">
                  <span className="eyebrow">Subtotal</span>
                  <span className="font-display text-2xl">${cartTotal.toFixed(2)}</span>
                </div>
                <Button
                  as={Link}
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Checkout
                </Button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full text-center text-xs tracking-[0.1em] uppercase text-text-secondary mt-4 hover:text-olive transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
