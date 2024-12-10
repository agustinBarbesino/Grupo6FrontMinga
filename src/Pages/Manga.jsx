import { ChapterInfo } from "../Components/Chapters/ChapterInfo";
import { Chapter } from "../Components/Chapters/Chapter";
import { Chapter2 } from "../Components/Chapters/Chapter2";
import { ChapterFetch } from "../store/actions/mangaActions";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectIsDarkMode } from '../store/actions/darkModeActions';
import '../Components/Mangas/mangaPages.css';

function Manga() {
  const isDarkMode = useSelector(selectIsDarkMode);
  const [classInfo, setClassInfo] = useState(
    "w-[50%] h-full rounded-[20px] bg-gradient-to-r from-[#F9A8D4] to-[#F472B6] dark:from-[#831843] dark:to-[#be185d] z-[0] transition-all duration-300 translate-x-0 absolute"
  );
  const [colorButton, setColorButton] = useState({ color: "#FFFFFF", boolean: true });
  const [colorButton2, setColorButton2] = useState({ color: isDarkMode ? "#9D9D9D" : "#9D9D9D", boolean: false });
  const { chapters } = useSelector(state => state.chapters);
  
  const params = new URLSearchParams(window.location.search);
  const image = params.get("image");
  const name = params.get("name");
  const author = params.get("autor");
  const authorId = params.get("autorId");
  const category = params.get("category");
  const mangaId = params.get("mangaId");
  const descp = params.get("descp");
  const authorSign = JSON.parse(localStorage.getItem("user"));
  const authorCompany = authorSign.author_id || authorSign.company_id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ChapterFetch());
  }, []);

  const mangaChapters = chapters.filter(c => c.manga_id?._id == mangaId);

  function buttonInfoLeft() {
    setColorButton({ color: "#FFFFFF", boolean: true });
    setColorButton2({ color: isDarkMode ? "#9D9D9D" : "#9D9D9D", boolean: false });
    setClassInfo(
      "w-[50%] h-full rounded-[20px] z-[0] bg-gradient-to-r from-[#F9A8D4] to-[#F472B6] dark:from-[#831843] dark:to-[#be185d] z-[-1] transition-all duration-300 translate-x-0 absolute"
    );
  }

  function buttonInfoRight() {
    setColorButton2({ color: "#FFFFFF", boolean: true });
    setColorButton({ color: isDarkMode ? "#9D9D9D" : "#9D9D9D", boolean: false });
    setClassInfo(
      "w-[50%] h-full rounded-[20px] z-[0] bg-gradient-to-r from-[#F9A8D4] to-[#F472B6] dark:from-[#831843] dark:to-[#be185d] z-[-1] transition-all duration-300 translate-x-full absolute"
    );
  }

  return (
    <div className={`bgColor flex-wrap flex justify-center transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : ''}`}>
      <div className="mb-16 p-2 pt-16 flex boxDatos">
        {authorCompany == authorId && (
          <p className="mesagge text-emerald-600 dark:text-emerald-400 transition-colors duration-300">
            You are the author of this Manga!
          </p>
        )}
        
        <img
          className="maxTablets w-full h-[260px] object-cover rounded-[8px] shadow-md dark:shadow-none transition-all duration-300"
          src={image}
          alt={`${name} cover`}
        />

        {colorButton.boolean ? (
          <ChapterInfo name={name} author={author} category={category} mangaId={mangaId} />
        ) : (
          <p className={`textChapBox text-center font-montserrat text-[18px] pt-4 font-normal transition-colors duration-300 
            ${isDarkMode ? 'text-gray-200' : 'text-[#222222]'}`}>
            Chapters
          </p>
        )}

        <div className="buttonMangaBox">
          <div className="minW h-[28px] rounded-[20px] flex mt-[1.5rem] shadow-[0_0px_7px_0px_rgba(0,0,0,0.15)] dark:shadow-[0_0px_7px_0px_rgba(0,0,0,0.3)] relative transition-all duration-300">
            <div className={classInfo}></div>
            <button 
              style={{ color: colorButton.color }} 
              onClick={buttonInfoLeft} 
              className="w-[50%] rounded-[20px] text-[10px] z-[1] font-montserrat font-normal text-center transition-all duration-300"
            >
              Manga
            </button>
            <button 
              style={{ color: colorButton2.color }} 
              onClick={buttonInfoRight} 
              className="w-[50%] z-[1] rounded-[20px] text-[10px] font-montserrat font-normal text-center transition-all duration-300"
            >
              Chapters
            </button>
          </div>

          {colorButton.boolean ? (
            <p className={`p-4 font-montserrat text-[10px] font-normal transition-colors duration-300
              ${isDarkMode ? 'text-gray-300' : 'text-[#424242]'}`}>
              {descp}
            </p>
          ) : (
            <div className="chapterBox">
              {authorCompany == authorId 
                ? mangaChapters.map(c => (
                    <Chapter2 
                      key={c._id}
                      title={c.title} 
                      pages={c.pages.length} 
                      mangaId={c._id} 
                      idC={mangaId} 
                      image={image}
                    />
                  ))
                : mangaChapters.map(c => (
                    <Chapter 
                      key={c._id}
                      title={c.title} 
                      pages={c.pages.length} 
                      mangaId={c._id} 
                      image={image}
                    />
                  ))
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Manga;