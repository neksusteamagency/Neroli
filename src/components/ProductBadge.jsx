export default function ProductBadge({ children, tone = "olive" }) {
  const tones = {
    olive: "bg-olive text-white",
    gold: "bg-gold text-white",
    light: "bg-white text-text-primary border border-border",
  };
  return (
    <span
      className={`absolute top-4 left-4 z-10 text-[10px] tracking-[0.14em] uppercase px-3 py-1.5 rounded-full ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
