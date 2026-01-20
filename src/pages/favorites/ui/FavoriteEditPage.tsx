import { useMemo, useState, memo } from "react";
import { Input } from "@/shared/ui/input";
import { Card } from "@/shared/ui/card";
import { useFavoritesStore } from "@/app/store/useFavoritesStore";
import { BackButton } from "@/shared/ui/backButton";
import { motion, AnimatePresence } from "framer-motion";

const EditPageHeader = memo(function EditPageHeader() {
  return (
    <div className="shrink-0">
      <BackButton />
      <p className="mt-4 text-white text-h3 font-semibold">즐겨찾기 편집</p>
    </div>
  );
});

export default function FavoriteEditPage() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const updateAlias = useFavoritesStore((s) => s.updateAlias);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [value, setValue] = useState("");

  const editingItem = useMemo(
    () => favorites.find((f) => f.id === editingId),
    [favorites, editingId],
  );

  const handleStartEdit = (id: string) => {
    const item = favorites.find((f) => f.id === id);
    if (!item) return;
    setEditingId(id);
    setValue(item.alias ?? "");
  };

  const handleDone = () => {
    if (!editingId) return;
    const trimmed = value.trim();

    updateAlias(editingId, trimmed.length ? trimmed : null);
    setEditingId(null);
    setValue("");
  };

  return (
    <div className="md:w-85 mx-auto md:mt-24 pb-24">
      <EditPageHeader />

      <div className="mt-6 flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {favorites.map((fav) => {
            const isEditing = fav.id === editingId;

            return (
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
                <Card className="px-5 py-5 text-white bg-glass-black h-31">
              <div className="h-full flex flex-col justify-between">
                {/* top */}
                <div className="min-w-0">
                  <p className="text-h4 font-semibold truncate">{fav.label}</p>

                  {isEditing ? (
                    <Input
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="별칭을 입력해주세요"
                      className="mt-2 w-[70%] h-8 rounded-default bg-glass-black border-none text-white text-shadow-2xs placeholder:text-white/50 placeholder:text-[13px] px-4"
                      autoFocus
                    />
                  ) : (
                    <p className="mt-1 text-caption1 text-white/80 truncate">
                      {fav.alias ?? ""}
                    </p>
                  )}
                </div>

                {/* bottom actions */}
                <div className="flex justify-end gap-4 text-caption1 font-medium">
                  {isEditing ? (
                    <button
                      type="button"
                      onClick={handleDone}
                      className="cursor-pointer"
                    >
                      {editingItem?.alias ? "수정완료" : "완료"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleStartEdit(fav.id)}
                      className="cursor-pointer text-white/80 hover:text-white"
                    >
                      {fav.alias ? "별칭수정" : "별칭입력"}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => removeFavorite(fav.id)}
                    className="cursor-pointer text-white/80 hover:text-white"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
            );
          })}
        </AnimatePresence>

        {favorites.length === 0 && (
          <p className="text-white/70 mt-20 text-center text-caption1">
            즐겨찾기 항목이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
