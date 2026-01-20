import FavoriteWeatherCard from "@/features/favorites/ui/FavoriteWeatherCard";
import { useFavoritesStore } from "@/app/store/useFavoritesStore";
import FavoritesHeader from "@/widgets/ui/FavoritesHeader";
import { Card } from "@/shared/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);
  
  return (
    <div className="md:w-85 mx-auto flex flex-col justify-center">
      <FavoritesHeader />
      
      <div className="md:w-85 mt-8 md:mt-8 flex flex-col gap-3">
        {favorites.length === 0 ? (
          // 즐겨찾기 없을 때
          <Card className="flex flex-col items-center justify-center py-12 px-4">
            <p className="text-white text-body1 font-medium mb-2">
              즐겨찾기한 위치가 없습니다
            </p>
            <p className="text-white/60 text-caption1">
              추가 버튼을 눌러 위치를 추가해보세요
            </p>
          </Card>
        ) : (
          <AnimatePresence mode="popLayout">
            {favorites.map((fav) => (
              <motion.div
                key={fav.id}
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ 
                  opacity: 0, 
                  x: 300,
                  transition: { duration: 0.3, ease: "easeIn" }
                }}
                transition={{ duration: 0.3 }}
              >
                <FavoriteWeatherCard favorite={fav} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
