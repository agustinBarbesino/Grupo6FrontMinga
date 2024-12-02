
function Card({category,name,image}){
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
     <div className="cardM relative">
                <div className="line absolute" style={{backgroundColor:hexColor,top: 24,left: 2,width:5}}></div>
                <div className="textM absolute">
                   <p className="titleM">{name}</p>
                   <p style={{color:hexColor,fontSize:15}} className="type">Type</p>
                </div>
                <button className="readM absolute">Read</button>
                <img className="imageM absolute" src={image}alt="" />
     </div>
    </>)
}

export {Card}