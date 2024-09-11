import { z } from "zod";

export interface Search{
  ingredient: string,
  category:string
}

export const CategoriesResponseSchema = z.object({
  drinks: z.array(
    z.object({
      strCategory: z.string(),
    })
  ),
});

const RecipeSchema = z.object({
  idDrink: z.string(),
  strDrink: z.string(),
  strDrinkThumb: z.string(),
})

export const RecipesApiResponseSchema = z.object({
  drinks: z.array(
    RecipeSchema)
})


export const RecipeDetailApiSchema = z.object({
  idDrink: z.string(),
  strCategory: z.string(),
  strDrink: z.string(),
  strDrinkThumb: z.string(),
  strInstructions : z.string(),
  strIngredient1 : z.string().optional(),
  strIngredient2 : z.string().nullable(),
  strIngredient3 : z.string().nullable(),
  strIngredient4 : z.string().nullable(),
  strIngredient5 : z.string().nullable(),
  strMeasure1 : z.string().nullable(),
  strMeasure2 : z.string().nullable(),
  strMeasure3 : z.string().nullable(),
  strMeasure4 : z.string().nullable(),
  strMeasure5 : z.string().nullable(),
})


export type Categories = z.infer<typeof CategoriesResponseSchema>;
export type Recipes = z.infer<typeof RecipesApiResponseSchema>;
export type Recipe= z.infer<typeof RecipeSchema>;
export type RecipeDetail = z.infer<typeof RecipeDetailApiSchema>;




