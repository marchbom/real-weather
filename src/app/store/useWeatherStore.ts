import { create } from "zustand";
import { getWeatherBackground } from "@/entities/weather/lib/getWeatherBackground";

type WeatherUiState = {
  backgroundImg: string;
  setBackgroundByMain: (main?: string) => void;
};

// 배경화면
export const useWeatherStore = create<WeatherUiState>((set) => ({
  backgroundImg: getWeatherBackground("Clear"),
  setBackgroundByMain: (main) =>
    set({ backgroundImg: getWeatherBackground(main ?? "Clear") }),
}));
