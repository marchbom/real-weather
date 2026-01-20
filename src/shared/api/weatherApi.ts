import { API_KEY } from "../config/env";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { axiosInstance } from "./axiosInstance";
import type { OneCallWeatherResponse } from "@/entities/weather/model/types";

// 현재 위치 기반 날씨 조회
export const getOneCallWeather = async (
  lat: number,
  lon: number
): Promise<OneCallWeatherResponse> => {
  try {
    const res = await axiosInstance.get("", {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
        lang: "kr",
      },
    });
    return res.data;
  } catch (err) {
    console.error(err, ERROR_MESSAGES.WEATHER.GET_CURRENT_WEATHER);
    throw err;
  }
};
