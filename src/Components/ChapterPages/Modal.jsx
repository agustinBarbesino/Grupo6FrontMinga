import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from 'date-fns';
import { useSearchParams } from "react-router-dom";
import { getComments, addComment, updateComment, deleteComment } from "../../store/actions/chapterActions";
export default function Modal() {
    const [isOpen, setIsOpen] = useState(false);
    const { comments } = useSelector((state) => state.chapterStore);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const author_id = useSelector((state) => state.auth.user?.author_id);
    const company_id = useSelector((state) => state.auth.user?.company_id);
    const role = useSelector((state) => state.role.role);
    const id = searchParams.get('id');

    const [editingComment, setEditingComment] = useState(null);
    const [newCommentText, setNewCommentText] = useState('');
    const [commentSend, setCommentSend] = useState("");
    const [loading, setLoading] = useState(false); // Estado para controlar la carga

    useEffect(() => {
        dispatch(getComments(id));
    }, [dispatch, id]);

    const sendComment = async () => {
        if (commentSend.length >= 5) {
            setLoading(true);
            await dispatch(addComment({ chapterId: id, authorId: author_id, companyId: company_id, message: commentSend }));
            dispatch(getComments(id));
            setCommentSend("");
            setLoading(false);
        } else {
            alert("The comment must be at least 5 characters");
        }
    };

    const handleEditComment = (commentId, message) => {
        setEditingComment(commentId);
        setNewCommentText(message);
    }

    const handleSaveComment = async (commentId,) => {
        if (newCommentText.length >= 5) {
            setLoading(true);
            await dispatch(updateComment({ _id: commentId, message: newCommentText }));
            setEditingComment(null);
            dispatch(getComments(id));
            setLoading(false);

        } else {
            alert("The comment must be at least 5 characters");
        };
    }

    const handleDeleteComment = async (commentId) => {
        const isConfirm = window.confirm('Are you sure you want to delete this comment?');
        if (isConfirm) {
            setLoading(true);
            await dispatch(deleteComment(commentId ));
            alert("The comment has been deleted.");
            dispatch(getComments(id));
            setLoading(false);

        } else {
            alert("The comment deletion has been canceled.");
        }
    }

    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)} className="py-2 px-4">
                <img src="https://s3-alpha-sig.figma.com/img/c6ca/d4a8/50eb70cf6e6a2e8e874cb25836f927e4?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WL3RvPLhBMvFeAfVvm8FYxEU6lBzFEB~iUKWulNqjBsUdFMA6tqun1MTWsZCk8pUValRFSFsXIVUqrwzMXNXcfqnsVOjG-o-CvTIof2Q02YS24z5~6fx~Tvux1bSB7UzDNCYKnBcBBmAluRQxjBne9Gof4l~aPbvaH5liD183nhsAjbtunRuvaCvOMMMpefbBJ42hVU78Aoel6xShH8OCQaLyIT9SOl6y~IrxaOE9rPiAR8XwNtSUvZQgdQGqHiDhoLD9WfPNn7mYsXDxYLjsgH~zheW97FoMkOJfNU-AI5D7Vtg5iMMYrp4wS9~t133jeHdQ2RlFc10zr-B0YSmxg__" className="w-10 h-10" alt=" button comments" />
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-end">
                    {/* Button close */}
                    <div className="relative bg-[#EBEBEB] p-5 rounded flex flex-col justify-center items-center gap-4 w-full h-[88vh] md:h-[86vh] lg:h-[88vh]">
                        <button onClick={() => setIsOpen(!isOpen)} className="absolute top-3 right-3 lg:top-10 lg:right-10 bg-black text-white py-2 px-4 rounded-full"> X</button>

                        {/* Loading Screen */}
                        {loading && (
                            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
                                <div className="spinner-border text-white" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        )}

                        {/* Content comments */}
                        <div className="overflow-auto flex flex-col h-5/6 w-full gap-4">
                            {comments.length === 0 ? (
                                <div className="bg-transparent w-full flex flex-col justify-center items-center py-6">
                                    <p className="text-[#0a0a0a] text-center text-lg md:text-3xl">
                                        There are no comments on this chapter, be the first to leave yours.
                                    </p>
                                </div>
                            ) : (


                                comments.map((comment) => (
                                    <div key={comment._id} className="bg-white w-full flex flex-col justify-evenly items-start gap-3 py-3">
                                        <div className="flex justify-between w-full items-center">
                                            <div className="flex justify-items-start items-center ms-4">
                                                <img
                                                    src={comment.authorId?.photo || comment.companyId?.photo}
                                                    alt="Profile Image"
                                                    className="w-14 h-14 rounded-full mr-2 bg-black"
                                                />
                                                <p>
                                                    {comment.authorId?.name || comment.companyId?.name}
                                                </p>
                                            </div>
                                            {/* Button  save and edit */}
                                            {(comment?.companyId?._id || comment?.authorId?._id) === (company_id || author_id) && (
                                                editingComment === comment._id ?
                                                    (
                                                        <div className=" flex gap-4 p-3 me-4">
                                                            <button
                                                                onClick={() => handleSaveComment(comment._id, newCommentText)}
                                                                className="text-green-500 hover:text-green-300 px-2 py-1 border-2 border-gray-300 rounded-lg"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={() => { setEditingComment(null), setNewCommentText('') }}
                                                                className="text-red-700 hover:text-red-300 px-2 py-1 border-2 border-gray-300 rounded-lg"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>

                                                    ) :
                                                    (
                                                        <div className=" flex text-lg gap-4  p-3 me-4">
                                                            <button
                                                                onClick={() => handleEditComment(comment._id, comment.message)}
                                                                className="text-[#0079FF] hover:bg-gray-100 flex items-center gap-5 px-2 border-2 border-gray-300  rounded-lg"
                                                            >
                                                                Edit
                                                                <img src="/IconEdit.png" alt="Icon to edit comment" className="w-4 h-4" />
                                                            </button>

                                                            <button
                                                                onClick={() => handleDeleteComment(comment._id)}
                                                                className="bg-[#FEF1EF]  hover:bg-[#F1D0D6] p-2 w-10 h-10 flex items-center justify-center rounded-lg"
                                                            >
                                                                <img src="/IconDelete.png" alt="Icon to delete comment" className=" w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    )

                                            )}

                                        </div>
                                        {editingComment === comment._id ? (
                                            <div className="flex justify-evenly w-full">
                                                <input
                                                    type="text"
                                                    placeholder="Say something..."
                                                    className="relative w-10/12 p-4 bg-[#F1F1F3] border border-gray-300 rounded-lg"
                                                    value={newCommentText}
                                                    onChange={(e) => setNewCommentText(e.target.value)}
                                                />
                                            </div>
                                        ) : (
                                            <div className="ms-4 text-[#999999]">
                                                <p>{comment.message}</p>
                                            </div>
                                        )}

                                        <div className="text-[#999999] self-center">
                                            <p>{formatDistanceToNow(new Date(comment.updatedAt), { addSuffix: true })}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Input comments */}
                        {role !== 0 && (
  <div className="flex justify-evenly w-screen absolute bottom-4">
      <input
          type="text"
          placeholder="Say something..."
          className="relative w-10/12 p-4 bg-[#F1F1F3] border border-gray-300 rounded-lg"
          value={commentSend}
          onChange={(e) => setCommentSend(e.target.value)}
      />
      <button
          className="absolute top-1/2 left-[80%] md:left-[87%] transform -translate-y-1/2"
          onClick={sendComment}
      >
          <img src="paper-airplane.png" alt="Send comment" className="w-10 h-10" />
      </button>
  </div>
)}
                    </div>
                </div>
            )}
        </>
    );
}
