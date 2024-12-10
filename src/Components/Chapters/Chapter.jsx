import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import { selectIsDarkMode } from '../../store/actions/darkModeActions';

function Chapter({mangaId, image, title, pages}){
  const navigate = useNavigate();
  const isDarkMode = useSelector(selectIsDarkMode);
    
  return(
    <div className="flex flex-wrap py-2 items-center justify-center">
      <div className="w-full flex flex-nowrap items-center justify-center">
        <img 
          className="w-[63px] h-[57px] object-cover rounded-[8px] transition-transform duration-300 hover:scale-105" 
          src={image}
          alt="Portada del manga"
        />
        <div className="flex flex-wrap ml-4 w-[90px] items-start justify-between">
          <h6 className={`font-montserrat text-[16px] font-normal w-full pb-2.5 transition-colors duration-300
            ${isDarkMode ? 'text-gray-200' : 'text-black'}`}>
            {title}
          </h6>
          <img
            src="https://s3-alpha-sig.figma.com/img/c6ca/d4a8/50eb70cf6e6a2e8e874cb25836f927e4?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WL3RvPLhBMvFeAfVvm8FYxEU6lBzFEB~iUKWulNqjBsUdFMA6tqun1MTWsZCk8pUValRFSFsXIVUqrwzMXNXcfqnsVOjG-o-CvTIof2Q02YS24z5~6fx~Tvux1bSB7UzDNCYKnBcBBmAluRQxjBne9Gof4l~aPbvaH5liD183nhsAjbtunRuvaCvOMMMpefbBJ42hVU78Aoel6xShH8OCQaLyIT9SOl6y~IrxaOE9rPiAR8XwNtSUvZQgdQGqHiDhoLD9WfPNn7mYsXDxYLjsgH~zheW97FoMkOJfNU-AI5D7Vtg5iMMYrp4wS9~t133jeHdQ2RlFc10zr-B0YSmxg__"
            alt="iconComment" 
            className={`w-[25px] h-[20px] transition-opacity duration-300 
              ${isDarkMode ? 'opacity-75' : 'opacity-100'}`} 
          />
          <p className={`font-montserrat text-[13px] font-normal px-2 transition-colors duration-300
            ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
            {pages}
          </p>
        </div>
        <button 
          onClick={() => navigate(`/chapter?id=${mangaId}`)} 
          className="w-[91px] rounded-full h-[44px] bg-gradient-to-r from-[#F9A8D4] to-[#F472B6] 
            dark:from-[#831843] dark:to-[#be185d] font-montserrat text-[15px] font-bold text-white 
            transition-all duration-300 hover:opacity-90 hover:scale-105">
          Read
        </button>
      </div>
    </div>
  )
}

export { Chapter }