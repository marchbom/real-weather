import { getReverseGeocoding } from "@/shared/api/geocodingApi";
import { useQuery } from "@tanstack/react-query";

// 위도, 경도 기반으로 도시명 불러오기
export const useReverseGeocoding = (lat?: number, lon?: number) => {
  return useQuery({
    queryKey: ["reverseGeocoding", lat, lon],
    queryFn: () => getReverseGeocoding(lat!, lon!),
    enabled: typeof lat === "number" && typeof lon === "number",
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
};
