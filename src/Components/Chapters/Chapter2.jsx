import { useNavigate } from "react-router-dom"

function Chapter2({mangaId,image, title, pages}){
  const navigate = useNavigate()
  function editChapter(){
    window.location.href=`/editChapter/${title}/${mangaId}`
}
    return(<>
    <div className="flex flex-wrap py-2 items-center justify-center">
              <div className="flex flex-nowrap items-center justify-center relative">
              <button onClick={editChapter} className="editChap">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" width="10px" height="10px">
                        
                       <path d="M15.5 5.64L18.36 8.5c.293.293.293.768 0 1.061L6.967 20.953c-.098.098-.222.166-.357.197l-3.7.84C2.85 22 2.8 22.01 2.74 22.01c-.19 0-.38-.08-.53-.22-.18-.19-.25-.45-.2-.7l.839-3.696C2.88 17.256 2.95 17.13 3.05 17.03L14.44 5.64C14.733 5.347 15.207 5.347 15.5 5.64zM21.99 5.52c.03.24-.05.47-.22.63l-1.29 1.29c-.293.293-.768.293-1.061 0L16.56 4.58c-.293-.293-.293-.768 0-1.061l1.29-1.29c.16-.17.4-.25.62-.22.14.02 1.33.2 2.32 1.2C21.79 4.2 21.97 5.39 21.99 5.52z"/>
                       </svg>
                    </button>
              <img className="w-[63px] h-[57px] object-cover rounded-[8px]"
            src={image}
            alt="Portada del manga"/>
            <div className="flex flex-wrap ml-4 w-[90px] items-start justify-between">
              <h6 className="font-montserrat text-[16px] font-normal text-black w-full pb-2.5">{title}</h6>
              <img
              
            src="https://s3-alpha-sig.figma.com/img/c6ca/d4a8/50eb70cf6e6a2e8e874cb25836f927e4?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WL3RvPLhBMvFeAfVvm8FYxEU6lBzFEB~iUKWulNqjBsUdFMA6tqun1MTWsZCk8pUValRFSFsXIVUqrwzMXNXcfqnsVOjG-o-CvTIof2Q02YS24z5~6fx~Tvux1bSB7UzDNCYKnBcBBmAluRQxjBne9Gof4l~aPbvaH5liD183nhsAjbtunRuvaCvOMMMpefbBJ42hVU78Aoel6xShH8OCQaLyIT9SOl6y~IrxaOE9rPiAR8XwNtSUvZQgdQGqHiDhoLD9WfPNn7mYsXDxYLjsgH~zheW97FoMkOJfNU-AI5D7Vtg5iMMYrp4wS9~t133jeHdQ2RlFc10zr-B0YSmxg__"            alt="iconComment" className="w-[25px] h-[20px]" />
            <p className="font-montserrat text-[13px] font-normal px-2 text-black">{pages}</p>
            </div>
            <button  onClick={() => navigate(`/chapter?id=${mangaId}`)} className="w-[91px] rounded-full h-[44px] bg-gradient-to-r from-[#F9A8D4] to-[#F472B6] font-montserrat text-[15px] font-bold text-white">Read</button>
            </div>
          </div>
    </>)
}

export {Chapter2}