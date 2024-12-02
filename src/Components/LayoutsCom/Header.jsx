

import NavBar from "./Navbar"
import { NavLink } from "react-router-dom"
import img from '../../assets/logoMinga.png'

const Header = () => {
  return (
    <>
      <header className="relative w-full bg-transparent z-50">
        <div className="flex fixed w-full justify-between font-montserrat px-2 md:px-6 py-4">
          <NavBar/>
          {/* logo */}
          <NavLink to="/Home" className="flex justify-center md:justify-end md:w-1/4">  <img src={img} className="h-auto w-16 md:w-20" alt="LogoManga" />
          </NavLink>
        </div>

      </header>
    </>
  )
}
export default Header