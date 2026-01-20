import { cn } from "@/shared/lib/utils";
import type { HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "text" | "circle";
}

export function Skeleton({
  className,
  variant = "default",
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-white/20",
        {
          "rounded-default": variant === "default",
          "rounded-full": variant === "circle",
          "rounded h-4": variant === "text",
        },
        className
      )}
      {...props}
    />
  );
}