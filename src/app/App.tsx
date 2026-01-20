import { TopBar } from "../shared/ui/topBar";
import { PrimaryNav } from "../shared/ui/primaryNav";
import { useEffect, useState, lazy } from "react";
import { Route, Routes } from "react-router";
import { useWeatherStore } from "./store/useWeatherStore";
import { getCurrentCoords } from "../entities/location/lib/getCurrentCoords";
import { useOneCallWeather } from "../features/fetch-weather/model/useOneCallWeather";
import CurrentWeatherPage from "@/pages/main/ui/CurrentWeatherPage";

const FavoritesPage = lazy(() => import("../pages/favorites/ui/FavoritesPage"));
const FavoriteAddPage = lazy(() => import("../pages/favorites/ui/FavoriteAddPage"));
const FavoriteEditPage = lazy(() => import("../pages/favorites/ui/FavoriteEditPage"));
const FavoriteDetailPage = lazy(() => import("../pages/favorites-detail/ui/FavoriteDetailPage"));

export default function App() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const backgroundImg = useWeatherStore((s) => s.backgroundImg);
  const setBackgroundByMain = useWeatherStore((s) => s.setBackgroundByMain);

  useEffect(() => {
    (async () => {
      try {
        const c = await getCurrentCoords();
        setCoords(c);
      } catch {
        setCoords({ lat: 37.5665, lon: 126.978 });
      }
    })();
  }, []);

  const { data: weatherData } = useOneCallWeather(coords?.lat, coords?.lon);

  // 날씨 배경화면 store 업데이트
  useEffect(() => {
    const main = weatherData?.current?.weather?.[0]?.main;
    if (!main) return;
    setBackgroundByMain(main);
  }, [weatherData, setBackgroundByMain]);



  return (
    <div className="w-full min-h-screen relative">
      <TopBar className="flex justify-end items-center" />

      <div
        className="min-h-screen bg-cover bg-center pb-24 pt-14 px-5"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
          <Routes>
            <Route path="/" element={<CurrentWeatherPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/favorites/add" element={<FavoriteAddPage />} />
            <Route path="/favorites/edit" element={<FavoriteEditPage />} />
            <Route path="/favorites/:id" element={<FavoriteDetailPage />} />
          </Routes>
      </div>
      <PrimaryNav />
    </div>
  );
}
