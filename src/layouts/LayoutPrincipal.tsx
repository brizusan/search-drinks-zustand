import {Outlet} from "react-router-dom"
import { Header, Notification } from "../components"

export const LayoutPrincipal = () => {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto py-8 w-11/12 md:w-5/6 lg:w-full">
        <Outlet />
        <Notification />
      </main>
    </>
  )
}
