import { ChapterInfo } from "../components/ChapterInfo";
import { Chapter } from "../components/Chapter";
import { useState } from "react";

function Manga() {
  
  const [classInfo, setClassInfo] = useState("focusButton translate-x-0 absolute");
  const [colorButton, setColorButton] = useState({color:"#FFFFFF",boolean:true})
  const [colorButton2, setColorButton2] = useState({color:"#9D9D9D",boolean:false})

  
  function buttonInfoLeft(){
      setColorButton({color:"#FFFFFF",boolean:true})
      setColorButton2({color:"#9D9D9D",boolean:false})
      setClassInfo("focusButton translate-x-0 absolute")
  }
  function buttonInfoRight(){
    setColorButton2({color:"#FFFFFF",boolean:true})
    setColorButton({color:"#9D9D9D",boolean:false})
    setClassInfo("focusButton translate-x-full absolute")
}
  

  return (
    <>
      <main>
        <div className="frontPage">
          
          <img
          className="maxTablets"
            src="https://s3-alpha-sig.figma.com/img/1e23/0439/c4d53357acfdeec4cbf374415d56b867?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=USVsBTcGowbN1PZbrczRKU4sIHfvKbaoqxnPr~oZgQsgn3i8Y~YHOqZ59imvYs5DcimNEQvNtzygNDEog77Fysba-fcFy5pY9i5ZSXCe5qTja6zs~0Ad4oiSYO3DyKJb1IS0y6kNdt~kIOYN3FKK0TBCm529~4~ApimBDQ~Ou6mOU5l5kLpx2LeovUBAGEks4RHAxKjJ09N4EnCW1Jximeq-~NhbIYsAQq~e~B5FOfOMp50V8-v9mUhdq8u4QTHTOeXqD1ylY56V-IkkRiPFlCDEeiU8NsC-fIiL8A~D1iIXQJ690deGFqnUSotn~4vdEK~9UNLdsXCIFtD6dw2lnw__"
            alt="Portada del manga"
          />
          {colorButton.boolean?<ChapterInfo></ChapterInfo>:<p className="chapterTitle">Chapters</p>}
          <div className="infoAndChapters">
            <div className="buttonsInfo relative">
              <div className={classInfo}></div>
              <button style={{color:colorButton.color}} onClick={buttonInfoLeft}>Manga</button><button style={{color:colorButton2.color}} onClick={buttonInfoRight}>Chapters</button>

            </div>
            {colorButton.boolean?<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie est nec gravida dictum. Nunc dictum lectus quam, non maximus urna ornare sit amet. Aliquam id sapien in massa commodo volutpat vel vitae quam.Nunc dictum lectus quam, non maximus urna ornare sit amet. Aliquam id sapien in massa commodo volutpatc tum lectus quam, non ma.</p>:<Chapter></Chapter> }
            
           
          </div>
        </div>
      </main>
    </>
  );
}

export default Manga;
