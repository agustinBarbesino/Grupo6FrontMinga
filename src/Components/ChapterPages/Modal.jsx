import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from 'date-fns';
import { useSearchParams } from "react-router-dom";
import { getComments, addComment, updateComment, deleteComment } from "../../store/actions/chapterActions";
import { selectIsDarkMode } from '../../store/actions/darkModeActions';
import Swal from "sweetalert2";


export default function Modal() {
    const isDarkMode = useSelector(selectIsDarkMode);
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
    const [loading, setLoading] = useState(false);

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
            Swal.fire({
                title: "Warning!",
                text: "The comment must be at least 5 characters.",
                icon: "warning"
              })
        }
    };

    const handleEditComment = (commentId, message) => {
        setEditingComment(commentId);
        setNewCommentText(message);
    }

    const handleSaveComment = async (commentId) => {
        if (newCommentText.length >= 5) {
            setLoading(true);
            await dispatch(updateComment({ _id: commentId, message: newCommentText }));
            setEditingComment(null);
            dispatch(getComments(id));
            setLoading(false);
        } else {
            Swal.fire({
                title: "Warning!",
                text: "The comment must be at least 5 characters.",
                icon: "warning"
              })
        }
    }

    const handleDeleteComment = async (commentId) => {
        Swal.fire({
            title: "Are you sure, you want to delete this comment?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                try {
                    await dispatch(deleteComment(commentId));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });


                    dispatch(getComments(id));
                } catch (error) {

                    Swal.fire({
                        title: "Error!",
                        text: "There was a problem deleting the comment.",
                        icon: "error"
                    });
                } finally {
                    setLoading(false);
                }
            } else {
                Swal.fire({
                    title: "Cancelled",
                    text: "The comment deletion has been canceled.",
                    icon: "info"
                });
            }
        });

    }

    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)} className="py-2 px-4">
                <img src="https://s3-alpha-sig.figma.com/img/c6ca/d4a8/50eb70cf6e6a2e8e874cb25836f927e4?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WL3RvPLhBMvFeAfVvm8FYxEU6lBzFEB~iUKWulNqjBsUdFMA6tqun1MTWsZCk8pUValRFSFsXIVUqrwzMXNXcfqnsVOjG-o-CvTIof2Q02YS24z5~6fx~Tvux1bSB7UzDNCYKnBcBBmAluRQxjBne9Gof4l~aPbvaH5liD183nhsAjbtunRuvaCvOMMMpefbBJ42hVU78Aoel6xShH8OCQaLyIT9SOl6y~IrxaOE9rPiAR8XwNtSUvZQgdQGqHiDhoLD9WfPNn7mYsXDxYLjsgH~zheW97FoMkOJfNU-AI5D7Vtg5iMMYrp4wS9~t133jeHdQ2RlFc10zr-B0YSmxg__"
                    className={`w-10 h-10 ${isDarkMode ? 'filter brightness-75' : ''}`}
                    alt="button comments"
                />
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-end">
                    <div className={`relative ${isDarkMode ? 'bg-dark-bg-primary' : 'bg-[#EBEBEB]'
                        } p-5 rounded flex flex-col justify-center items-center gap-4 w-full h-[88vh] md:h-[86vh] lg:h-[88vh]`}>
                        <button onClick={() => setIsOpen(!isOpen)}
                            className={`absolute top-3 right-3 lg:top-10 lg:right-10 ${isDarkMode ? 'bg-dark-rose-light' : 'bg-black'
                                } text-white py-2 px-4 rounded-full hover:opacity-80 transition-opacity`}
                        >
                            X
                        </button>

                        {loading && (
                            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
                                <div className="spinner-border text-white" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        )}

                        <div className="overflow-auto flex flex-col h-5/6 gap-4 w-full px-4 md:px-8 lg:px-16">
                            {comments.length === 0 ? (
                                <div className="bg-transparent w-full flex flex-col justify-center items-center py-6">
                                    <p className={`${isDarkMode ? 'text-dark-text-primary' : 'text-[#0a0a0a]'
                                        } text-center text-xl md:text-3xl font-medium`}>
                                        There are no comments on this chapter, be the first to leave yours.
                                    </p>
                                </div>
                            ) : (
                                comments.map((comment) => (
                                    <div key={comment._id} className={`${isDarkMode ? 'bg-dark-bg-secondary' : 'bg-white'
                                        } w-full flex flex-col justify-evenly items-start gap-4 p-6 rounded-lg shadow-sm`}>
                                        <div className="flex justify-between w-full items-center">
                                            <div className="flex justify-items-start items-center gap-4">
                                                <img
                                                    src={comment.authorId?.photo || comment.companyId?.photo}
                                                    alt="Profile Image"
                                                    className="w-16 h-16 rounded-full object-cover"
                                                />
                                                <p className={`${isDarkMode ? 'text-dark-text-primary' : ''} text-lg font-medium`}>
                                                    {comment.authorId?.name || comment.companyId?.name}
                                                </p>
                                            </div>
                                            {(comment?.companyId?._id || comment?.authorId?._id) === (company_id || author_id) && (
                                                editingComment === comment._id ? (
                                                    <div className="flex gap-4">
                                                        <button
                                                            onClick={() => handleSaveComment(comment._id)}
                                                            className={`${isDarkMode ? 'text-green-400' : 'text-green-500'
                                                                } hover:text-green-300 px-4 py-2 border-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'
                                                                } rounded-lg font-medium transition-colors`}
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => { setEditingComment(null); setNewCommentText(''); }}
                                                            className={`${isDarkMode ? 'text-red-400' : 'text-red-700'
                                                                } hover:text-red-300 px-4 py-2 border-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'
                                                                } rounded-lg font-medium transition-colors`}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-4">
                                                        <button
                                                            onClick={() => handleEditComment(comment._id, comment.message)}
                                                            className={`${isDarkMode ? 'text-[#4da3ff] hover:bg-dark-bg-primary' : 'text-[#0079FF] hover:bg-gray-100'
                                                                } flex items-center gap-2 px-4 py-2 border-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'
                                                                } rounded-lg font-medium transition-colors`}
                                                        >
                                                            Edit
                                                            <img src="/IconEdit.png" alt="Edit" className={`w-5 h-5 ${isDarkMode ? 'filter brightness-75' : ''}`} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteComment(comment._id)}
                                                            className={`${isDarkMode ? 'bg-[#3d3636] hover:bg-[#4d3f3f]' : 'bg-[#FEF1EF] hover:bg-[#F1D0D6]'
                                                                } p-3 rounded-lg transition-colors`}
                                                        >
                                                            <img src="/IconDelete.png" alt="Delete" className={`w-6 h-6 ${isDarkMode ? 'filter brightness-75' : ''}`} />
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        {editingComment === comment._id ? (
                                            <div className="w-full">
                                                <input
                                                    type="text"
                                                    placeholder="Edit your comment..."
                                                    className={`w-full p-4 ${isDarkMode ? 'bg-dark-bg-primary text-dark-text-primary border-gray-600' : 'bg-[#F1F1F3] border-gray-300'
                                                        } border rounded-lg text-lg`}
                                                    value={newCommentText}
                                                    onChange={(e) => setNewCommentText(e.target.value)}
                                                />
                                            </div>
                                        ) : (
                                            <div className={`w-full ${isDarkMode ? 'text-gray-300' : 'text-[#666666]'}`}>
                                                <p className="text-lg leading-relaxed">{comment.message}</p>
                                            </div>
                                        )}
                                        <div className={`${isDarkMode ? 'text-gray-400' : 'text-[#999999]'} text-sm`}>
                                            <p>{formatDistanceToNow(new Date(comment.updatedAt), { addSuffix: true })}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

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