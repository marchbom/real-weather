import axios from "axios";
import {
  API_BASE_URL,
  GEO_REVERSE_URL,
  KAKAO_GEOCODE_URL,
  KAKAO_REST_API_KEY,
} from "../config/env";
import { ERROR_MESSAGES } from "../constants/errorMessage";

// 날씨 API
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Reverse Geocoding: 좌표(lat/lon) -> 주소
export const geocodingReverseAxios = axios.create({
  baseURL: GEO_REVERSE_URL,
});

if (!KAKAO_REST_API_KEY) {
  throw new Error(ERROR_MESSAGES.LOCATION.KAKAO_API_ERROR);
}

export const kakaoAxios = axios.create({
  baseURL: KAKAO_GEOCODE_URL,
  headers: {
    Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
  },
});
