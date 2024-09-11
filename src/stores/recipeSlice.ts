import { StateCreator } from "zustand";
import {
  getCategories,
  getRecipeDetail,
  getRecipesBySearch,
} from "../services";
import type {
  Categories,
  Recipe,
  RecipeDetail,
  Recipes,
  Search,
} from "../types";

export type RecipeSliceType = {
  categories: Categories;
  recipes: Recipes;
  recipe: Recipe;
  recipeSelected: RecipeDetail;
  fetchCategories: () => Promise<void>;
  fetchRecipes: (Search: Search) => Promise<void>;
  fetchRecipeDetail: (id: Recipe["idDrink"]) => Promise<void>;
  loading: boolean;
  modal: boolean;
  closeModal: () => void;
};

export const createRecipeSlice: StateCreator<RecipeSliceType> = (set) => ({
  categories: {
    drinks: [],
  },
  recipes: {
    drinks: [],
  },
  recipe: {} as Recipe,
  recipeSelected: {} as RecipeDetail,
  loading: false,
  modal: false,

  fetchCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },

  fetchRecipes: async (search) => {
    try {
      set({ loading: true });
      set({ recipes: { drinks: [] } });
      const recipes = await getRecipesBySearch(search);
      set({ recipes });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  fetchRecipeDetail: async (id: Recipe["idDrink"]) => {
    const recipe = await getRecipeDetail(id);
    set({ recipeSelected: recipe, modal: true });
  },

  closeModal: () => {
    set({ modal: false });
  },
});
