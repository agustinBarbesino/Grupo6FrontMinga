import { React, useState } from "react"
import { NavLink } from "react-router-dom"
import img from '../../assets/logoMinga.png'

function NavBar() {
    const [isOpen, setIsOpen] = useState(false)
    const token = true
    const user = {
        email: "user1@example.com",
        password: "password123",
        photo: "https://example.com/photo1.jpg",
        role: 0,
        online: false
    }
    return (
        <>
            <header className="relative w-full bg-transparent z-50">
                <div className="flex fixed w-full justify-between font-montserrat px-2 md:px-6 py-4">

                    <div className="relative ">
                        <button className={`"z-10 p-2 text-rose-light hover:text-rose-dark ${isOpen ? "hidden" : "block z-10 min-w-80"}`}
                            onClick={() => setIsOpen(!isOpen)} aria-label="menu" >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 16L16 6M6 6l10 10" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>


                        <nav className={`absolute flex justify-center items-center flex-col bg-pink-gradient z-50 text-white rounded shadow-lg ${isOpen ? "block z-50 top-0 left-0 min-h-screen md:min-h-40 pt-0 min-w-screen md:min-w-80" : "hidden"} `} >
                            {token ? (
                                <div className="flex justify-center items-center w-full p-4 ">
                                    <div className={`flex flex-col md:flex-row  bg-opacity-20 md:items-center text-center md:text-left rounded text-sm sm:text-base px-4 py-2 w-full `}>
                                        <img
                                            src={user.photo}
                                            alt={`${user.email}'s profile`}
                                            className="w-12 h-12 md:w-8 md:h-8 rounded-full object-cover"
                                        />
                                        <span className="text-sm sm:text-base text-ellipsis text-white overflow-hidden whitespace-nowrap">
                                            {user.email}
                                        </span>
                                    </div>
                                    <div className="flex items-end justify-end w-1/2">
                                        <button className=" z-10 p-2 text-white hover:text-rose-light "
                                            onClick={() => setIsOpen(!isOpen)} aria-label="menu" >
                                            <svg className="w-8 h-8 align-" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                                                {isOpen ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 16L16 6M6 6l10 10" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16" />
                                                )}
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-start justify-start w-full">
                                    <button className=" z-10 p-2 text-white hover:text-rose-dark "
                                        onClick={() => setIsOpen(!isOpen)} aria-label="menu" >
                                        <svg className="w-8 h-8 align-" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                                            {isOpen ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 16L16 6M6 6l10 10" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16" />
                                            )}
                                        </svg>
                                    </button>
                                </div>
                            )}

                            {/* navegacion */}
                            <div className="flex place-content-center justify-center md:w-80 z-50">
                                <button className="flex place-content-center  text-center items-center py-1 w-full mx-2  md:py-2 gap-2 drop-shadow text-white hover:bg-white hover:text-rose-dark rounded text-sm sm:text-base" >
                                    <NavLink to="/home"> Home</NavLink>
                                </button>
                            </div>
                            <div className="flex place-content-center justify-center md:w-80 z-50">
                                <button className="flex place-content-center  text-center items-center py-1 w-full mx-2  md:py-2 gap-2 drop-shadow text-white hover:bg-white hover:text-rose-dark rounded text-sm sm:text-base" >
                                    <NavLink to="/mangas"> Mangas</NavLink>
                                </button>
                            </div>

                            {/* inciar/cerrar sesion */}
                            {!token ? (
                                <div className="flex place-content-center justify-center mb-2 md:w-80 z-50">
                                    <button className="flex place-content-center  text-center items-center py-1 w-full mx-2  md:py-2 gap-2 drop-shadow text-white hover:bg-white hover:text-rose-dark rounded text-sm sm:text-base" >
                                        <NavLink to="/Login"> Login</NavLink>
                                    </button>
                                </div>

                            ) : (
                                <div className="flex place-content-center justify-center ml-0  mt-0 md:mt-2 mb-2 md:w-80 z-50">
                                    <button className="flex place-content-center  text-center items-center py-1 w-full mx-2  md:py-2 gap-2 drop-shadow text-white hover:bg-white hover:text-rose-dark rounded text-sm sm:text-base" >
                                        Logout
                                    </button>
                                </div>

                            )
                            }
                        </nav>
                    </div>

                    {/* logo */}
                    <NavLink to="/Home" className="flex justify-center md:justify-end 1/2 md:w-1/4">  <img src={img} className="h-auto w-full md:w-20" alt="LogoManga" />
                    </NavLink>
                </div>

            </header>



        </>
    )
}

export default NavBar 