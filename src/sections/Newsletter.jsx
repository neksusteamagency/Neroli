import { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3500);
  }

  return (
    <section className="bg-olive py-16 md:py-20 relative overflow-hidden">
      <svg
        className="absolute -right-10 -bottom-10 opacity-10"
        width="220" height="220" viewBox="0 0 24 24" fill="none"
      >
        <path d="M12 2C12 2 6 7 6 13a6 6 0 0012 0c0-6-6-11-6-11z" stroke="white" strokeWidth="0.6"/>
      </svg>
      <div className="container-content relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="text-center lg:text-left">
            <p className="text-[11px] tracking-[0.16em] uppercase text-white/70 mb-2">
              Stay in the Know
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-white font-light">
              Be the first to discover new arrivals, exclusive offers, and
              scent stories.
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-white/95 rounded-input px-5 py-3.5 text-sm outline-none placeholder:text-text-secondary"
            />
            <button
              type="submit"
              className="bg-bg-primary text-text-primary text-xs tracking-[0.1em] uppercase px-6 py-3.5 rounded-input hover:bg-white transition-colors whitespace-nowrap"
            >
              {submitted ? "Thank You" : "Subscribe"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
