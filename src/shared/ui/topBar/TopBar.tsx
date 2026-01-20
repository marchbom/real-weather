import { cn } from "@/shared/lib/utils";
import { Link } from "react-router";

export function TopBar({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-14 z-10 fixed top-0", className)}>
      <Link
        to="/"
        className="text-body2 font-normal text-white pr-5 cursor-pointer"
      >
        현재위치
      </Link>
    </div>
  );
}
