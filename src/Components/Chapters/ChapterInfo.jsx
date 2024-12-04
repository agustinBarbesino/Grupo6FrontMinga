import thumbUp from "../../Resources/pulgarArriba.png";
import thumbDown from "../../Resources/pulgarAbajo-removebg-preview.png";
import surprise from "../../Resources/emojiSorpresa.webp";
import hearthEyes from "../../Resources/coras-removebg-preview.png";
import { useState } from "react";

function ChapterInfo(){
  const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioChange = (value) => {
    setSelectedValue(selectedValue === value ? null : value);
    console.log(selectedValue);
    
  };
    return(<>
   <p className="mangaTitle maxTablets">
            Naruto: And That's Why You're Disqualified!! #8
          </p>
          <div className="flex justify-between w-full maxTablets">
             <button value="Shonen" className="Shonen buttonCategoryManga">Shonen</button>
             <p className="companyN">Company Name</p>
          </div>
          

          <div className="radio-container maxTablets">
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
          <div className="stadistics maxTablets">
             <div className="stat">
                <p className="statRating">4.5/5</p>
                <p className="Rating">Rating</p>
             </div>
             <div className="stat statLine">
                <p className="statRating">265</p>
                <p className="Rating">Chapters</p>
             </div>
             <div className="stat">
                <p className="statRating">Eng</p>
                <p className="Rating">Language</p>
             </div>
          </div>
    </>)
}

export {ChapterInfo}