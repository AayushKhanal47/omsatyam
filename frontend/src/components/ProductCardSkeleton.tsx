const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col rounded-3xl border border-border bg-white p-3">
      <div className="aspect-square animate-pulse rounded-2xl bg-border/70" />
      <div className="mt-4 h-3 w-1/3 animate-pulse rounded bg-border/70" />
      <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-border/70" />
      <div className="mt-5 h-8 w-full animate-pulse rounded-full bg-border/70" />
    </div>
  );
};

export default ProductCardSkeleton;
