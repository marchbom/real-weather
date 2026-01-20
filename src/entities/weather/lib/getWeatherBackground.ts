import clear from "@/entities/weather/assets/weather-bg/clear.png";
import cloudy from "@/entities/weather/assets/weather-bg/cloudy.png";
import rainy from "@/entities/weather/assets/weather-bg/rainy.png";
import snow from "@/entities/weather/assets/weather-bg/snow.png";
import thunder from "@/entities/weather/assets/weather-bg/thunder.png";

export function getWeatherBackground(main: string) {
  switch (main) {
    case "Clear":
      return clear;
    case "Clouds":
      return cloudy;
    case "Rain":
    case "Drizzle":
      return rainy;
    case "Snow":
      return snow;
    case "Thunderstorm":
      return thunder;
    default:
      return clear;
  }
}
