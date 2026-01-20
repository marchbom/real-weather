export const ERROR_MESSAGES = {
  // Weather API 관련
  WEATHER: {
    GET_CURRENT_WEATHER: "현재 날씨 정보를 불러오는데 실패했습니다",
    SEARCH_LOCATION: "위치 검색에 실패했습니다",
    REVERSE_GEOCODE: "위치 정보를 불러오는데 실패했습니다",
    INVALID_COORDINATES: "올바르지 않은 좌표입니다",
  },

  // 위치 정보 관련
  LOCATION: {
    NOT_SUPPORTED: "이 브라우저는 위치 정보를 지원하지 않습니다",
    GEOLOCATION_ERROR: "위치 정보를 가져오는 중 오류가 발생했습니다",
    KAKAO_API_ERROR: "Kakao REST API Key를 확인해주세요",
  },

  // 즐겨찾기 관련
  FAVORITES: {
    ADD_FAILED: "즐겨찾기 추가에 실패했습니다",
    DUPLICATE: "이미 즐겨찾기에 추가된 위치입니다",
    LIMIT_EXCEEDED: "즐겨찾기는 최대 6개까지 추가할 수 있습니다",
  },
} as const;
