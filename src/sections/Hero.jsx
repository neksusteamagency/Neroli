import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/Button";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-bg-secondary">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/herofinal.png"
          alt="Mediterranean coastline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/90 via-bg-primary/30 to-transparent" />
      </div>

      <div className="relative w-full pl-8 md:pl-16 lg:pl-24 pt-28 pb-16 ">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow mb-6"
          >
            Inspired by Nature. Rooted in the Mediterranean.
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24, }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-[52px] sm:text-[64px] lg:text-[78px] leading-[1.02] font-light mb-6"
          >
            Chosen
            <br />
            with Care.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-text-secondary text-base md:text-lg leading-relaxed max-w-md mb-10"
          >
            We carefully curate authentic perfumes and home scents from
            around the world to help you find the fragrances you'll wear,
            live with, and remember.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-8 flex-wrap"
          >
            <Button as={Link} to="/shop" variant="primary" size="lg">
              Discover Our Collection
            </Button>
            <Link
              to="/discover"
              className="text-xs tracking-[0.12em] uppercase border-b border-text-primary pb-1 hover:text-olive hover:border-olive transition-colors"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
   
    </section>
  );
}
