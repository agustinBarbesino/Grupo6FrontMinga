import { useEffect } from "react";
import { Categories } from "../../store/actions/categoryActions"
import { MangasFetch } from "../../store/actions/mangasActions";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../Components/Mangas/Cards";
import { category, search } from "../../store/mangaSlice";
import { LoadingMangas } from "../Components/Mangas/LoadingMangas";
import { LoadingCategories } from "../Components/Mangas/LoadingCategories";

function Mangas(){
    const {categories} = useSelector(state=>state.categoryStore)
    const {mangas} = useSelector(state=>state.mangasStore)
    const mangasStore = useSelector(state=>state.mangasStore)
    const {searchM} = useSelector((state=>state.mangasFilterStore))
    const {categoryM} = useSelector((state=>state.mangasFilterStore))

    const loading = mangasStore.loading
    console.log(loading);
    
    

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
          console.log(data);
          
        return(
          <>
          {
            
            
            data?.map(m=><Card category={m.category_id.name} name={m.title} image={m.cover_photo} id={m._id}></Card>)
           
           }
          </>
        )}else{
          return(<>
              <p className="notFoundM">Sorry, we couldn't find what you were looking for.</p>
      
          </>)
        }
        
      }


    useEffect(()=>{
        dispatch(Categories())
        dispatch(MangasFetch())
    },[])
  
    
    return(
    <>
    <main>
        <img className="absolute imageGirl object-cover w-full" src="https://s3-alpha-sig.figma.com/img/f0d0/3e80/2ae29b0afaf84c3dc0f77973947cfb6b?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jM4YzCS2maTpYLKMLSX7l3-HbMuW6kkY3prbqcR2D3X~W4yKcLlQs~O1XgA~DP7X2-6HvXTgmCTdp1ZzChQvLzzWIvki1FjUETKsL6KEoQhs-RuTSWXela6gcgTLsmBVx5sg9wtD585MquSDbR0uuDRgjJFOXrD7cLXhjXCChCV3nLEDw1BRiFr7bV8ZyQ-WXXc41BzB242phZNuOyURY8WRGTiuoeoKrIiT9t0rQJsIp1dPwQIpByamNfMKIvIzF2aKscBdIE2D-5J1pn5RIglF3EkbQurznjo~vWOfvoX8VFEyaCYlbcljHy-IWBFHu0U0M6sy~d~H5ITi3HXG2g__" alt="" />

        <div className="containerSearch">
            <h1 className="titleMangas">Mangas</h1>
            <div className="searchBar">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                    <circle className="stroke" cx="16.9582" cy="16.9584" r="10.7917" stroke="#999999" stroke-width="2"/>
                    <path className="stroke" d="M30.8335 30.8333L26.2085 26.2083" stroke="#999999" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            
                <input type="text" className="" placeholder="Find your manga here" value={searchM} onChange={e=>dispatch(search({searchM:e.target.value}))} />
            </div>
            
        </div>
        <div className="mangas w-11/12">
           <div className="categories">
            {
                !loading?<button className="all" value={"all"} onClick={e=>dispatch(category({categoryM:e.target.value}))}>All</button>
                :console.log("nada")
                
            }
             {
             
             !loading?categories.map(c=><button value={c.name} className={c.name} onClick={e=>dispatch(category({categoryM:e.target.value}))}>{c.name}</button>)
            :<LoadingCategories></LoadingCategories>
            }
           </div>
           <div className="mangasCards">
            {
            !loading?<PlaceCards mangas={mangas} text={searchM} category={categoryM}></PlaceCards>
            :<LoadingMangas></LoadingMangas>
            
            
            }
             
           </div>
        </div>
        
    </main>
    </>
    )
  
}

export default Mangas
