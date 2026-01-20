import { getOneCallWeather } from "@/shared/api/weatherApi";
import { useQuery } from "@tanstack/react-query";

// 위치 기반 날씨 조회
export const useOneCallWeather = (lat?: number, lon?: number) => {
  return useQuery({
    queryKey: ["oneCallWeather", lat, lon],
    queryFn: () => getOneCallWeather(lat!, lon!),
    enabled: typeof lat === "number" && typeof lon === "number",
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
};
