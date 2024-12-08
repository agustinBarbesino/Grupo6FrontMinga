import CreateManga from "../Components/Edit/CreateManga"
import img from "../assets/bg.jpg"

export default function NewManga() {
    return (
        <>
            <div className="flex min-h-screen">
                <div className="flex flex-col md:py-2 md:pt-24 justify-center justify-items-center items-center w-full md:w-1/2 font-montserrat">
                    <h1 className="text-2xl mb-16 md:my-16">New Manga</h1>
                    <CreateManga />

                </div>
                <div className="w-full md:w-1/2 hidden md:flex">
                    <img
                        className="w-full h-full object-cover"
                        src={img}
                        alt="Background"
                    />
                </div>
            </div>
        </>
    )
}