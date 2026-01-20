import { useParams } from "react-router";
import { useFavoritesStore } from "@/app/store/useFavoritesStore";
import WeatherDetailPage from "@/pages/weather-detail/ui/WeatherDetailPage";

export default function FavoriteDetailPage() {
  const { id } = useParams();
  const favorites = useFavoritesStore((s) => s.favorites);

  const fav = favorites.find((f) => f.id === id);

  if (!fav)
    return <div className="text-white">해당 즐겨찾기를 찾을 수 없음</div>;

  return <WeatherDetailPage coords={{ lat: fav.lat, lon: fav.lon }} />;
}
