import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { formatDistanceToNow } from 'date-fns'
import { useSearchParams } from "react-router-dom";
import { getComments } from "../../store/actions/chapterActions";

export default function Modal() {
    const [isOpen, setIsOpen] = useState(false);
    const { loadingComments } = useSelector(state => state.chapterStore);
    const { comments } = useSelector((state) => state.chapterStore);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')
    const [commentSend, setCommentSend] = useState("")
    useEffect(() => {
        dispatch(getComments(id));
    }, []);


    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)} className=" py-2 px-4 ">
                <img src="https://s3-alpha-sig.figma.com/img/c6ca/d4a8/50eb70cf6e6a2e8e874cb25836f927e4?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WL3RvPLhBMvFeAfVvm8FYxEU6lBzFEB~iUKWulNqjBsUdFMA6tqun1MTWsZCk8pUValRFSFsXIVUqrwzMXNXcfqnsVOjG-o-CvTIof2Q02YS24z5~6fx~Tvux1bSB7UzDNCYKnBcBBmAluRQxjBne9Gof4l~aPbvaH5liD183nhsAjbtunRuvaCvOMMMpefbBJ42hVU78Aoel6xShH8OCQaLyIT9SOl6y~IrxaOE9rPiAR8XwNtSUvZQgdQGqHiDhoLD9WfPNn7mYsXDxYLjsgH~zheW97FoMkOJfNU-AI5D7Vtg5iMMYrp4wS9~t133jeHdQ2RlFc10zr-B0YSmxg__" className="w-10 h-10" alt=" button comments" />
            </button>
            {isOpen && (
                <div className=" fixed  inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-end">
                    {/* Button close */}
                    <div className="relative bg-[#EBEBEB] p-5 rounded  flex flex-col justify-center items-center gap-4 w-full h-[88vh] md:h-[86vh] lg:h-[88vh]">
                        <button onClick={() => setIsOpen(!isOpen)} className=" absolute top-3 right-3   lg:top-10 lg:right-10 bg-black text-white py-2 px-4 rounded-full "> X</button>
                        {/* content comments */}
                        <div className="overflow-auto flex flex-col h-5/6 w-screen gap-4">
                            {comments.length === 0 ? (
                                <div className="bg-transparent w-screen flex flex-col justify-center items-center py-6">
                                    <p className="text-[#0a0a0a] text-center text-lg md:text-3xl">
                                        There are no comments on this chapter, be the first to leave yours.
                                    </p>
                                </div>
                            ) : (
                                comments.map((comment) => (
                                    <div key={comment._id} className="bg-white w-screen flex flex-col justify-evenly items-start gap-3 py-3">
                                        <div className="flex justify-items-start items-center ms-4 ">
                                            <img
                                                src={comment.authorId?.photo || comment.companyId?.photo}
                                                alt="Profile Image"
                                                className="w-14 h-14 rounded-full mr-2 bg-black"
                                            />
                                            <p>{comment.authorId?.name || comment.companyId?.name}</p>
                                        </div>
                                        <div className="ms-4 text-[#999999]">
                                            <p>{comment.message}</p>
                                        </div>
                                        <div className="text-[#999999] self-center">
                                            <p>{formatDistanceToNow(new Date(comment.updatedAt), { addSuffix: true })}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        {/* input comments */}
                        <div className="flex justify-evenly w-screen absolute bottom-4">
                            <input
                                type="text"
                                placeholder="Say something..."
                                className="relative w-10/12 p-4 bg-[#F1F1F3] border border-gray-300 rounded-lg"
                                value={commentSend}
                                onChange={(e) => setCommentSend(e.target.value)}
                            />
                            <button className="absolute top-1/2 left-[80%] md:left-[87%] transform  -translate-y-1/2">
                                <img src="paper-airplane.png" alt="Send comment" className="w-10 h-10" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}
