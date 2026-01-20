import { ERROR_MESSAGES } from "@/shared/constants/errorMessage";

export type Coords = { lat: number; lon: number };

export function getCurrentCoords(): Promise<Coords> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error(ERROR_MESSAGES.LOCATION.NOT_SUPPORTED));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // 소수점 4자리로 반올림 (약 11m 정확도)
        const lat = Math.round(pos.coords.latitude * 10000) / 10000;
        const lon = Math.round(pos.coords.longitude * 10000) / 10000;
        resolve({ lat, lon });
      },
      (err) => {
        console.error(ERROR_MESSAGES.LOCATION.GEOLOCATION_ERROR, err.code, err.message);
        reject(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0, // 캐시 사용 안 함 - 항상 최신 위치
      },
    );
  });
}
