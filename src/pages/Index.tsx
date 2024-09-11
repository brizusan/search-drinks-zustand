import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import { Modal, RecipeItem } from "../components";

export default  function Index() {
  const recipes = useAppStore((state) => state.recipes);

  const isEmpty = useMemo(() => recipes.drinks.length === 0, [recipes]);

  if (isEmpty)
    return (
      <h1 className="text-center text-5xl font-bold text-slate-700">
        Realizar una busqueda
      </h1>
    );

  return (
    <>
      <section>
        <h1 className="text-center text-5xl font-bold text-indigo-500">
          Resultados de busqueda
        </h1>

        <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recipes.drinks.map((recipe) => (
            <RecipeItem key={recipe.idDrink} recipe={recipe} />
          ))}
        </section>
        <Modal />
      </section>
    </>
  );
};


