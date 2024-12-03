import CreateAuthor from "../Components/Edit/CreateAuthor"
import newImg from '../assets/newImg.png'

export default function NewAuthor() {
    return (
        <>
            <div className="flex py-2 pt-20">
                <div className="flex flex-col justify-center justify-items-center items-center w-full md:w-1/2 font-montserrat">
                    <h1 className="text-2xl mt-16">New Author</h1>
                    <img src={newImg} alt="new" className="rounded-full h-20 m-12" />
                    
                    <CreateAuthor/>

                </div>
            </div>
        </>
    )
}