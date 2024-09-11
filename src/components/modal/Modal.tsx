import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useAppStore } from "../../stores/useAppStore";

export const Modal = () => {
  const modal = useAppStore((state) => state.modal);
  const closeModal = useAppStore((state) => state.closeModal);
  const recipeSelected = useAppStore((state) => state.recipeSelected);
  const toogleFavorite = useAppStore((state) => state.toogleFavorite);
  const isFavorite = useAppStore((state) => state.isFavorite);
  const showNotification = useAppStore((state) => state.showNotification);

  const favorite = isFavorite(recipeSelected.idDrink);

  const renderIngredients = () => {
    const ingredients: JSX.Element[] = [];

    for (let index = 1; index <= 5; index++) {
      const ingredient =
        recipeSelected[`strIngredient${index}` as keyof typeof recipeSelected];
      const measure =
        recipeSelected[`strMeasure${index}` as keyof typeof recipeSelected];
      if (ingredient && measure) {
        ingredients.push(
          <li key={index} className="list-disc ">
            <span className="font-bold">{ingredient} </span> - {""}
            {measure}
          </li>
        );
      }
    }
    return ingredients;
  };

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-4xl font-extrabold my-5 text-center"
                  >
                    {recipeSelected.strDrink}
                  </Dialog.Title>
                  <img
                    className="max-w-sm mx-auto object-cover"
                    src={recipeSelected.strDrinkThumb}
                    alt={`imagen de bebida-${recipeSelected.strDrink}`}
                  />
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5 underline underline-offset-4"
                  >
                    Ingredientes y Cantidades
                  </Dialog.Title>
                  <div className="pl-8">
                    <ul>{renderIngredients()}</ul>
                  </div>

                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5 underline underline-offset-4"
                  >
                    Instrucciones
                  </Dialog.Title>
                  <p>{recipeSelected.strInstructions}</p>

                  <div className="flex justify-between my-4 pt-6">
                    <button
                      onClick={() => {
                        toogleFavorite({
                          idDrink: recipeSelected.idDrink,
                          strDrink: recipeSelected.strDrink,
                          strDrinkThumb: recipeSelected.strDrinkThumb,
                        });
                        closeModal();
                        showNotification({
                          show: true,
                          message: favorite
                            ? "Bebida eliminada de favoritos"
                            : "Bebida agregada a favoritos",
                          error: favorite ? true : false,
                        });
                      }}
                      className={`w-[250px] ${
                        favorite
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-amber-400 hover:bg-amber-500"
                      } transition-colors py-2 rounded text-white font-semibold`}
                    >
                      {favorite
                        ? "REMOVE FROM FAVORITO"
                        : "AGREGAR A FAVORITOS"}
                    </button>
                    <button className="w-[250px] bg-indigo-300 hover:bg-indigo-400 transition-colors py-2 rounded text-white font-semibold">
                      SHARE
                    </button>
                    <button
                      className="text-red-600 absolute top-5 right-5"
                      onClick={closeModal}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-8 w-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
