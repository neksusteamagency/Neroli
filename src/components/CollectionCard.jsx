import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { CATEGORY_TREE } from "@/data/products";

export default function CollectionCard({ collection, index = 0 }) {
  const meta = CATEGORY_TREE[collection.id];
  // "Home & Office" redirects straight to Gadgets & Deco per the category rules
  const targetId =
    meta?.type === "redirect" ? meta.redirectTo : collection.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/shop?category=${encodeURIComponent(targetId)}`}
        className="group block"
      >
        <div className="relative aspect-[3/4] rounded-card overflow-hidden bg-bg-secondary img-zoom-wrap">
          <img
            src={collection.image}
            alt={collection.title}
            loading="lazy"
            className="img-zoom w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-text-primary/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <h3 className="text-xl font-light">{collection.title}</h3>
          <span className="flex items-center gap-1 text-[11px] tracking-[0.1em] uppercase text-text-secondary group-hover:text-olive transition-colors">
            Explore <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}