import FormEditManga from "../Components/Edit/FormEditManga"

export default function EditManga() {
    return (
        <>
            <div className="flex py-2 pt-24">
                <div className="flex flex-col justify-center justify-items-center items-center w-full md:w-1/2 font-montserrat">
                    <h1 className="text-2xl my-16">Edit Manga</h1>
                    <FormEditManga/>

                </div>
            </div>
        </>
    )
}