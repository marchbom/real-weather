import { Link, useLocation } from "react-router";
import { MapPin, List } from "lucide-react";

export function PrimaryNav() {
  const { pathname } = useLocation();

  const isWeather = pathname === "/" || pathname.startsWith("/favorites/");
  const isFavorites = pathname === "/favorites";

  return (
    <nav className="fixed bottom-2.5 left-0 right-0 z-50 md:top-10 h-18">
      <div className="mx-auto w-full px-2.5 md:w-85 md:px-0">
        <div className="bg-glass-black h-18 rounded-default backdrop-blur-[32px]">
          <div className="grid h-full grid-cols-2">
            {/* 지금날씨 */}
            <Link
              to="/"
              className={`
                flex flex-col items-center justify-center gap-2
                transition
                ${isWeather ? "text-white" : "text-white/50"}
              `}
            >
              <MapPin className="h-5 w-5" />
              <span className="text-caption2">지금날씨</span>
            </Link>

            {/* 즐겨찾기 */}
            <Link
              to="/favorites"
              className={`
                flex flex-col items-center justify-center gap-2
                transition
                ${isFavorites ? "text-white" : "text-white/40"}
              `}
            >
              <List className="h-5 w-5" />
              <span className="text-caption2">즐겨찾기</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
