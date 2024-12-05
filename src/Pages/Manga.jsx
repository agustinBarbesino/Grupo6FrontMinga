import { ChapterInfo } from "../Components/Chapters/ChapterInfo";
import { Chapter } from "../Components/Chapters/Chapter";
import { useState } from "react";
import '../Components/Mangas/mangaPages.css';

function Manga() {
  
  const [classInfo, setClassInfo] = useState("w-[50%] h-full rounded-[20px] bg-gradient-to-r from-[#F9A8D4] to-[#F472B6] z-[-1] transition-all duration-300 translate-x-0 absolute");
  const [colorButton, setColorButton] = useState({color:"#FFFFFF",boolean:true})
  const [colorButton2, setColorButton2] = useState({color:"#9D9D9D",boolean:false})

  
  function buttonInfoLeft(){
      setColorButton({color:"#FFFFFF",boolean:true})
      setColorButton2({color:"#9D9D9D",boolean:false})
      setClassInfo("w-[50%] h-full rounded-[20px] bg-gradient-to-r from-[#F9A8D4] to-[#F472B6] z-[-1] transition-all duration-300 translate-x-0 absolute")
  }
  function buttonInfoRight(){
    setColorButton2({color:"#FFFFFF",boolean:true})
    setColorButton({color:"#9D9D9D",boolean:false})
    setClassInfo("w-[50%] h-full rounded-[20px] bg-gradient-to-r from-[#F9A8D4] to-[#F472B6] z-[-1] transition-all duration-300 translate-x-full absolute")
}
  

  return (
    <>
      <div className="flex-wrap flex justify-center">
        <div className="w-full mb-16 min-w-[320px] p-2 pt-16 flex flex-col justify-center items-center">
          
          <img
          className="maxTablets w-full h-[260px] object-cover rounded-[8px]"
            src="https://s3-alpha-sig.figma.com/img/1e23/0439/c4d53357acfdeec4cbf374415d56b867?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=USVsBTcGowbN1PZbrczRKU4sIHfvKbaoqxnPr~oZgQsgn3i8Y~YHOqZ59imvYs5DcimNEQvNtzygNDEog77Fysba-fcFy5pY9i5ZSXCe5qTja6zs~0Ad4oiSYO3DyKJb1IS0y6kNdt~kIOYN3FKK0TBCm529~4~ApimBDQ~Ou6mOU5l5kLpx2LeovUBAGEks4RHAxKjJ09N4EnCW1Jximeq-~NhbIYsAQq~e~B5FOfOMp50V8-v9mUhdq8u4QTHTOeXqD1ylY56V-IkkRiPFlCDEeiU8NsC-fIiL8A~D1iIXQJ690deGFqnUSotn~4vdEK~9UNLdsXCIFtD6dw2lnw__"
            alt="Portada del manga"
          />
          {colorButton.boolean?<ChapterInfo></ChapterInfo>:<p className="w-full text-center font-montserrat text-[18px] pt-4 font-normal text-[#222222]">Chapters</p>}
          <div className="max-w-[360px]">
            <div className="h-[28px] rounded-[20px] flex mt-[1.5rem] shadow-[0_0px_7px_0px_rgba(0,0,0,0.15)] relative">
              <div className={classInfo}></div>
              <button style={{color:colorButton.color}} onClick={buttonInfoLeft} className="w-[50%] rounded-[20px] text-[10px] font-montserrat font-normal text-center transition-all duration-300">Manga</button><button style={{color:colorButton2.color}} onClick={buttonInfoRight} className="w-[50%] rounded-[20px] text-[10px] font-montserrat font-normal text-center transition-all duration-300">Chapters</button>

            </div>
            {colorButton.boolean?<p className="p-4 font-montserrat text-[10px] font-normal text-[#424242] text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie est nec gravida dictum. Nunc dictum lectus quam, non maximus urna ornare sit amet. Aliquam id sapien in massa commodo volutpat vel vitae quam.Nunc dictum lectus quam, non maximus urna ornare sit amet. Aliquam id sapien in massa commodo volutpatc tum lectus quam, non ma.</p>:<Chapter></Chapter> }
            
           
          </div>
        </div>
      </div>
    </>
  );
}

export default Manga;
