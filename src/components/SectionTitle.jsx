import { motion } from "framer-motion";

export default function SectionTitle({
  eyebrow,
  title,
  align = "left",
  light = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={align === "center" ? "text-center" : "text-left"}
    >
      {eyebrow && (
        <p
          className={`eyebrow mb-3 ${
            light ? "text-white/70" : "text-text-secondary"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-[34px] md:text-[44px] lg:text-[50px] leading-[1.1] font-light ${
          light ? "text-white" : "text-text-primary"
        }`}
      >
        {title}
      </h2>
    </motion.div>
  );
}
