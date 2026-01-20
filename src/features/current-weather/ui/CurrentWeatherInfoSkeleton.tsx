import { Skeleton } from "@/shared/ui/skeleton";

export function CurrentWeatherInfoSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center text-white mb-10 gap-3">
      {/* 위치 */}
      <div className="flex gap-0.5 items-center">
        <Skeleton className="h-5 w-20 ml-1" />
      </div>
      
      {/* 온도 */}
      <Skeleton className="h-16 w-30" />
      
      {/* 날씨 설명 */}
      <Skeleton className="h-4.5 w-15" />
      
      {/* 날씨 아이콘 */}
      <Skeleton className="h-10 w-10 rounded-full" />
      
      {/* 최고/최저 온도 */}
      <div className="flex gap-2.5">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}
