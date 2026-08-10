import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";



import { db } from "@/firebase/config";



const StoreContext = createContext(null);

export function StoreProvider({ children }) {

const { user } = useAuth();

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("neroli_cart") || "[]");
    } catch {
      return [];
    }
  });


  const [wishlist, setWishlist] = useState([]);


  const [isCartOpen, setCartOpen] = useState(false);
  const [isWishlistOpen, setWishlistOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("neroli_cart", JSON.stringify(cart));
  }, [cart]);

  

  function addToCart(product, qty = 1) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, qty: Math.min(i.qty + qty, product.stock ?? 99) }
            : i
        );
      }
      return [...prev, { ...product, qty }];
    });
    setCartOpen(true);
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function updateQty(id, delta) {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
        )
        .filter((i) => i.qty > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  async function toggleWishlist(product) {
  if (!user) return;

  const exists = wishlist.some((i) => i.id === product.id);

  let updated;

  if (exists) {
    updated = wishlist.filter((i) => i.id !== product.id);
  } else {
    updated = [...wishlist, product];
  }

  setWishlist(updated);

  await setDoc(
    doc(db, "users", user.uid, "wishlist", "items"),
    {
      products: updated,
    }
  );
}

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    cartTotal,
    cartCount,
    wishlist,
    toggleWishlist,
    isCartOpen,
    setCartOpen,
    isWishlistOpen,
    setWishlistOpen,
    isSearchOpen,
    setSearchOpen,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
