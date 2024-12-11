import CreateManga from "../Components/Edit/CreateManga"
import img from "../assets/bg.jpg"
import { useSelector } from "react-redux"
import { selectIsDarkMode } from "../store/actions/darkModeActions"

export default function NewManga() {
    const isDarkMode = useSelector(selectIsDarkMode)

    return (
        <>
            <div className={`flex min-h-screen ${isDarkMode ? 'bg-dark-bg-primary' : 'bg-white'}`}>
                <div className="flex flex-col md:py-2 md:pt-24 justify-center justify-items-center items-center w-full md:w-1/2 font-montserrat">
                    <h1 className={`text-2xl mb-16 md:my-16 ${isDarkMode ? 'text-dark-text-primary' : 'text-black'}`}>
                        New Manga
                    </h1>
                    <CreateManga />
                </div>
                <div className="w-full md:w-1/2 hidden md:flex">
                    <img
                        className={`w-full h-full object-cover ${isDarkMode ? 'opacity-80' : ''}`}
                        src={img}
                        alt="Background"
                    />
                </div>
            </div>
        </>
    )
}