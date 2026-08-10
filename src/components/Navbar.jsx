import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { label: "Shop", to: "/shop" },
  { label: "Home Scents", to: "/shop?category=Home%20Scents" },
  { label: "Discover", to: "/discover" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, wishlist, setCartOpen, setSearchOpen } = useStore();
  const { user } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const solid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        solid
          ? "bg-bg-primary/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex items-center justify-between py-5">
        {/* Left nav (desktop) */}
        <nav className="hidden lg:flex items-center gap-8 flex-1">
          {NAV_LINKS.map((l) => (
            <Link key={l.label} to={l.to} className="nav-link hover:text-olive transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>

        {/* Logo */}
        <Link to="/" className="flex-1 flex flex-col items-center text-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="mb-1 text-olive">
            <path d="M12 2C12 2 6 7 6 13a6 6 0 0012 0c0-6-6-11-6-11z" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M12 6v15" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          <span className="font-display text-2xl md:text-3xl tracking-[0.18em] leading-none">
            NEROLI
          </span>
          <span className="hidden md:block text-[9px] tracking-[0.22em] uppercase text-text-secondary mt-1">
            A Mediterranean Fragrance House
          </span>
        </Link>

        {/* Right icons */}
        <div className="flex-1 flex items-center justify-end gap-5">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="hover:text-olive transition-colors hidden sm:block"
          >
            <Search size={18} strokeWidth={1.4} />
          </button>
          <Link
            to={user ? "/account" : "/login"}
            aria-label="Account"
            className="hover:text-olive transition-colors hidden sm:block"
          >
            <User size={18} strokeWidth={1.4} />
          </Link>
          <Link to="/wishlist" aria-label="Wishlist" className="relative hover:text-olive transition-colors hidden sm:block">
            <Heart size={18} strokeWidth={1.4} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-olive text-white text-[9px] flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            aria-label="Cart"
            onClick={() => setCartOpen(true)}
            className="relative hover:text-olive transition-colors"
          >
            <ShoppingBag size={18} strokeWidth={1.4} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-olive text-white text-[9px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg-primary lg:hidden"
          >
            <div className="flex justify-between items-center px-6 py-5 border-b border-border">
              <span className="font-display text-xl tracking-[0.18em]">NEROLI</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={22} strokeWidth={1.4} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center gap-8 py-16">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="font-display text-3xl font-light"
                >
                  {l.label}
                </Link>
              ))}
              <Link to={user ? "/account" : "/login"} className="font-display text-3xl font-light">
                Account
              </Link>
              <Link to="/wishlist" className="font-display text-3xl font-light">
                Wishlist
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
