import { useEffect } from "react";
import { fetchCategories } from "../store/actions/categoryActions"
import { MangasFetch } from "../store/actions/mangasActions";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../Components/Mangas/Cards";
import { category, search } from "../store/mangaSlice";
import { LoadingMangas } from "../Components/Mangas/LoadingMangas";
import { LoadingCategories } from "../Components/Mangas/LoadingCategories";
import { selectIsDarkMode } from '../store/actions/darkModeActions';
import imgMangas from "../assets/Manga.jpeg"
import '../Components/Mangas/mangaPages.css';

function Mangas(){
    const {categories} = useSelector(state=>state.categories)
    const {mangas} = useSelector(state=>state.mangasStore)
    const mangasStore = useSelector(state=>state.mangasStore)
    const {searchM} = useSelector((state=>state.mangasFilterStore))
    const {categoryM} = useSelector((state=>state.mangasFilterStore))
    const isDarkMode = useSelector(selectIsDarkMode);
    const loading = mangasStore.loading
    
    const dispatch = useDispatch()
    
    function PlaceCards({mangas, text, category}){
        let data=mangas?.filter(c=>{
          let value1=text.toLowerCase()
          let value2=category.toLowerCase()
          let filt1=c.title.toLowerCase()
          let filt2=c.category_id.name.toLowerCase()
          
          if(value2=="all"){
            return filt1.startsWith(value1)
          }else{
            return filt1.startsWith(value1) && filt2.startsWith(value2)
          }
        })
        
        if(data?.length!=0){
          return(
            <>
              {data?.map(m=>
                <Card 
                  category={m.category_id.name} 
                  name={m.title} 
                  image={m.cover_photo} 
                  id={m._id} 
                  autor={m.author_id?.name||m.company_id?.name} 
                  autorId={m?.author_id?._id||m?.company_id?._id} 
                  description={m.description}
                />
              )}
            </>
          )
        } else {
          return(
            <p className="text-[#F472B6] dark:text-rose-light text-center w-full text-[1.3rem] font-montserrat font-bold">
              Sorry, we couldn't find what you were looking for.
            </p>
          )
        }
    }

    useEffect(()=>{
        dispatch(fetchCategories())
        dispatch(MangasFetch())
    },[])
  
    return(
      <div className={`bodyManga flex-wrap flex justify-center font-sans text-white ${isDarkMode ? 'dark' : ''}`}>
        <img 
          className="absolute imageGirl object-cover w-full filter brightness-50" 
          src={imgMangas}
          alt="" 
        />

        <div className="containerSearch flex flex-row flex-wrap justify-center content-center items-end">
            <h1 className="titleMangas font-montserrat font-bold text-center pb-16 w-full">Mangas</h1>
            <div className="searchBar w-full flex">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                      <circle 
                        className="stroke" 
                        cx="16.9582" 
                        cy="16.9584" 
                        r="10.7917" 
                        stroke={isDarkMode ? "#666666" : "#999999"}
                        strokeWidth="2"
                      />
                      <path 
                        className="stroke" 
                        d="M30.8335 30.8333L26.2085 26.2083" 
                        stroke={isDarkMode ? "#666666" : "#999999"}
                        strokeWidth="2" 
                        strokeLinecap="round"
                      />
                    </svg>
                </button>
            
                <input 
                  type="text" 
                  className="w-full font-roboto font-normal outline-none placeholder:font-normal" 
                  placeholder="Find your manga here" 
                  value={searchM} 
                  onChange={e=>dispatch(search({searchM:e.target.value}))} 
                />
            </div>
        </div>

        <div className="mangas w-11/12 flex justify-center flex-wrap mt-8 max-w-[1400px]">
           <div className="categories flex w-full max-w-[894px]">
            {!loading && 
              <button 
                className="all px-3 py-2 rounded-full font-roboto font-bold text-xs" 
                value="all" 
                onClick={e=>dispatch(category({categoryM:e.target.value}))}
              >
                All
              </button>
            }
            {!loading ? 
              categories.map(c=>
                <button 
                  key={c.name}
                  value={c.name} 
                  className={`${c.name} px-3 py-2 rounded-full font-roboto font-bold text-xs`} 
                  onClick={e=>dispatch(category({categoryM:e.target.value}))}
                >
                  {c.name}
                </button>
              )
              : <LoadingCategories />
            }
           </div>
           <div className="flex w-full max-w-[840px] mt-8 flex-wrap gap-8 justify-between">
            {!loading ? 
              <PlaceCards mangas={mangas} text={searchM} category={categoryM} />
              : <LoadingMangas />
            }
           </div>
        </div>
      </div>
    )
}

export default Mangas