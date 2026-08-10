import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { collections } from "@/data/products";
import CollectionCard from "@/components/CollectionCard";

export default function CollectionsGrid() {
  return (
    <section className="section-pad bg-bg-primary">
      <div className="container-luxe">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow"
          >
            Explore Our Collections
          </motion.p>
          <Link
            to="/shop"
            className="flex items-center gap-1 text-[11px] tracking-[0.1em] uppercase text-text-secondary hover:text-olive transition-colors"
          >
            View All <ArrowRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {collections.map((c, i) => (
            <CollectionCard key={c.id} collection={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
