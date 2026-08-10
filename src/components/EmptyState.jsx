export default function EmptyState({
  icon: Icon,
  title = "Nothing here yet",
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      {Icon && (
        <div className="w-14 h-14 rounded-full bg-bg-secondary flex items-center justify-center mb-5">
          <Icon size={22} className="text-text-secondary" strokeWidth={1.4} />
        </div>
      )}
      <h3 className="text-2xl font-light mb-2">{title}</h3>
      {description && (
        <p className="text-text-secondary text-sm max-w-xs mb-6">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
