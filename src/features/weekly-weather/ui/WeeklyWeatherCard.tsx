import { Card } from "@/shared/ui/card";
import { WeatherIcon } from "@/entities/weather/ui/weather-icon";
import type { WeeklyWeatherItem } from "../model/types";
import { LuCalendar } from "react-icons/lu";

interface Props {
  items: WeeklyWeatherItem[];
};

export default function WeeklyWeatherCard({ items }: Props) {
  return (
    <Card className="pt-4 pb-2 mt-2.5 text-white md:w-85">
      <div className="px-4">
        {/* title */}
        <div className="flex items-center gap-2">
          <LuCalendar className="w-4 h-4" />
          <p className="text-caption2">7일간 일기예보</p>
        </div>

        {/* rows */}
        <ul className="flex flex-col">
          {items.map((item, idx) => (
            <li key={`${item.dayLabel}-${idx}`}>
              <div className="grid grid-cols-[auto_1fr_auto] items-center py-4">
                {/* day */}
                <p className="w-14 text-body2 font-medium">{item.dayLabel}</p>

                <div className="flex justify-center">
                  <WeatherIcon
                    main={item.main}
                    className="w-7 h-7 drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]"
                  />
                </div>

                {/* temps */}
                <div className="flex items-center gap-8 text-body2 font-medium justify-self-end">
                  <p className="whitespace-nowrap">
                    최저 : <span className="ml-1">{item.min}°</span>
                  </p>
                  <p className="whitespace-nowrap">
                    최고 : <span className="ml-1">{item.max}°</span>
                  </p>
                </div>
              </div>

              {idx !== items.length - 1 && <div className="h-px bg-white/15" />}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
