import '../Mangas/mangaPages.css'
import { reactionsCreate } from '../../store/actions/reactionsCreateActions'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsDarkMode } from '../../store/actions/darkModeActions'
import { useEffect } from 'react'

function Card({category, name, image, id, autor, description, autorId, companyId, reactId, handleElim}) {
    const dispatch = useDispatch()
    const isDarkMode = useSelector(selectIsDarkMode)
    let authorSign = JSON.parse(localStorage.getItem("user"))

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
                     
    return (
        <div className={`cardM relative w-[362px] h-[168px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)] 
            rounded-[10px] border border-[rgba(0,0,0,0.05)] transition-colors duration-300
            ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            
            <div className='iconos'>
                <button 
                    style={{transform: "rotate(45deg)"}} 
                    onClick={() => {handleElim(id, authorSign)}}
                    className="transition-transform duration-300 hover:scale-110"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 100 100">
                        <line 
                            x1="50" y1="25" x2="50" y2="75" 
                            stroke={isDarkMode ? "#ffffff" : "#222222"} 
                            strokeWidth="10" 
                            strokeLinecap="round"
                        />
                        <line 
                            x1="25" y1="50" x2="75" y2="50" 
                            stroke={isDarkMode ? "#ffffff" : "#222222"} 
                            strokeWidth="10" 
                            strokeLinecap="round"
                        />
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
                    style={{
                        color: hexColor,
                        fontSize: 15
                    }} 
                    className="type transition-colors duration-300"
                >
                    {category}
                </p>
            </div>

            <img 
                className="imageM absolute transition-transform duration-300 hover:scale-[1.02]" 
                src={image} 
                alt={name} 
            />
        </div>
    )
}

export { Card }