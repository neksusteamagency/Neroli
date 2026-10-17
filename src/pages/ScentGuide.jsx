import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Droplet, Layers, Sun, Thermometer, Sparkles } from "lucide-react";
import Button from "@/components/Button";
import ScentQuiz from "@/components/ScentQuiz";
const CONCENTRATIONS = [
  {
    name: "Parfum (Extrait de Parfum)",
    range: "20–30% fragrance oil",
    longevity: "8–12+ hours",
    notes: "The richest and most long-lasting form. Lower alcohol content means the scent develops slowly and stays close to the skin rather than projecting loudly.",
  },
  {
    name: "Eau de Parfum (EDP)",
    range: "15–20% fragrance oil",
    longevity: "6–8 hours",
    notes: "The most common premium concentration. A strong balance of longevity and projection, suitable for most occasions.",
  },
  {
    name: "Eau de Toilette (EDT)",
    range: "5–15% fragrance oil",
    longevity: "3–5 hours",
    notes: "Lighter and fresher, often favored for daytime or warm-weather wear. Usually needs reapplication over a full day.",
  },
  {
    name: "Eau de Cologne (EDC)",
    range: "2–4% fragrance oil",
    longevity: "2–3 hours",
    notes: "Very light and diffusive, historically built around citrus. Popular for a quick refresh rather than all-day wear.",
  },
];

const ACCORD_FAMILIES = [
  {
    name: "Woody",
    desc: "Warm, dry, and grounding — built on materials like sandalwood, cedar, and vetiver. Often forms the base of a fragrance and pairs well with spicy or aromatic notes.",
  },
  {
    name: "Warm Spicy",
    desc: "Cinnamon, cardamom, nutmeg, and pepper — adds heat and depth. Common in fragrances designed to feel rich and cold-weather appropriate.",
  },
  {
    name: "Fresh Spicy",
    desc: "A lighter, sharper take on spice — think pink pepper or ginger — that adds energy without heaviness. Frequently used in modern, versatile scents.",
  },
  {
    name: "Aromatic",
    desc: "Herbal notes such as lavender, sage, and rosemary. Often reads as clean and slightly green, common in classic men's fragrances.",
  },
  {
    name: "Citrus",
    desc: "Bergamot, lemon, and orange — bright, sharp, and short-lived on their own, which is why citrus is almost always a top note rather than a base.",
  },
  {
    name: "Floral",
    desc: "Rose, jasmine, violet — the heart of countless fragrances. Ranges from soft and powdery to intensely heady depending on concentration.",
  },
  {
    name: "Amber",
    desc: "A warm, resinous, slightly sweet accord traditionally built from labdanum and benzoin. Reads as cozy and enveloping, common in evening fragrances.",
  },
  {
    name: "Musky",
    desc: "A soft, skin-like base note that adds warmth and a sense of closeness. Rarely worn alone — usually a supporting layer beneath other accords.",
  },
];

export default function ScentGuide() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      {/* Hero */}
      <div className="container-content text-center mb-20">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow mb-4">
          The Neroli Scent Guide
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[36px] md:text-[52px] font-light leading-[1.15] max-w-2xl mx-auto"
        >
          Understanding fragrance, from first spray to final dry-down.
        </motion.h1>
        <p className="text-text-secondary mt-6 max-w-xl mx-auto leading-relaxed">
          Whether you're choosing your first signature scent or refining a
          collection, this guide covers the fundamentals of how fragrance
          actually works — so you can shop with confidence.
        </p>
      </div>

      {/* The Fragrance Pyramid */}
      <section className="bg-bg-secondary section-pad">
        <div className="container-content">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">How Fragrance Unfolds</p>
            <h2 className="text-[32px] md:text-[38px] font-light">The Fragrance Pyramid</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                tier: "Top Notes",
                time: "First 5–15 minutes",
                desc: "The initial impression — usually light, volatile ingredients like citrus or fresh herbs. They evaporate quickly, which is why a fragrance can smell different minutes after application than it did in the bottle.",
              },
              {
                tier: "Heart Notes",
                time: "15 minutes – 1 hour",
                desc: "The core character of the fragrance, emerging as top notes fade. Often florals, spices, or fruit — this is what most people associate with the scent's identity.",
              },
              {
                tier: "Base Notes",
                time: "1 hour onward",
                desc: "The foundation — woods, musks, ambers, resins. Heavier molecules that evaporate slowly, giving the fragrance its lasting power and the scent it leaves on skin or fabric hours later.",
              },
            ].map((t) => (
              <motion.div
                key={t.tier}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-card p-8"
              >
                <p className="text-[11px] tracking-[0.14em] uppercase text-olive mb-2">{t.time}</p>
                <h3 className="text-xl font-light mb-3">{t.tier}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-text-secondary text-sm mt-10 max-w-2xl mx-auto leading-relaxed">
            A fragrance's full character only reveals itself over time — this is
            why it's worth wearing a scent for a few hours before judging it,
            rather than deciding from the first spray alone.
          </p>
        </div>
      </section>

      {/* Concentration guide */}
      <section className="section-pad">
        <div className="container-content">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">Reading the Bottle</p>
            <h2 className="text-[32px] md:text-[38px] font-light">Concentration Types</h2>
            <p className="text-text-secondary mt-4 max-w-xl mx-auto leading-relaxed">
              Concentration refers to the ratio of fragrance oil to alcohol and
              water. Higher concentration generally means longer wear and a
              richer, softer projection — though the raw materials used matter
              just as much as the percentage.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {CONCENTRATIONS.map((c) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border border-border rounded-card p-7"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg font-medium">{c.name}</h3>
                  <Droplet size={18} className="text-olive shrink-0 mt-1" />
                </div>
                <div className="flex gap-4 text-xs text-text-secondary mb-4">
                  <span>{c.range}</span>
                  <span>·</span>
                  <span>{c.longevity}</span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{c.notes}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accord families */}
      <section className="bg-bg-secondary section-pad">
        <div className="container-content">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">Building Blocks</p>
            <h2 className="text-[32px] md:text-[38px] font-light">Fragrance Families</h2>
            <p className="text-text-secondary mt-4 max-w-xl mx-auto leading-relaxed">
              Most fragrances are built from a handful of core "accords" —
              recognizable combinations of notes. Knowing which families you
              gravitate toward is the fastest way to shop with confidence.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ACCORD_FAMILIES.map((a) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-card p-6"
              >
                <h3 className="text-base font-medium mb-2">{a.name}</h3>
                <p className="text-text-secondary text-xs leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application & longevity tips */}
      <section className="section-pad">
        <div className="container-content">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">Getting the Most From Your Scent</p>
            <h2 className="text-[32px] md:text-[38px] font-light">Application & Longevity</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Target Pulse Points",
                desc: "Wrists, neck, and behind the ears generate warmth that helps diffuse fragrance throughout the day. Spray, don't rub — friction breaks down the top notes prematurely.",
              },
              {
                icon: Droplet,
                title: "Moisturized Skin Holds Scent Longer",
                desc: "Fragrance clings better to hydrated skin than dry skin. An unscented lotion applied beforehand can noticeably extend wear time.",
              },
              {
                icon: Layers,
                title: "Layer Thoughtfully",
                desc: "Using a matching scented body wash or lotion beneath your fragrance builds a stronger, longer-lasting scent trail without needing to over-apply.",
              },
            ].map((t) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <t.icon size={26} strokeWidth={1.2} className="text-olive mx-auto mb-4" />
                <h3 className="text-lg font-light mb-2">{t.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal guidance */}
      <section className="bg-bg-secondary section-pad">
        <div className="container-content">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">Matching Scent to Season</p>
            <h2 className="text-[32px] md:text-[38px] font-light">A Seasonal Approach</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { season: "Spring", icon: Sparkles, desc: "Light florals and green, aromatic notes suit the mild air — think fresh rather than heavy." },
              { season: "Summer", icon: Sun, desc: "Citrus and aquatic accords perform best in heat, since warmth intensifies projection — a little goes a long way." },
              { season: "Autumn", icon: Layers, desc: "Warm spices and woods come into their own as temperatures drop, giving fragrance more presence in cooler air." },
              { season: "Winter", icon: Thermometer, desc: "Rich ambers, resins, and heavier woods hold up best in cold weather, when scent molecules diffuse more slowly." },
            ].map((s) => (
              <motion.div
                key={s.season}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-card p-7 text-center"
              >
                <s.icon size={22} strokeWidth={1.3} className="text-olive mx-auto mb-4" />
                <h3 className="text-base font-medium mb-2">{s.season}</h3>
                <p className="text-text-secondary text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


            {/* How to know what suits you */}
<section className="section-pad">
  <div className="container-content">
    <div className="text-center mb-14">
      <p className="eyebrow mb-3">Find Your Match</p>
      <h2 className="text-[32px] md:text-[38px] font-light mb-4">
        How to Know What Suits You
      </h2>
      <p className="text-text-secondary max-w-xl mx-auto leading-relaxed">
        Fragrance preference comes down to your personal style, how your skin
        wears scent, and when you plan to wear it — not trends. Answer a few
        quick questions and we'll point you toward fragrances from our
        collection that genuinely fit.
      </p>
    </div>
    <ScentQuiz />
  </div>
</section>


      {/* Glossary */}
      <section className="section-pad">
        <div className="container-content max-w-3xl">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">Speaking the Language</p>
            <h2 className="text-[32px] md:text-[38px] font-light">Fragrance Glossary</h2>
          </div>
          <div className="divide-y divide-border">
            {[
              { term: "Sillage", def: "French for \"wake\" or \"trail\" — how far a fragrance projects from the wearer and lingers in a room." },
              { term: "Dry-Down", def: "The final stage of a fragrance's development, once the base notes are all that remain — often the truest, longest-lasting phase of the scent." },
              { term: "Accord", def: "A blended combination of individual notes designed to read as a single, unified impression (e.g. \"amber\" is itself a blend of several raw materials)." },
              { term: "Linear", def: "A fragrance that smells largely the same from application to dry-down, with minimal evolution between top, heart, and base." },
              { term: "Skin Scent", def: "A fragrance with very soft projection that sits close to the skin and is mostly noticeable to the wearer and those in close proximity." },
            ].map((g) => (
              <div key={g.term} className="py-5 flex flex-col sm:flex-row sm:gap-8">
                <p className="text-sm font-medium w-40 shrink-0 mb-1 sm:mb-0">{g.term}</p>
                <p className="text-text-secondary text-sm leading-relaxed">{g.def}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center container-content pt-12">
        <h2 className="text-[28px] md:text-[34px] font-light mb-6">
          Ready to find your signature scent?
        </h2>
        <Button as={Link} to="/shop" variant="primary" size="lg">
          Explore the Collection
        </Button>
      </section>
    </div>
  );
}