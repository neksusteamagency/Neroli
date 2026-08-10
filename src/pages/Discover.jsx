import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, MapPin, Sparkles } from "lucide-react";
import Button from "@/components/Button";
import Newsletter from "@/sections/Newsletter";

export default function Discover() {
  return (
    <div className="pt-28 md:pt-32">
      {/* Hero */}
      <div className="container-luxe text-center mb-16">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow mb-4">
          Our Story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[40px] md:text-[56px] font-light max-w-2xl mx-auto leading-[1.1]"
        >
          Rooted in the Mediterranean way of living.
        </motion.h1>
      </div>

      <div className="relative h-[60vh] mb-24">
        <img
          src="https://images.unsplash.com/photo-1533619043865-1b9b9e3cf9f0?w=1800&q=80"
          alt="Mediterranean terrace"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Story */}
      <section className="container-content mb-28">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow mb-4">How It Began</p>
            <h2 className="text-[32px] font-light mb-6 leading-tight">
              A house built on memory and place.
            </h2>
            <p className="text-text-secondary leading-relaxed mb-5">
              Neroli was born from a simple belief: the right scent has the
              power to transport you. Founded by travelers who fell in love
              with the warmth of coastal towns, sun-bleached stone, and the
              quiet rhythm of slow mornings, Neroli set out to bottle that
              feeling.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Every fragrance we curate is chosen not for trend, but for
              timelessness — pieces from independent ateliers and storied
              maisons who share our devotion to craft.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-4">Our Promise</p>
            <h2 className="text-[32px] font-light mb-6 leading-tight">
              Authenticity, always.
            </h2>
            <p className="text-text-secondary leading-relaxed mb-5">
              Every bottle that reaches you is sourced directly from
              authorized distributors and the houses themselves. No
              dilutions, no shortcuts — only the fragrance as it was meant
              to be experienced.
            </p>
            <p className="text-text-secondary leading-relaxed">
              From the moment you discover a scent to the moment it arrives
              at your door, we treat the experience with the same care we'd
              want for ourselves.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-bg-secondary section-pad">
        <div className="container-luxe">
          <p className="eyebrow text-center mb-12">What Guides Us</p>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Leaf,
                title: "Natural & Authentic",
                desc: "We work only with houses that share our values of craft and integrity.",
              },
              {
                icon: MapPin,
                title: "Mediterranean Spirit",
                desc: "Every collection is inspired by coastlines, citrus groves, and warm stone.",
              },
              {
                icon: Sparkles,
                title: "Considered Curation",
                desc: "We'd rather offer fifty fragrances we love than five hundred we don't.",
              },
            ].map((v) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-card p-10 text-center"
              >
                <v.icon size={26} strokeWidth={1.2} className="text-olive mx-auto mb-5" />
                <h3 className="text-xl font-light mb-3">{v.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad text-center container-content">
        <h2 className="text-[32px] md:text-[40px] font-light mb-6">
          Ready to find your signature scent?
        </h2>
        <Button as={Link} to="/shop" variant="primary" size="lg">
          Discover Our Collection
        </Button>
      </section>

      <Newsletter />
    </div>
  );
}
