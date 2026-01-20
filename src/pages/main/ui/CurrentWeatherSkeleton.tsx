import { CurrentWeatherInfoSkeleton } from "@/features/current-weather/ui/CurrentWeatherInfoSkeleton";
import { HourlyWeatherCardSkeleton } from "@/features/hourly-weather/ui/HourlyWeatherCardSkeleton";

export default function CurrentWeatherSkeleton() {
  return (
    <div className="md:mt-24">
    <CurrentWeatherInfoSkeleton />
    <HourlyWeatherCardSkeleton />
  </div>
  )
}