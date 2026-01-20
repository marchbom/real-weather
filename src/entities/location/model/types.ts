export type ReverseGeocodeItem = {
  name: string;
  local_names?: {
    ko?: string;
  };
  country: string;
  lat: number;
  lon: number;
};
