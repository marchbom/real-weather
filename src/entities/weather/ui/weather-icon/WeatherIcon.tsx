import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

export type WeatherIconProps = {
  main: string;
  className?: string;
};

export function WeatherIcon({ main, className }: WeatherIconProps) {
  const Icon =
    main === "Clear"
      ? WiDaySunny
      : main === "Clouds"
        ? WiCloudy
        : main === "Rain" || main === "Drizzle"
          ? WiRain
          : main === "Snow"
            ? WiSnow
            : main === "Thunderstorm"
              ? WiThunderstorm
              : WiCloudy;

  return <Icon className={className} />;
}
