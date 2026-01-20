import { searchAddress } from "@/entities/address/lib/searchAddress";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { BackButton } from "@/shared/ui/backButton";
import { Input } from "@/shared/ui/input";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { HighlightText } from "@/shared/ui/hightlight";
import { useFavoritesStore } from "@/app/store/useFavoritesStore";
import { ERROR_MESSAGES } from "@/shared/constants/errorMessage";
import { useNavigate } from "react-router";
import { getKakaoCoords } from "@/shared/api/kakaoGeocodingApi";

// JSON을 동적으로 import
const useDistrictsData = (): string[] => {
  const [data, setData] = useState<string[]>([]);
  
  useEffect(() => {
    import("@/entities/address/data/korea_districts.json").then((module) => {
      setData(module.default);
    });
  }, []);
  
  return data;
};
export default function FavoriteAddPage() {
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState<{
    raw: string;
    label: string;
  } | null>(null);

  const debounced = useDebounce(keyword, 300);
  const navigate = useNavigate();

  const favorites = useFavoritesStore((s) => s.favorites);
  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const addList = useDistrictsData();

  const results = useMemo(() => {
    if (selected) return [];
    return searchAddress(addList, debounced);
  }, [debounced, selected, addList]);

  const handleSelectAddress = async (result: {
    raw: string;
    label: string;
  }) => {

    try {
      // UI 반응
      setSelected(result);
      setKeyword(result.label);

      // 중복 방지
      const isDuplicate = favorites.some((f) => f.raw === result.raw);
      if (isDuplicate) {
        alert(ERROR_MESSAGES.FAVORITES.DUPLICATE);
        return;
      }

      // 즐겨찾기 6개 까지만 가능
      if (favorites.length >= 6) {
        alert(ERROR_MESSAGES.FAVORITES.LIMIT_EXCEEDED);
        return;
      }

      const coords = await getKakaoCoords(result.label);

      if (!coords) {
        alert("해당 위치를 찾을 수 없습니다");
        return;
      }

      // 즐겨찾기 저장
      addFavorite({
        id: crypto.randomUUID(),
        raw: result.raw,
        label: result.label,
        lat: coords.lat,
        lon: coords.lon,
      });

      navigate("/favorites");
    } catch (err) {
      console.error(err);
      alert(ERROR_MESSAGES.FAVORITES.ADD_FAILED);
    }
  };
  return (
    <div className="md:w-85 mx-auto max-h-dvh flex flex-col md:mt-24 overflow-hidden">
      <div className="shrink-0">
        <BackButton />
        <div className="relative mt-2">
          <Input
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setSelected(null);
            }}
            className="placeholder:text-white/70 text-white/70 pl-5 w-full h-12.5 bg-glass-white border-none rounded-full"
            placeholder="도시 또는 지역을 입력해주세요"
          />
          <Search className="text-white absolute top-1/2 right-5 h-6 w-6 -translate-y-1/2" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto mt-8 scroll-hidden">
        <ul className="flex flex-col gap-4 text-white">
          {results.map((result, idx) => (
            <li key={result.raw}>
              <button type="button" onClick={() => handleSelectAddress(result)}>
                <HighlightText text={result.label} query={keyword} />
              </button>
              {idx !== results.length - 1 && (
                <div className="mt-4 h-px bg-[#d9d9d9]/30" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
