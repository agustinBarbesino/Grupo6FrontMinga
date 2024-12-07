import { React, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { signOut, selectUser, selectIsAuthenticated } from '../../store/actions/authActions';

function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isActive = location.pathname === '/chapter';
    const [isOpen, setIsOpen] = useState(false);
    
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);

    const handleLogout = async () => {
        try {
            await dispatch(signOut()).unwrap();
            setIsOpen(false)
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            <div className="relative flex justify-center items-center">
                <button className={`
                    z-10  
                    ${isActive ? 'text-white hover:text-gray-300' : 'text-rose-light hover:text-rose-dark'}
                    ${isOpen ? 'hidden' : 'block z-10 md:min-w-80'}
                    `}
                    onClick={() => setIsOpen(!isOpen)} aria-label="menu" >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 16L16 6M6 6l10 10" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                <nav className={`fixed flex md:justify-center md:items-center flex-col bg-pink-gradient z-50 text-white rounded shadow-lg ${isOpen ? "block z-50 top-0 left-0 min-h-screen md:min-h-40 pt-0 min-w-full md:min-w-80" : "hidden"} `} >
                    {/* despliega los datos del usuario si existe token o no */}
                    {isAuthenticated && user ? (
                        <div className="flex justify-center items-center w-full p-4 ">
                            <div className={`flex flex-row bg-opacity-20 items-center text-center md:text-left rounded text-sm sm:text-base px-4 py-2 w-full `}>
                                <img
                                    src={user.photo}
                                    alt={`${user.email}'s profile`}
                                    className="w-12 h-12 md:w-8 md:h-8 rounded-full object-cover"
                                />
                                <span className="text-sm sm:text-base text-ellipsis pl-2 text-white overflow-hidden whitespace-nowrap">
                                <NavLink to="/profile" onClick={() => setIsOpen(!isOpen)}> {user.email}</NavLink>
                                </span>
                            </div>
                            <div className="flex items-end justify-end w-1/2">
                                <button className="z-10 p-2 text-white hover:text-rose-light"
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
                            <button className="z-10 p-2 text-white hover:text-rose-dark"
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
                    <div className="flex place-content-center justify-center md:w-80 ">
                        <button onClick={() => setIsOpen(!isOpen)} className="flex place-content-center text-center items-center py-1 w-full mx-2 md:py-2 gap-2 drop-shadow text-white hover:bg-white hover:text-rose-dark rounded text-sm sm:text-base" >
                            <NavLink to="/home"> Home</NavLink>
                        </button>
                    </div>
                    <div className="flex place-content-center justify-center md:w-80 z-50">
                        <button onClick={() => setIsOpen(!isOpen)} className="flex place-content-center text-center items-center py-1 w-full mx-2 md:py-2 gap-2 drop-shadow text-white hover:bg-white hover:text-rose-dark rounded text-sm sm:text-base" >
                            <NavLink to="/mangas"> Mangas</NavLink>
                        </button>
                    </div>

                    {/* inciar/cerrar sesion */}
                    {!isAuthenticated ? (
                        <div className="flex place-content-center justify-center mb-2 md:w-80 z-50">
                            <button onClick={() => setIsOpen(!isOpen)} className="flex place-content-center text-center items-center py-1 w-full mx-2 md:py-2 gap-2 drop-shadow text-white hover:bg-white hover:text-rose-dark rounded text-sm sm:text-base" >
                                <NavLink to="/signin"> Sign In</NavLink>
                            </button>
                        </div>
                    ) : (
                        <div className="flex place-content-center justify-center ml-0 mt-0 md:mt-2 mb-2 md:w-80 z-50">
                            <button 
                                onClick={handleLogout }
                                className="flex place-content-center text-center items-center py-1 w-full mx-2 md:py-2 gap-2 drop-shadow text-white hover:bg-white hover:text-rose-dark rounded text-sm sm:text-base" 
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </nav>
            </div>
        </>
    )
}

export default NavBar