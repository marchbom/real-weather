import HourlyWeatherCard from "@/features/hourly-weather/ui/HourlyWeatherCard";
import { useReverseGeocoding } from "@/entities/location/model/useReverseGeocoding";
import { useOneCallWeather } from "@/features/fetch-weather/model/useOneCallWeather";
import CurrentWeatherInfo from "@/features/current-weather/ui/CurrentWeatherInfo";
import { mapHourly } from "@/entities/weather/lib/mapHourly";
import WeeklyWeatherCard from "@/features/weekly-weather/ui/WeeklyWeatherCard";
import { mapWeekly } from "@/entities/weather/lib/mapWeekly";
import { useEffect } from "react";
import { useWeatherStore } from "@/app/store/useWeatherStore";
import { CurrentWeatherInfoSkeleton } from "@/features/current-weather/ui/CurrentWeatherInfoSkeleton";
import { HourlyWeatherCardSkeleton } from "@/features/hourly-weather/ui/HourlyWeatherCardSkeleton";
import { WeeklyWeatherCardSkeleton } from "@/features/weekly-weather/ui/WeeklyWeatherCardSkeleton";
import { useLocation } from "react-router";

type Coords = { lat: number; lon: number };

type Props = {
  coords: Coords;
  locationName?: string;
};
export default function WeatherDetailPage({ coords, locationName: providedLocationName }: Props) {
  const location = useLocation();
  const isCurrentLocation = location.pathname === "/";

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
  } = useOneCallWeather(coords?.lat, coords?.lon);

  const {
    data: locationData,
    isLoading: isLocationLoading,
    error: locationError,
  } = useReverseGeocoding(coords?.lat, coords?.lon);

  const setBackgroundByMain = useWeatherStore(
    (state) => state.setBackgroundByMain,
  );

  useEffect(() => {
    const main = weatherData?.current?.weather?.[0]?.main;
    if (!main) return;
    setBackgroundByMain(main);
  }, [weatherData, setBackgroundByMain]);

  // 로딩 상태
  if (!coords || isWeatherLoading || (isLocationLoading && !providedLocationName)) {
    return (
      <div className="md:mt-24">
        <CurrentWeatherInfoSkeleton />
        <HourlyWeatherCardSkeleton />
        <WeeklyWeatherCardSkeleton />
      </div>
    );
  }

  // 에러 상태
  if (weatherError) {
    return (
      <div className="md:mt-24 flex items-center justify-center">
        <div className="text-white text-center py-12">
          <p className="text-body1 mb-2">날씨 정보를 불러올 수 없습니다</p>
          <p className="text-caption1 text-white/60">{weatherError.message}</p>
        </div>
      </div>
    );
  }

  if (!weatherData) return null;
  if (locationError) console.warn(locationError);

  const locationName =
    providedLocationName ??
    locationData?.[0]?.local_names?.ko ??
    locationData?.[0]?.name ??
    "현재 위치";

  const currentWeather = {
    locationName,
    temp: weatherData.current.temp,
    description: weatherData.current.weather[0].description,
    main: weatherData.current.weather[0].main,
    max: weatherData.daily[0].temp.max,
    min: weatherData.daily[0].temp.min,
  };

  const hourlyItems = mapHourly(weatherData.hourly);
  const weeklyItems = mapWeekly(weatherData.daily);

  return (
    <div className="md:mt-24 ">
      <div>
        <CurrentWeatherInfo 
          currentWeather={currentWeather}
          showLocationIcon={isCurrentLocation}
        />
        <HourlyWeatherCard items={hourlyItems} />
        <WeeklyWeatherCard items={weeklyItems} />
      </div>
    </div>
  );
}
