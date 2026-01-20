import { ERROR_MESSAGES } from "@/shared/constants/errorMessage";
import { kakaoAxios } from "./axiosInstance";

type KakaoAddressResponse = {
  documents: Array<{
    address_name: string;
    x: string; // lon
    y: string; // lat
  }>;
};

export async function getKakaoCoords(query: string) {
  try {
    const res = await kakaoAxios.get<KakaoAddressResponse>(
      "/v2/local/search/address.json",
      { params: { query } },
    );

    const first = res.data.documents?.[0];
    if (!first) return null;

    return {
      lat: Number(first.y),
      lon: Number(first.x),
      addressName: first.address_name,
    };
  } catch (err) {
    console.error(err, ERROR_MESSAGES.WEATHER.SEARCH_LOCATION);
    throw err;
  }
}
