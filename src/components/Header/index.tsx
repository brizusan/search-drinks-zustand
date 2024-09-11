import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "/logo.svg";
import { FormSearch } from "./FormSearch";

export const Header = () => {

  const location = useLocation()

  const isHome = location.pathname === "/"


  return (
    <header className={`py-12 bg-slate-800 ${isHome ? "bg-header bg-center bg-cover" : null} `}>
      <div className="space-y-12 max-w-5xl mx-auto w-11/12 md:w-5/6 lg:w-full">
        <div className="flex justify-between items-center ">
          <Link to="/">
            <img src={logo} alt="logo cocktail drinks" className="w-28 h-28" />
          </Link>

          <nav className="flex gap-4 text-lg font-semibold text-white">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/favoritos">Favoritos</NavLink>
          </nav>
        </div>

        {
          isHome && (
           <FormSearch />
          )
        }

      </div>

     
    </header>
  );
};
