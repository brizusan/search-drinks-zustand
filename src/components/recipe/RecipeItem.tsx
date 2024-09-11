import { useAppStore } from "../../stores/useAppStore";
import { Recipe } from "../../types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type RecipeItemProps = {
  recipe: Recipe;
};

export const RecipeItem = ({ recipe }: RecipeItemProps) => {
  const fetchRecipeDetail = useAppStore((state) => state.fetchRecipeDetail);

  return (
    <div className="rounded-lg bg-white py-6 px-8 shadow-md max-w-[400px] mx-auto space-y-3 overflow-hidden">
      <div>
        <LazyLoadImage
          placeholderSrc={recipe.strDrinkThumb}
          src={recipe.strDrinkThumb}
          alt={`receta de bebida ${recipe.strDrink}`}
          effect="blur"
          wrapperProps={{
            style: { transitionDelay: "1s"  },
          }}
          className="w-full rounded-lg hover:rotate-6 hover:scale-110 border"
        />
      </div>
      <h2 className="text-2xl font-bold text-center mt-4 text-ellipsis overflow-hidden">
        {recipe.strDrink}
      </h2>
      <div>
        <button
          onClick={() => fetchRecipeDetail(recipe.idDrink)}
          className="py-2 w-full capitalize font-semibold
         bg-amber-500 hover:tracking-widest hover:bg-amber-600 text-white transition-all rounded shadow-amber-600 shadow"
        >
          mas detalles
        </button>
      </div>
    </div>
  );
};
