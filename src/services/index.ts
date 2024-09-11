import axios from "axios"
import { CategoriesResponseSchema, Recipe, RecipeDetailApiSchema, RecipesApiResponseSchema, Search } from "../types"
import { axiosClient } from "../api/axios"

export const getCategories = async () => {

 const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`
 const {data} = await axios.get(url)
 const respuesta = CategoriesResponseSchema.safeParse(data)
 if(respuesta.success) return respuesta.data
}

export const getRecipesBySearch = async (search:Search) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${search.category}&i=${search.ingredient}`
  const {data} = await axios.get(url)
  const resultado = RecipesApiResponseSchema.safeParse(data)
  if(resultado.success) return resultado.data
}


export const getRecipeDetail = async (id:Recipe["idDrink"]) => {
  const {data} = await axiosClient(`lookup.php?i=${id}`);
  const resultado = RecipeDetailApiSchema.safeParse(data.drinks[0])
  if(resultado.success) {
    return resultado.data
  }
}