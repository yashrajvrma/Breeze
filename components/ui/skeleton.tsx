"use client";

import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted-foreground/10",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-black/20 to-transparent" />
    </div>
  );
}

export { Skeleton };
