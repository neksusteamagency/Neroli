export function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] rounded-card bg-bg-secondary" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-16 bg-bg-secondary rounded" />
        <div className="h-5 w-32 bg-bg-secondary rounded" />
        <div className="h-4 w-12 bg-bg-secondary rounded" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
