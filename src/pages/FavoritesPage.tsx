import { useEffect, useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import { Modal, RecipeItem } from "../components";

export default function FavoritesPage(){

  const favorites = useAppStore((state) => state.favorites);
  const loadStorage = useAppStore((state) => state.isLoadStorage);

  const isEmpty = useMemo(() => favorites.length === 0, [favorites]);

  useEffect(() => {
    loadStorage()
  }, [loadStorage])
  

  if (isEmpty)
    return (
      <h1 className="text-center text-3xl font-bold text-red-500">
        No tenemos recetas favoritas aun
      </h1>
    );
  return (
    <section>
        <h1 className="text-center text-3xl font-bold text-indigo-500">
          Recetas favoritas
        </h1>

        <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((recipe) => (
            <RecipeItem key={recipe.idDrink} recipe={recipe} />
          ))}
        </section>
      <Modal />
      </section>
  )
}
