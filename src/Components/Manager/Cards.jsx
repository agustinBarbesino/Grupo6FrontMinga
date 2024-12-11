import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { setShowDeleteModal, setShowDeletedModal, deleteManga, setTitle } from '../../store/actions/editActions'
import { selectIsDarkMode } from '../../store/actions/darkModeActions'
import '../Mangas/mangaPages.css'

function Card({ category, name, image, id, autor }) {
    const isDarkMode = useSelector(selectIsDarkMode);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { showDeleteModal, showDeletedModal, loadingDelete, deleteSuccess, title } = useSelector((state) => state.editMangas)

    // Colores para modo claro y oscuro
    const colors = {
        Shonen: {
            light: "#F472B6",
            dark: "#be185d"
        },
        Seinen: {
            light: "#F97316",
            dark: "#c2410c"
        },
        Shojo: {
            light: "#00BA88",
            dark: "#047857"
        },
        Kodomo: {
            light: "#8883F0",
            dark: "#6366f1"
        }
    };

    const hexColor = isDarkMode ? colors[category]?.dark : colors[category]?.light;

    function manga() {
        navigate(`/editManga/${name}`)
    }
    
    function newChapter() {
        navigate(`/newChapter/${id}`)
    }

    function titleSet() {
        dispatch(setShowDeleteModal(true))
        dispatch(setTitle(name))
    }

    useEffect(() => {
        if (deleteSuccess) {
            dispatch(setShowDeleteModal(false))
            dispatch(setShowDeletedModal(true))
        }
    }, [deleteSuccess])

    return (
        <>
            <div className={`cardM relative w-[362px] h-[168px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)] 
                rounded-[10px] border border-[rgba(0,0,0,0.05)] transition-colors duration-300
                ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                
                <div className='iconos'>
                    <button 
                        onClick={newChapter}
                        className="transition-transform duration-300 hover:scale-110"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 100 100">
                            <line x1="50" y1="25" x2="50" y2="75" stroke={isDarkMode ? "#fff" : "#222222"} strokeWidth="10" strokeLinecap="round" />
                            <line x1="25" y1="50" x2="75" y2="50" stroke={isDarkMode ? "#fff" : "#222222"} strokeWidth="10" strokeLinecap="round" />
                        </svg>
                    </button>
                    <button 
                        onClick={manga}
                        className="transition-transform duration-300 hover:scale-110"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill={isDarkMode ? "#fff" : "#222222"} viewBox="0 0 24 24" width="8px" height="8px">
                            <path d="M15.5 5.64L18.36 8.5c.293.293.293.768 0 1.061L6.967 20.953c-.098.098-.222.166-.357.197l-3.7.84C2.85 22 2.8 22.01 2.74 22.01c-.19 0-.38-.08-.53-.22-.18-.19-.25-.45-.2-.7l.839-3.696C2.88 17.256 2.95 17.13 3.05 17.03L14.44 5.64C14.733 5.347 15.207 5.347 15.5 5.64zM21.99 5.52c.03.24-.05.47-.22.63l-1.29 1.29c-.293.293-.768.293-1.061 0L16.56 4.58c-.293-.293-.293-.768 0-1.061l1.29-1.29c.16-.17.4-.25.62-.22.14.02 1.33.2 2.32 1.2C21.79 4.2 21.97 5.39 21.99 5.52z" />
                        </svg>
                    </button>
                </div>

                <div 
                    className="line h-[120px] absolute transition-colors duration-300" 
                    style={{
                        backgroundColor: hexColor,
                        top: 24,
                        left: 2,
                        width: 5
                    }}
                />

                <div className={`textM absolute w-[172px] h-[39px] top-[60px] left-[18px] gap-1 font-semibold
                    transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-black'}`}>
                    <p className="leading-[20px]">{name}</p>
                    <p 
                        style={{color: hexColor, fontSize: 15}} 
                        className="type transition-colors duration-300"
                    >
                        {category}
                    </p>
                </div>

                <button 
                    className={`editM absolute transition-all duration-300 hover:opacity-90
                        ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : ''}`}
                    onClick={manga}
                >
                    EDIT
                </button>

                <button 
                    className={`deleteM absolute transition-all duration-300 hover:opacity-90
                        ${isDarkMode ? 'bg-red-900 text-gray-200 hover:bg-red-800' : ''}`}
                    onClick={titleSet}
                >
                    DELETE
                </button>

                <img 
                    className="imageM absolute transition-transform duration-300 hover:scale-[1.02]" 
                    src={image} 
                    alt={name}
                />
            </div>

            {/* Modal de confirmación de eliminación */}
            {showDeleteModal && title && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className={`rounded-lg p-6 max-w-sm w-full transition-colors duration-300
                        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <h3 className={`text-lg font-medium mb-4 text-center transition-colors duration-300
                            ${isDarkMode ? 'text-gray-200' : 'text-black'}`}>
                            Are you sure you want to delete "{title}"?
                        </h3>
                        <hr className={`my-4 transition-colors duration-300 
                            ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} />
                        <div className="flex items-center">
                            <button
                                onClick={() => {
                                    dispatch(deleteManga({title}))
                                    window.location.reload()
                                }}
                                className={`flex-1 py-2 transition-colors duration-300
                                    ${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-600'}`}
                            >
                                {loadingDelete ? "Deleting..." : "Yes, I'm sure"}
                            </button>
                            <div className={`w-px h-8 mx-4 transition-colors duration-300
                                ${isDarkMode ? 'bg-gray-700' : 'bg-gray-400'}`} />
                            <button
                                onClick={() => dispatch(setShowDeleteModal(false))}
                                className={`flex-1 py-2 transition-colors duration-300
                                    ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-600'}`}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de confirmación de eliminación exitosa */}
            {showDeletedModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className={`rounded-lg p-6 max-w-sm w-full transition-colors duration-300
                        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <h3 className={`text-lg font-medium mb-4 text-center transition-colors duration-300
                            ${isDarkMode ? 'text-gray-200' : 'text-black'}`}>
                            Your manga is deleted!
                        </h3>
                        <hr className={`my-4 transition-colors duration-300 
                            ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} />
                        <button
                            onClick={() => dispatch(setShowDeletedModal(false))}
                            className={`w-full py-2 transition-colors duration-300
                                ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-600'}`}
                        >
                            <NavLink to={'/manager'}> Accept</NavLink>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export { Card }