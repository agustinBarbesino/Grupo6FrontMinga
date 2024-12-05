import thumbUp from "../../Resources/pulgarArriba.png";
import thumbDown from "../../Resources/pulgarAbajo-removebg-preview.png";
import surprise from "../../Resources/emojiSorpresa.webp";
import hearthEyes from "../../Resources/coras-removebg-preview.png";
import { useState } from "react";

function ChapterInfo({name,author,category}){
  const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioChange = (value) => {
    setSelectedValue(selectedValue === value ? null : value);
    console.log(author);
    
  };
    return(<>
   <p className="maxTablets font-montserrat font-normal text-[30px] leading-[28px] py-2 text-black">
            {name}
          </p>
          <div className="flex justify-between w-full maxTablets">
             <button value="Shonen" className={`${category} px-3 h-9 rounded-full font-montserrat font-medium text-xs`}>{category}</button>
             <p className="px-[5px] py-[8.5px] font-montserrat font-medium text-[16px] text-gray-500">{author}</p>
          </div>
          

          <div className="flex items-center gap-2 w-full justify-center pt-4 maxTablets">
            <label className="custom-radio">
              <input
                type="radio"
                name="opcion"
                value="1"
                checked={selectedValue === "1"}
                onClick={() => handleRadioChange("1")}
              />
              <span className="circle">
                <img src={thumbUp} alt="Pulgar arriba" />
              </span>
            </label>
            <label className="custom-radio">
              <input
                type="radio"
                name="opcion"
                value="2"
                checked={selectedValue === "2"}
                onClick={() => handleRadioChange("2")}
              />
              <span className="circle">
                <img src={thumbDown} alt="Pulgar abajo" />
              </span>
            </label>
            <label className="custom-radio">
              <input
                type="radio"
                name="opcion"
                value="3"
                checked={selectedValue === "3"}
                onClick={() => handleRadioChange("3")}
              />
              <span className="circle">
                <img src={surprise} alt="Emoji sorpresa" />
              </span>
            </label>
            <label className="custom-radio">
              <input
                type="radio"
                name="opcion"
                value="4"
                checked={selectedValue === "4"}
                onClick={() => handleRadioChange("4")}
              />
              <span className="circle">
                <img src={hearthEyes} alt="Emoji ojos de corazón" />
              </span>
            </label>
          </div>
          <div className="bg-white w-full shadow-[0_2px_7px_0px_rgba(0,0,0,0.15)] rounded-[20px] h-[60px] flex mt-[1.2rem] p-2 items-center justify-center maxTablets">
             <div className="w-[33.5%]">
                <p className="font-montserrat text-[18px] font-normal h-[1.2rem] text-center text-[#424242]">4.5/5</p>
                <p className="font-montserrat text-[10px] font-normal text-center text-[#9D9D9D]">Rating</p>
             </div>
             <div className="w-[33.5%] border-l border-r border-[#9D9D9D]">
                <p className="font-montserrat text-[18px] font-normal h-[1.2rem] text-center text-[#424242]">265</p>
                <p className="font-montserrat text-[10px] font-normal text-center text-[#9D9D9D]">Chapters</p>
             </div>
             <div className="w-[33.5%]">
                <p className="font-montserrat text-[18px] font-normal h-[1.2rem] text-center text-[#424242]">Eng</p>
                <p className="font-montserrat text-[10px] font-normal text-center text-[#9D9D9D]">Language</p>
             </div>
          </div>
    </>)
}

export {ChapterInfo}