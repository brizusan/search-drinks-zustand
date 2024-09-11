import { create } from "zustand"
import {createRecipeSlice, RecipeSliceType} from "./recipeSlice"
import { createFavoriteSlice, FavoriteSliceType } from "./favoriteSlice"
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice"

export const useAppStore = create<RecipeSliceType & FavoriteSliceType & NotificationSliceType >((...args) => ({
  ...createRecipeSlice(...args),
  ...createFavoriteSlice(...args),
  ...createNotificationSlice(...args),
}))
