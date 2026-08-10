import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/Button";

export default function BrandStory() {
  return (
    <section className="bg-bg-secondary">
      <div className="grid lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="aspect-[4/3] lg:aspect-auto"
        >
          <img
            src="balcony.png"
            alt="Mediterranean stone house with olive trees"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="flex items-center px-6 sm:px-12 lg:px-20 py-16 lg:py-0 relative">
          <svg
            className="absolute right-6 top-10 opacity-10 hidden lg:block"
            width="160" height="220" viewBox="0 0 160 220" fill="none"
          >
            <path d="M80 10C80 10 30 60 30 120C30 170 55 210 80 210C105 210 130 170 130 120C130 60 80 10 80 10Z" stroke="#6F7050" strokeWidth="1"/>
            <path d="M80 20V200" stroke="#6F7050" strokeWidth="1"/>
          </svg>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md relative z-10"
          >
            <p className="eyebrow mb-4">Our Philosophy</p>
            <h2 className="text-[34px] md:text-[42px] leading-[1.15] font-light mb-6">
              Fragrances chosen with care, for moments that matter.
            </h2>
            <p className="text-text-secondary leading-relaxed mb-8">
              At Neroli, we believe the right fragrance becomes part of your
              story. That's why we help you discover scents that feel like
              you — authentic, timeless, and made to be remembered.
            </p>
            <Button as={Link} to="/discover" variant="outline">
              About Neroli
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
