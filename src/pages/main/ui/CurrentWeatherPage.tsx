import { ERROR_MESSAGES } from "@/shared/constants/errorMessage";
import { getCurrentCoords } from "@/entities/location/lib/getCurrentCoords";
import { Suspense, useEffect, useState } from "react";
import WeatherDetailPage from "@/pages/weather-detail/ui/WeatherDetailPage";
import CurrentWeatherSkeleton from "./CurrentWeatherSkeleton";

export default function CurrentWeatherPage() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );

  useEffect(() => {
    const run = async () => {
      try {
        const { lat, lon } = await getCurrentCoords();
        setCoords({ lat, lon });
      } catch (err) {
        console.error(err, ERROR_MESSAGES.WEATHER.INVALID_COORDINATES);

        // 위치를 찾지 못하면 서울을 기준
        setCoords({ lat: 37.5665, lon: 126.978 });
      }
    };

    run();
  }, []);

  if (!coords) return null;

  return (
    <Suspense fallback={<CurrentWeatherSkeleton />}>
      <WeatherDetailPage coords={coords} />
    </Suspense>


  )
  
}
