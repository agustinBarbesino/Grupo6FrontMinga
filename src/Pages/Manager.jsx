import { useEffect } from "react";
import { fetchCategories } from "../store/actions/categoryActions"
import { MangasFetch } from "../store/actions/mangasActions";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../Components/Manager/Cards";
import { category, search } from "../store/mangaSlice";
import { LoadingMangas } from "../Components/Mangas/LoadingMangas";
import { LoadingCategories } from "../Components/Mangas/LoadingCategories";
import '../Components/Mangas/mangaPages.css';


function Manager(){
    const {categories} = useSelector(state=>state.categories)
    const {mangas} = useSelector(state=>state.mangasStore)
    const mangasStore = useSelector(state=>state.mangasStore)
    const {categoryM} = useSelector((state=>state.mangasFilterStore))
    const loading = mangasStore.loading

    const params = new URLSearchParams(window.location.search)
   const idAuthor = params.get("idAuthor")
   const nameAuthor = params.get("nameAuthor")
    
    

    const dispatch = useDispatch()
    
    function PlaceCards({mangas, category}){
        let data=mangas?.filter(c=>{ 
          let value1=category.toLowerCase()
          let value2=c.company_id?._id||c.author_id?._id

          let filt1=c.category_id.name.toLowerCase()
          let filt2=idAuthor

          
          
          if(value1=="all"){
            return filt2.startsWith(value2)
          }else{
            return filt1.startsWith(value1) && filt2.startsWith(value2)
              
          }
          
            
         })
        if(data?.length!=0){
          console.log(data);
          
        return(
          <>
          {
      
            data?.map(m=><Card category={m.category_id.name} name={m.title} image={m.cover_photo} id={m._id} autor={m.author_id?.name||m.company_id?.name}></Card>)
           
           }
          </>
        )}else{
          return(<>
              <p className="text-[#F472B6] py-28 text-center w-full text-[1.3rem] font-montserrat font-bold">You don't have any manga of this type</p>
      
          </>)
        }
        
      }


    useEffect(()=>{
        dispatch(fetchCategories())
        dispatch(MangasFetch())
    },[])
  
    
    return(
    <>
   
    <div className=" bodyManga flex-wrap flex justify-center  font-sans text-white">
        <img className="absolute imageGirl object-cover w-full filter brightness-50" src="https://s3-alpha-sig.figma.com/img/b3d2/1981/f49a850ffc6520d4e5bbb1e113008d97?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=J~nxkbfD0o1AXMvETNOBuexBhAMP~M4w88pk8vIrcfE63zLAhsZ8Ndz5Uor0vO~p7KOvRnoG1tzPuRwBXENsU0aCPkEC96rq8NE83ibN9kAmORcA8PSPzn3nnQQEckVFrxX9eIPJEDuIXutUVQnHvlqCV-0N8Jz84XIBLeUr49akZOO6BfaiGsbRNETWcSiV2Lx6ka-n5yZMW4EHC9t2XWX~R3~NCKEF5dLmeZ2552-xpuNlLeH~9VFYTMY51KgXi4gC7O7jsruQJr8JVbLfD7SBFQ60BNbdRpBR6C38f3vth3SHyP0a4XLcIWk~bM2W8Edr10BTSCqDuKRgxDAhZA__" alt="" />

        <div className="containerSearch flex flex-row flex-wrap justify-center content-center items-end">
            <h1 className="titleMangas font-montserrat font-bold text-center pb-16 w-full">{nameAuthor}</h1>
            
        </div>
        <div className="mangas w-11/12 flex justify-center flex-wrap mt-8 max-w-[1400px]">
           <div className="categories flex w-full max-w-[894px]">
            {
                !loading?<button className="all px-3 py-2 rounded-full font-roboto font-bold text-xs" value={"all"} onClick={e=>dispatch(category({categoryM:e.target.value}))}>All</button>
                :console.log("nada")
                
            }
             {
             
             !loading?categories.map(c=><button value={c.name} className={`${c.name} px-3 py-2 rounded-full font-roboto font-bold text-xs`} onClick={e=>dispatch(category({categoryM:e.target.value}))}>{c.name}</button>)
            :<LoadingCategories></LoadingCategories>
            }
           </div>
           <div className="flex w-full max-w-[840px] mt-8 flex-wrap gap-8 justify-between">
            {
            !loading?<PlaceCards mangas={mangas} category={categoryM} ></PlaceCards>
            :<LoadingMangas></LoadingMangas>
            
            
            }
             
           </div>
        </div>
        
    </div>
   
    </>
    )
  
}

export default Manager
