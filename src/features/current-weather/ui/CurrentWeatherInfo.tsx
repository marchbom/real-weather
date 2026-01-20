import { WeatherIcon } from "@/entities/weather/ui/weather-icon";
import { FaLocationDot } from "react-icons/fa6";
import type { CurrentWeatherData } from "../model/types";

type Props = {
  currentWeather: CurrentWeatherData;
};
export default function CurrentWeatherInfo({ currentWeather }: Props) {
  return (
    <div className="flex flex-col justify-center items-center text-white mb-10">
      <div className="flex gap-0.5 items-center">
        <FaLocationDot className="w-4 h-4 " />
        <p className="text-h5 font-medium text-shadow-md">
          {currentWeather.locationName}
        </p>
      </div>
      <div className="flex items-center justify-center text-h1 font-medium text-shadow-md">
        <p>{currentWeather.temp.toFixed(0)}°</p>
      </div>
      <div>{currentWeather.description}</div>
      <WeatherIcon
        main={currentWeather.main}
        className="w-10 h-10 text-white drop-shadow-[0_6px_16px_rgba(0,0,0,0.35)]"
      />
      <div className="font-normal flex gap-2.5">
        <span>최고: {Math.round(currentWeather.max)}°</span>
        <span>최저: {Math.round(currentWeather.min)}°</span>
      </div>
    </div>
  );
}
