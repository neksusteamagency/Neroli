import { motion } from "framer-motion";
import { Leaf, HeartHandshake, Gift, Truck } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Authentic",
    desc: "100% authentic fragrances from trusted houses.",
  },
  {
    icon: HeartHandshake,
    title: "Curated with Care",
    desc: "Every product is selected with quality and intention.",
  },
  {
    icon: Gift,
    title: "Made to Feel Special",
    desc: "Thoughtful packaging for an experience like no other.",
  },
  {
    icon: Truck,
    title: "Delivered to You",
    desc: "Fast, reliable delivery across Lebanon.",
  },
];

export default function Features() {
  return (
    <section className="bg-bg-primary py-14 md:py-16">
      <div className="container-luxe">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 divide-x divide-border/0 lg:divide-x">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex flex-col items-center text-center px-4"
            >
              <f.icon size={28} strokeWidth={1.1} className="text-olive mb-4" />
              <h3 className="text-[13px] tracking-[0.1em] uppercase mb-2">
                {f.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed max-w-[200px]">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
