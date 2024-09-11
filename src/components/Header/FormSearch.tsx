import { useEffect, useState } from "react";
import { useAppStore } from "../../stores/useAppStore";
import { Alerta } from "../Alerta";
import { Spinner } from "../Spinner";
import { Search } from "../../types";

export const FormSearch = () => {

  const fetchCategories = useAppStore((state) => state.fetchCategories)
  const fetchRecipes = useAppStore((state) => state.fetchRecipes)
  const categories = useAppStore((state) => state.categories)
  const loading = useAppStore((state) => state.loading)
  const showNotification = useAppStore((state) => state.showNotification)

  const [search, setSearch] = useState<Search>({
    ingredient: '',
    category: ''
  })

  const [error , setError] = useState("")

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearch({
      ...search,
      [e.target.id]: e.target.value
    })
  }


  const handleSubmit= (e:React.FormEvent)=>{
    e.preventDefault()

    if(Object.values(search).includes('')){

      setError('campos obligatorios')
      showNotification({
        message: 'campos obligatorios',
        show: true,
        error: true
      })

      return
    }
    fetchRecipes(search)
    setError('')
  
  } 

  return (
    <>
      <form 
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto md:m-0 space-y-4 p-6 bg-orange-400 rounded shadow shadow-orange-500">
        <legend className="text-center text-white text-lg font-bold">
          Busqueda de bebidas
        </legend>
        {error && <Alerta>{error}</Alerta>}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="ingredient"
            className="font-semibold text-white uppercase "
          >
            Nombre de ingrediente
          </label>
          <input
            className="py-2 px-4 rounded"
            id="ingredient"
            type="text"
            placeholder="Ej. Gin , Ginebra..."
            onChange={handleChange}
            value={search.ingredient}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="category"
            className="font-semibold text-white uppercase "
          >
            categoria
          </label>
          <select
            className="py-2 px-4 rounded text-center font-semibold text-slate-800"
            id="category"
            onChange={handleChange}
            value={search.category}
          >
            <option value=""> --- Seleccione --- </option>
            {
              categories.drinks.map((category) => (
                <option key={category.strCategory} value={category.strCategory}>
                  {category.strCategory}
                </option>
              ))
            }
          </select>
        </div>
        {
          loading && <Spinner />
        }
        <div className="flex justify-center">
          <input
            type="submit"
            value="Buscar Bebida"
            className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded cursor-pointer"
          />
        </div>
      </form>
    </>

  );
};
