import type { HourlyWeatherData } from "../model/types";

// 시간대별 날씨 데이터 매핑
export function mapHourly(hourly: HourlyWeatherData[]) {
  return hourly.slice(0, 15).map((h, idx) => {
    const hour = new Date(h.dt * 1000).getHours();

    return {
      timeLabel: idx === 0 ? "지금" : `${hour}시`,
      temp: Math.round(h.temp),
      main: h.weather[0]?.main ?? "Clear",
    };
  });
}
