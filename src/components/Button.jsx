export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as: Component = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[10px] font-body tracking-[0.08em] uppercase transition-all duration-300 ease-out disabled:opacity-50 disabled:pointer-events-none";

  const sizes = {
    sm: "text-[11px] px-5 py-2.5",
    md: "text-xs px-8 py-3.5",
    lg: "text-xs px-10 py-4",
  };

  const variants = {
    primary:
      "bg-olive text-white hover:bg-olive-hover",
    outline:
      "border border-text-primary text-text-primary hover:bg-text-primary hover:text-white",
    ghost:
      "text-text-primary hover:text-olive",
    light:
      "bg-white text-text-primary hover:bg-bg-secondary",
  };

  return (
    <Component
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
