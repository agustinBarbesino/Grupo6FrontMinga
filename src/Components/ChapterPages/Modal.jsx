import { useState } from "react"
import { comments } from "../../MockData/dataChapters"
import { formatDistanceToNow } from 'date-fns'
export default function Modal() {
    const [isOpen, setIsOpen] = useState(true)
    const date = new Date('2024-11-29T19:52:02.794+00:00');
    const timeAgo = formatDistanceToNow(date, { addSuffix: true });
    console.log(comments);

    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)} className="bg-cyan-500 py-2 px-4 rounded-lg text-white">
                Open Modal
            </button>
            {isOpen && (
                <div className=" fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-end">
                    {/* Button close */}
                    <div className="relative bg-[#999999] p-5 rounded  flex flex-col justify-center items-center gap-4 w-full h-[88vh] md:h-[86vh] lg:h-[88vh]">
                        <button onClick={() => setIsOpen(!isOpen)} className=" absolute top-3 right-3   lg:top-10 lg:right-10 bg-black text-white py-2 px-4 rounded-full "> X</button>
                        {/* content comments */}
                        <div className="  overflow-auto flex flex-col h-5/6 w-screen gap-4">
                            {comments.map((comment) => (
                                <div key={comment._id} className=" bg-white w-screen flex flex-col justify-evenly items-start gap-3 py-3">
                                    <div className="flex justify-items-start items-center ms-4 ">
                                        <img src="https://robohash.org/asdaso" alt="Profile Image" className="w-14 h-14 rounded-full mr-2 bg-black" />
                                        <p> Ignacio Borraz</p>
                                    </div>
                                    <div className="ms-4 text-[#999999]">
                                        <p>{comments[0].message}</p>
                                    </div>
                                    <div className=" text-[#999999] self-center ">
                                        <p>{timeAgo}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* input comments */}
                        <div className=" flex justify-evenly w-screen absolute bottom-4 ">
                            <input type="text" placeholder="Say something..." className="w-10/12 mx-auto p-4 bg-[#F1F1F3] border border-gray-300 rounded-lg" />
                        </div>

                    </div>
                </div>
            )}

        </>
    )
}
