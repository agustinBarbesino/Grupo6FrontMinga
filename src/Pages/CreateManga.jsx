import CreateManga from "../Components/Edit/CreateManga"

export default function NewManga() {
    return (
        <>
            <div className="flex py-2 pt-24">
                <div className="flex flex-col justify-center justify-items-center items-center w-full md:w-1/2 font-montserrat">
                    <h1 className="text-2xl my-16">New Manga</h1>
                    <CreateManga/>

                </div>
            </div>
        </>
    )
}