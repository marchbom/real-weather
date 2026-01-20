import type { DailyWeatherData } from "../model/types";

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

// 7일 일기예보 데이터 매핑
export function mapWeekly(daily: DailyWeatherData[]) {
  return daily.slice(0, 7).map((d, idx) => {
    const date = new Date(d.dt * 1000);
    const dayLabel = idx === 0 ? "오늘" : WEEK[date.getDay()];

    return {
      dayLabel,
      min: Math.round(d.temp.min),
      max: Math.round(d.temp.max),
      main: d.weather[0]?.main ?? "Clear",
    };
  });
}
