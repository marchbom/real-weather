import { Card } from "@/shared/ui/card";
import { LiaTemperatureLowSolid } from "react-icons/lia";
import type { HourlyWeatherItem } from "@/features/hourly-weather/model/types";
import { WeatherIcon } from "@/entities/weather/ui/weather-icon";

interface Props {
  items: HourlyWeatherItem[];
};

export default function HourlyWeatherCard({ items }: Props) {
  return (
    <Card className="h-33.5 md:w-85">
      <div className="flex flex-col pl-4 text-white">
        <div className="flex items-center gap-2 mb-4">
          <LiaTemperatureLowSolid className="w-4 h-4" />
          <p className="text-caption2">시간대별 기온</p>
        </div>

        <div className="flex gap-4 overflow-x-auto scroll-hidden snap-x snap-mandatory">
          {items.map((item) => (
            <div
              key={item.timeLabel}
              className="min-w-12 text-center snap-start"
            >
              <p className="text-caption1">{item.timeLabel}</p>
              <WeatherIcon
                main={item.main}
                className="mx-auto my-1 w-6 h-6 text-white/90 drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]"
              />
              <p className="text-body2">{item.temp}°</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
