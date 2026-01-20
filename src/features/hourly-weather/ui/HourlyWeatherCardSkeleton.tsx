import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export function HourlyWeatherCardSkeleton() {
  return (
    <Card className="h-33.5 md:w-85">
      <div className="flex flex-col pl-4 text-white">
        {/* 헤더 */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-3 w-20" />
        </div>

        {/* 시간대별 */}
        <div className="flex gap-4 overflow-x-auto">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="min-w-12 flex flex-col items-center gap-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-8" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
