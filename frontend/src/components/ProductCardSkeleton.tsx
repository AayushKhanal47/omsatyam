const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface">
      <div className="aspect-square animate-pulse bg-border" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-border" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-border" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-border" />
        <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-border" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
