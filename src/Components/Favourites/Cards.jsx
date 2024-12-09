
import '../Mangas/mangaPages.css'
import { reactionsCreate } from '../../store/actions/reactionsCreateActions'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
function Card({category,name,image,id,autor,description,autorId,companyId,reactId,handleElim}){
    const dispatch = useDispatch()
    let authorSign = JSON.parse(localStorage.getItem("user"))
    console.log(authorSign);
    
    let hexColor
                   switch(category){
                       case "Shonen":
                           hexColor="#F472B6"
                           break
                       case "Seinen":
                           hexColor="#F97316"
                           break
                       case "Shojo":
                           hexColor="#00BA88"
                           break
                       case "Kodomo":
                           hexColor="#8883F0"
                           break   
                   }
               
   
    
    return(<>
     <div className="cardM relative w-[362px] h-[168px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)] rounded-[10px] border border-[rgba(0,0,0,0.05)] bg-white">
     <div className='iconos'>   
     <button style={{transform:"rotate(45deg)"}} onClick={()=>{handleElim(id,authorSign)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 100 100">
                    
                    <line x1="50" y1="25" x2="50" y2="75" stroke="#222222" stroke-width="10" stroke-linecap="round"/>
                    <line x1="25" y1="50" x2="75" y2="50" stroke="#222222" stroke-width="10" stroke-linecap="round"/>
                  </svg>
                  
                    </button>
                    </div>

                <div className="line h-[120px] absolute" style={{backgroundColor:hexColor,top: 24,left: 2,width:5}}></div>
                <div className="textM absolute w-[172px] h-[39px]  top-[60px] left-[18px] gap-1 font-semibold text-black">
                   <p className="leading-[20px]">{name}</p>
                   <p style={{color:hexColor,fontSize:15}} className="type">{category}</p>
                </div>
                <img className="imageM absolute" src={image}alt="" />
     </div>
    </>)
}

export {Card}