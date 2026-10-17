import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import ProductBadge from "./ProductBadge";

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [hovered, setHovered] = useState(false);
  const isWishlisted = wishlist.some((w) => w.id === product.id);
  const outOfStock = (product.stock ?? 0) <= 0;
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative rounded-card overflow-hidden bg-bg-secondary aspect-[3/4] img-zoom-wrap">
          {product.isNew && <ProductBadge>New</ProductBadge>}
          {outOfStock && (
            <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
              <span className="text-[11px] tracking-[0.16em] uppercase border border-text-primary px-4 py-2">
                Sold Out
              </span>
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`img-zoom w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${
              hovered && product.imageHover ? "opacity-0" : "opacity-100"
            }`}
          />
          {product.imageHover && (
            <img
              src={product.imageHover}
              alt={product.name}
              loading="lazy"
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              if (!user) {
                navigate("/login");
                return;
              }
              toggleWishlist(product);
            }}
            aria-label="Toggle wishlist"
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
          >
            <Heart
              size={13}
              className={isWishlisted ? "fill-olive text-olive" : "text-text-primary"}
            />
          </button>

          {!outOfStock && (
            <div
              className={`absolute bottom-0 left-0 right-0 p-2.5 flex gap-2 transition-all duration-400 ${
                hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product, 1);
                }}
                className="flex-1 bg-text-primary text-white text-[10px] tracking-[0.1em] uppercase py-2.5 rounded-[8px] hover:bg-olive transition-colors"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>

        <div className="mt-3 space-y-0.5">
          {product.brand && (
            <p className="eyebrow text-[10px]">{product.brand}</p>
          )}
          <h3 className="text-[16px] font-light text-text-primary">
            {product.name}
          </h3>
          <p className="text-[13px] text-text-secondary">${product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
}