const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="aspect-[4/3] animate-pulse rounded-2xl bg-border/70" />
      <div className="mt-4 h-3 w-1/3 animate-pulse rounded bg-border/70" />
      <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-border/70" />
      <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-border/70" />
    </div>
  );
};

export default ProductCardSkeleton;
