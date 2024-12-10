
import './mangaPages.css'
import { useNavigate } from "react-router-dom"

function Card({category,name,image,id,autor,description,autorId}){
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

    const navigate = useNavigate()
               
                   
    function manga(id){
        navigate(`/manga?category=${category}&name=${name}&image=${image}&autor=${autor}&mangaId=${id}&descp=${description}&autorId=${autorId}`)        
    }
    
    return(<>
     <div className="cardM relative w-[362px] h-[168px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)] rounded-[10px] border border-[rgba(0,0,0,0.05)] bg-white">
                <div className="line h-[120px] absolute" style={{backgroundColor:hexColor,top: 24,left: 2,width:5}}></div>
                <div className="textM absolute w-[172px] h-[39px]  top-[60px] left-[18px] gap-1 font-semibold text-black">
                   <p className="leading-[20px]">{name}</p>
                   <p style={{color:hexColor,fontSize:15}} className="type">{category}</p>
                </div>
                <button className="readM absolute" onClick={()=>{manga(id)}}>Read</button>
                <img className="imageM absolute" src={image}alt="" />
     </div>
    </>)
}

export {Card}