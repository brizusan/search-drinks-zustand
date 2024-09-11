import { StateCreator } from "zustand";
import { Recipe } from "../types";

export type FavoriteSliceType = {
  favorites: Recipe[];
  toogleFavorite: (recipe: Recipe) => void;
  isFavorite: (id: Recipe["idDrink"]) => boolean;
  isLoadStorage:()=>void
};

export const createFavoriteSlice: StateCreator<FavoriteSliceType> = (
  set,
  get
) => ({
  favorites: [],
  toogleFavorite: (recipe) => {
    if (get().isFavorite(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      }));
    } else {
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));
    }

    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  isFavorite: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },

  isLoadStorage : ()=>{
    const favorites = localStorage.getItem("favorites");
    if(favorites){
      set({favorites: JSON.parse(favorites)})
    }
  }
});
