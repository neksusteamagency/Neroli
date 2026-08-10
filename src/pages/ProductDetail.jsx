import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, Truck, Shield, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

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
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

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

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div>
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
                    className={`w-20 h-24 rounded-img overflow-hidden border-2 transition-colors ${
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
            <h1 className="text-[36px] md:text-[44px] font-light mb-1">
              {product.name}
            </h1>
            <p className="text-text-secondary text-sm mb-6">{product.category}</p>
            <p className="font-display text-3xl text-text-primary mb-6">
              ${product.price}
            </p>

            <p className="text-text-secondary leading-relaxed mb-6">
              {product.description}
            </p>

            {product.notes && (
              <div className="mb-8 pb-8 border-b border-border">
                <p className="text-[11px] tracking-[0.14em] uppercase text-text-secondary mb-2">
                  Fragrance Notes
                </p>
                <p className="text-sm">{product.notes}</p>
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

        {/* Related */}
        <div className="mt-28 pb-24">
          <p className="eyebrow mb-8 text-center">You May Also Like</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
