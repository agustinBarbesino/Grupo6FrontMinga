import './mangaPages.css'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import { selectIsDarkMode } from '../../store/actions/darkModeActions';

function Card({category, name, image, id, autor, description, autorId}) {
    const isDarkMode = useSelector(selectIsDarkMode);
    const navigate = useNavigate();

    // Colores para modo claro y oscuro
    const colors = {
        Shonen: {
            light: "#F472B6",
            dark: "#be185d",
            bgLight: "#FFE0DF",
            bgDark: "rgba(239, 132, 129, 0.8)"
        },
        Seinen: {
            light: "#F97316",
            dark: "#c2410c",
            bgLight: "#FFDFC8",
            bgDark: "rgba(252, 156, 87, 0.8)"
        },
        Shojo: {
            light: "#00BA88",
            dark: "#047857",
            bgLight: "#D1FBF0",
            bgDark: "rgba(0, 186, 136, 0.8)"
        },
        Kodomo: {
            light: "#6366f1",
            dark: "#818cf8", 
            bgLight: "#E0DBFF",
            bgDark: "#4338ca" 
        }
    };

    const hexColor = isDarkMode ? colors[category]?.dark : colors[category]?.light;
    const bgColor = isDarkMode ? colors[category]?.bgDark : colors[category]?.bgLight;
               
    function manga(id) {
        navigate(`/manga?category=${category}&name=${name}&image=${image}&autor=${autor}&mangaId=${id}&descp=${description}&autorId=${autorId}`)        
    }
    
    return (
        <div className={`cardM relative w-[362px] h-[168px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)] rounded-[10px] border border-[rgba(0,0,0,0.05)] transition-colors duration-300 
            ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <div 
                className="line h-[120px] absolute transition-colors duration-300" 
                style={{
                    backgroundColor: hexColor,
                    top: 24,
                    left: 2,
                    width: 5
                }}
            />
            <div className={`textM absolute w-[172px] h-[39px] top-[60px] left-[18px] gap-1 font-semibold transition-colors duration-300
                ${isDarkMode ? 'text-gray-200' : 'text-black'}`}>
                <p className="leading-[20px]">{name}</p>
                <p 
                    style={{color: hexColor}} 
                    className="type transition-colors duration-300"
                >
                    {category}
                </p>
            </div>
            <button 
                className="readM absolute transition-all duration-300 hover:opacity-90"
                onClick={() => manga(id)}
                style={{
                    backgroundColor: bgColor,
                    color: hexColor
                }}
            >
                Read
            </button>
            <img 
                className="imageM absolute transition-transform duration-300 hover:scale-[1.02]" 
                src={image} 
                alt={name}
            />
        </div>
    );
}

export { Card }