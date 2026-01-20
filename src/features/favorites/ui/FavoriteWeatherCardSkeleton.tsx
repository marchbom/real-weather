import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export function FavoriteWeatherCardSkeleton() {
  return (
    <Card className="px-4 h-[120px]">
      <div className="flex justify-between">
        {/* 지역명, 별칭 */}
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        
        {/* 온도 */}
        <Skeleton className="h-8 w-16" />
      </div>

      {/* 최고/최저 */}
      <div className="flex justify-between mt-7">
        <Skeleton className="h-4 w-20" />
        <div className="flex gap-2.5">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </Card>
  );
}