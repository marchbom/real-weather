import { useOneCallWeather } from "@/features/fetch-weather/model/useOneCallWeather";
import type { Favorite } from "@/app/store/useFavoritesStore";
import { Card } from "@/shared/ui/card";
import { getWeatherBackground } from "@/entities/weather/lib/getWeatherBackground";
import { useNavigate } from "react-router";
import { FavoriteWeatherCardSkeleton } from "./FavoriteWeatherCardSkeleton";

export default function FavoriteWeatherCard({
  favorite,
}: {
  favorite: Favorite;
}) {
  const { data, isLoading, error } = useOneCallWeather(
    favorite.lat,
    favorite.lon,
  );
  const navigate = useNavigate();
  

  if (isLoading) return <FavoriteWeatherCardSkeleton />;
  
  if (error) {
    return (
      <Card className="px-4 h-[120px] flex items-center justify-center">
        <p className="text-white/60 text-caption1">날씨를 불러올 수 없습니다</p>
      </Card>
    );
  }
  
  if (!data) return null;

  const main = data.current.weather?.[0]?.main;
  const desc = data.current.weather?.[0]?.description;

  const backgroundImg = getWeatherBackground(main);

  const temp = Math.round(data.current.temp);
  const max = Math.round(data.daily[0].temp.max);
  const min = Math.round(data.daily[0].temp.min);

  return (
    <Card
      onClick={() => navigate(`/favorites/${favorite.id}`)}
      className="px-4 relative overflow-hidden group drop-shadow-lg cursor-pointer"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-250 group-hover:opacity-100 w-full" />

      <div className="flex justify-between text-white text-shadow-md">
        <div className="flex flex-col min-w-0">
          <p className="text-h4 font-semibold truncate">{favorite.label}</p>
          <p className="text-caption1 text-white text-shadow-md">
            {favorite.alias ?? ""}
          </p>
        </div>
        <p className="text-h2 font-semibold">{temp}°</p>
      </div>

      <div className="flex justify-between text-white text-caption1 text-shadow-sm font-normal mt-7">
        <p>{desc}</p>
        <div className="flex gap-2.5">
          <p>최고 : {max}°</p>
          <p>최저 : {min}°</p>
        </div>
      </div>
    </Card>
  );
}
