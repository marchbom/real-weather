import { cn } from "@/shared/lib/utils";

type TopBarProps = {
  className?: string;
  onRefreshLocation?: () => void;
};

export function TopBar({ className, onRefreshLocation }: TopBarProps) {
  const handleCurrentLocationClick = () => {
    onRefreshLocation?.();
  };

  return (
    <div className={cn("w-full h-14 z-10 fixed top-0", className)}>
      <button
        type="button"
        onClick={handleCurrentLocationClick}
        className="text-body2 font-normal text-white pr-5 cursor-pointer"
      >
        현재위치
      </button>
    </div>
  );
}
