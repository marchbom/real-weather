import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export function WeeklyWeatherCardSkeleton() {
  return (
    <Card className="pt-4 pb-2 mt-2.5 text-white md:w-85">
      <div className="px-4">
        {/* 헤더 */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-3 w-24" />
        </div>

        {/* 주간 날씨 */}
        <ul className="flex flex-col">
          {Array.from({ length: 7 }).map((_, idx) => (
            <li key={idx}>
              <div className="grid grid-cols-[auto_1fr_auto] items-center py-4">
                {/* 요일 */}
                <Skeleton className="h-4 w-14" />

                <div className="flex justify-center">
                  <Skeleton className="h-7 w-7 rounded-full" />
                </div>

                {/* 최저/최고 온도 */}
                <div className="flex items-center gap-8 justify-self-end">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              {idx !== 6 && <div className="h-px bg-white/15" />}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
