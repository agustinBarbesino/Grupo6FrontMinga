import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { fetchCategories } from "../store/actions/categoryActions"
import { MangasFetch } from "../store/actions/mangasActions";
import { AuthorsFetch } from "../store/actions/authorsActions";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../Components/Manager/Cards";
import { category } from "../store/mangaSlice";
import { LoadingMangas } from "../Components/Mangas/LoadingMangas";
import { LoadingCategories } from "../Components/Mangas/LoadingCategories";
import { selectIsDarkMode } from '../store/actions/darkModeActions';
import '../Components/Mangas/mangaPages.css';

function Manager() {
  const { categories } = useSelector(state => state.categories)
  const { mangas } = useSelector(state => state.mangasStore)
  const authors = useSelector(state => state.authors.authores)
  const mangasStore = useSelector(state => state.mangasStore)
  const { categoryM } = useSelector((state => state.mangasFilterStore))
  const isDarkMode = useSelector(selectIsDarkMode);
  const loading = mangasStore.loading
  const navigate = useNavigate()

  const idAuthor = JSON.parse(localStorage.getItem("user"))
  const nameAuthorBase = authors.filter(e => e._id == idAuthor.author_id || idAuthor.company_id)
  let nameAuthor = nameAuthorBase[0]?.name
  const dispatch = useDispatch()

  function PlaceCards({ mangas, category }) {
    let data = mangas?.filter(c => {
      let value1 = category.toLowerCase()
      let value2 = c.company_id?._id || c.author_id?._id
      let filt1 = c.category_id.name.toLowerCase()
      let filt2 = idAuthor.author_id || idAuthor.company_id

      if (value1 == "all") {
        return filt2.startsWith(value2)
      } else {
        return filt1.startsWith(value1) && filt2.startsWith(value2)
      }
    })

    if (data?.length != 0) {
      return (
        <>
          {data?.map(m => 
            <Card 
              category={m.category_id.name} 
              name={m.title} 
              image={m.cover_photo} 
              id={m._id} 
              autor={m.author_id?.name || m.company_id?.name}
            />
          )}
        </>
      )
    } else {
      return (
        <p className="text-rose-dark dark:text-rose-light py-28 text-center w-full text-[1.3rem] font-montserrat font-bold transition-colors duration-300">
          You don't have any manga of this type
        </p>
      )
    }
  }

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(MangasFetch())
    dispatch(AuthorsFetch())
  }, [])

  function newManga() {
    navigate(`/newManga`)
  }

  return (
    <div className={`bodyManga flex-wrap flex justify-center font-sans text-white ${isDarkMode ? 'dark' : ''}`}>
      <img 
        className="absolute imageGirl object-cover w-full filter brightness-50 dark:brightness-40 transition-all duration-300" 
        src="https://s3-alpha-sig.figma.com/img/b3d2/1981/f49a850ffc6520d4e5bbb1e113008d97?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=J~nxkbfD0o1AXMvETNOBuexBhAMP~M4w88pk8vIrcfE63zLAhsZ8Ndz5Uor0vO~p7KOvRnoG1tzPuRwBXENsU0aCPkEC96rq8NE83ibN9kAmORcA8PSPzn3nnQQEckVFrxX9eIPJEDuIXutUVQnHvlqCV-0N8Jz84XIBLeUr49akZOO6BfaiGsbRNETWcSiV2Lx6ka-n5yZMW4EHC9t2XWX~R3~NCKEF5dLmeZ2552-xpuNlLeH~9VFYTMY51KgXi4gC7O7jsruQJr8JVbLfD7SBFQ60BNbdRpBR6C38f3vth3SHyP0a4XLcIWk~bM2W8Edr10BTSCqDuKRgxDAhZA__" 
        alt="" 
      />

      <div className="containerSearch flex flex-row flex-wrap justify-center content-center items-end">
        <h1 className="titleMangas font-montserrat font-bold text-center pb-16 w-full dark:text-gray-200 transition-colors duration-300">
          {nameAuthor}
        </h1>
      </div>

      <div className="mangas w-11/12 flex justify-center flex-wrap mt-8 max-w-[1400px]">
        <div className="categories flex w-full max-w-[894px] gap-2">
          {!loading && 
            <button 
              className="all px-3 py-2 rounded-full font-roboto font-bold text-xs transition-colors duration-300" 
              value="all" 
              onClick={e => dispatch(category({categoryM: e.target.value}))}
            >
              All
            </button>
          }
          {!loading ? 
            categories.map(c => 
              <button 
                key={c.name}
                value={c.name} 
                className={`${c.name} px-3 py-2 rounded-full font-roboto font-bold text-xs transition-colors duration-300`} 
                onClick={e => dispatch(category({categoryM: e.target.value}))}
              >
                {c.name}
              </button>
            )
            : <LoadingCategories />
          }
          <button 
            onClick={newManga} 
            className="newMangaCat px-3 py-2 rounded-full font-roboto font-bold text-xs transition-colors duration-300 hover:opacity-90
              dark:bg-emerald-700 dark:hover:bg-emerald-600"
          >
            + New Manga
          </button>
        </div>

        <div className="flex w-full max-w-[840px] mt-8 flex-wrap gap-8 justify-between">
          {!loading ? 
            <PlaceCards mangas={mangas} category={categoryM} />
            : <LoadingMangas />
          }
        </div>
      </div>
    </div>
  )
}

export default Manager