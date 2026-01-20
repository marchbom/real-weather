import { normalizeAddressLabel } from "@/entities/address/lib/address";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Favorite = {
  id: string;
  label: string; // 표시용 (공백)
  raw: string; // 저장용 (하이픈)
  lat: number;
  lon: number;
  alias?: string | null; // 별칭
};

type State = {
  favorites: Favorite[];
  addFavorite: (fav: Favorite) => void;
  updateAlias: (id: string, alias: string | null) => void;
  removeFavorite: (id: string) => void;
};

export const useFavoritesStore = create<State>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (fav) =>
        set((state) => ({
          favorites: [
            {...fav,    
            label: normalizeAddressLabel(fav.label), 
          }, 
          ...state.favorites],
        })),
      updateAlias: (id, alias) =>
        set((state) => ({
          favorites: state.favorites.map((f) =>
            f.id === id ? { ...f, alias } : f,
          ),
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        })),
    }),
    { 
      name: "favorites-store",

      onRehydrateStorage: () => (state) => {
        if (state?.favorites) {
          state.favorites = state.favorites.map(fav => ({
            ...fav,
            label: normalizeAddressLabel(fav.label)
          }));
        }
      }
    },
  ),
);
