import { API_KEY } from "../config/env";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { geocodingReverseAxios } from "./axiosInstance";

// 현재 위치 기반 날씨 조회
export const getReverseGeocoding = async (lat: number, lon: number) => {
  try {
    const res = await geocodingReverseAxios.get("", {
      params: {
        lat,
        lon,
        limit: 1,
        appid: API_KEY,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err, ERROR_MESSAGES.WEATHER.REVERSE_GEOCODE);
    throw err;
  }
};
