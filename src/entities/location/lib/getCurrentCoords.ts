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
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        console.error(ERROR_MESSAGES.LOCATION.GEOLOCATION_ERROR, err.code, err.message);
        reject(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60_000,
      },
    );
  });
}
