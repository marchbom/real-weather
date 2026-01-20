import { cn } from "@/shared/lib/utils";
import type React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
};
export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-glass-white rounded-default backdrop-blur-default py-4 w-full md:w- md:mx-auto",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
