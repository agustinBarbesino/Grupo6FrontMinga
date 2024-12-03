import CreateChapter from "../Components/Edit/CreateChapter"

export default function NewChapter() {
    return (
        <>
            <div className="flex py-2 pt-24">
                <div className="flex flex-col justify-center justify-items-center items-center w-full md:w-1/2 font-montserrat">
                    <h1 className="text-2xl my-16">New Chapter</h1>
                    <CreateChapter/>

                </div>
            </div>
        </>
    )
}