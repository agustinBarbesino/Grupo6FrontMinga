import { React, useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { fetchCategories } from '../../store/actions/categoryActions.js'
import { editChapter, setShowSaveModal, setShowDeleteModal, setShowDeletedModal, deleteChapter, setShowNoChaptersModal, getChapterPhoto, chapterByManga } from '../../store/actions/editActions.js'
import { selectIsDarkMode } from '../../store//actions/darkModeActions.js'

const FormEditChapter = () => {
    const dispatch = useDispatch()
    const isDarkMode = useSelector(selectIsDarkMode)
    const { title, id, idC } = useParams()
    
    useEffect(() => {
        dispatch(chapterByManga({idC}))
    }, [dispatch])

    const { showSaveModal, showDeleteModal, showDeletedModal, showNoChaptersModal, loadingEdit, loadingDelete, deleteSuccess, chaptersTrigger, initialFormDataChapter, loadingPhoto, mangaPhoto } = useSelector((state) => state.editChapters)
    const chaptersData = useSelector((state) => state?.editChapters?.chaptersData || [])
    const [formData, setFormData] = useState(initialFormDataChapter)
    const [filteredChapters, setFilteredChapters] = useState([])
    const [textAreaHeight, setTextAreaHeight] = useState('auto')

    const handlePagesChange = (e) => {
        const inputValue = e.target.value
        const pagesArray = inputValue.split(",").map(page => page.trim())
        setFormData({ ...formData, pages: pagesArray })
        setTextAreaHeight("auto")
        setTextAreaHeight(`${e.target.scrollHeight}px`)
    }

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(getChapterPhoto({ id }))
        dispatch(chapterByManga({idC}))
        setFormData({ ...formData, name: title })
    }, [dispatch])

    const chapters = chaptersData.map((chapter) => chapter.order)

    useEffect(() => {
        if (chaptersData.length === 0) {
            dispatch(setShowNoChaptersModal(true))
        }
    }, [chaptersData, dispatch])

    useEffect(() => {
        if (formData.chapter) {
            const filtered = chaptersData.filter(chapter => chapter.order === parseInt(formData.chapter))
            setFilteredChapters(filtered)
        }
    }, [formData.chapter])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editChapter({ filteredChapters, formData }))
        setFormData(initialFormDataChapter)
    }

    useEffect(() => {
        if (chaptersTrigger) {
            dispatch(setShowSaveModal(true))
            setFormData({ ...formData, title: title })
        } else if (deleteSuccess) {
            dispatch(setShowDeleteModal(false))
            dispatch(setShowDeletedModal(true))
        }
    }, [chaptersTrigger, deleteSuccess])

    return (
        <>
            <div className={`flex justify-between ${isDarkMode ? 'bg-dark-bg-primary' : 'bg-white'}`}>
                <div className="flex pb-2 pt-24 md:pt-16 flex-col justify-center justify-items-center items-center w-full md:w-1/2 font-montserrat">
                    <h1 className={`text-2xl my-16 md:mt-0 ${isDarkMode ? 'text-dark-text-primary' : 'text-black'}`}>Edit Chapter</h1>
                    <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                        <div className="w-full pt-2">
                            <form onSubmit={handleSubmit} className="space-y-2">
                                <div className="flex justify-center md:justify-start">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-64 border-b p-2 focus:outline-none ${
                                            isDarkMode 
                                            ? 'bg-dark-bg-secondary text-dark-text-primary border-gray-600 focus:border-gray-400' 
                                            : 'bg-white text-black border-gray-300 focus:border-gray-500'
                                        }`}
                                        placeholder="name of the manga"
                                    />
                                </div>
                                <div className="flex justify-center md:justify-start">
                                    <select
                                        name="chapter"
                                        value={formData.chapter}
                                        onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                                        required
                                        className={`w-64 border-b p-2 focus:outline-none ${
                                            isDarkMode 
                                            ? 'bg-dark-bg-secondary border-gray-600 focus:border-gray-400' 
                                            : 'bg-white border-gray-300 focus:border-gray-500'
                                        } ${formData.chapter !== '' ? isDarkMode ? 'text-dark-text-primary' : 'text-black' : 'text-gray-400'}`}
                                    >
                                        {chapters.length === 0 ? <option>You don't have chapters</option> : <option value="" disabled>select chapter</option>}
                                        {chapters.map((chapter) => (
                                            <option key={chapter} value={chapter} className={isDarkMode ? 'text-dark-text-primary bg-dark-bg-secondary' : 'text-black bg-white'}>
                                                {chapter}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex justify-center md:justify-start">
                                    <select
                                        name="data"
                                        value={formData.data}
                                        onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                                        required
                                        className={`w-64 border-b p-2 focus:outline-none ${
                                            isDarkMode 
                                            ? 'bg-dark-bg-secondary border-gray-600 focus:border-gray-400' 
                                            : 'bg-white border-gray-300 focus:border-gray-500'
                                        } ${formData.data ? isDarkMode ? 'text-dark-text-primary' : 'text-black' : 'text-gray-400'}`}
                                    >
                                        <option value="" disabled>select data</option>
                                        {['order', 'title', 'cover photo', 'pages'].map((data) => (
                                            <option key={data} value={data} className={isDarkMode ? 'text-dark-text-primary bg-dark-bg-secondary' : 'text-black bg-white'}>
                                                {data.charAt(0).toUpperCase() + data.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className={`flex justify-center md:justify-start ${formData.data === 'title' ? '' : 'hidden'}`}>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.data === 'title' ? formData.edit : ''}
                                        onChange={(e) => setFormData({ ...formData, edit: e.target.value })}
                                        className={`w-64 border-b p-2 focus:outline-none ${
                                            isDarkMode 
                                            ? 'bg-dark-bg-secondary text-dark-text-primary border-gray-600 focus:border-gray-400' 
                                            : 'bg-white text-black border-gray-300 focus:border-gray-500'
                                        }`}
                                        placeholder="Insert title"
                                    />
                                </div>

                                <div className={`flex justify-center md:justify-start ${formData.data === 'order' ? '' : 'hidden'}`}>
                                    <input
                                        type="number"
                                        name="order"
                                        value={formData.data === 'order' ? formData.edit : ''}
                                        onChange={(e) => {
                                            const newOrder = Number(e.target.value)
                                            const isOrderTaken = chapters.includes(newOrder)
                                            if (isOrderTaken) {
                                                alert(`Chapter ${newOrder} order already exists. Please choose a different order of the chapter.`)
                                            } else {
                                                setFormData({ ...formData, edit: Number(e.target.value) })
                                            }
                                        }}
                                        className={`w-64 border-b p-2 focus:outline-none ${
                                            isDarkMode 
                                            ? 'bg-dark-bg-secondary text-dark-text-primary border-gray-600 focus:border-gray-400' 
                                            : 'bg-white text-black border-gray-300 focus:border-gray-500'
                                        }`}
                                        placeholder="Insert order"
                                    />
                                </div>

                                <div className={`flex justify-center md:justify-start ${formData.data === 'pages' ? '' : 'hidden'}`}>
                                    <textarea
                                        name="pages"
                                        value={formData.data === 'pages' ? formData.edit : ''}
                                        onChange={handlePagesChange}
                                        className={`w-64 border-b p-2 focus:outline-none resize-none overflow-hidden ${
                                            isDarkMode 
                                            ? 'bg-dark-bg-secondary text-dark-text-primary border-gray-600 focus:border-gray-400' 
                                            : 'bg-white text-black border-gray-300 focus:border-gray-500'
                                        }`}
                                        placeholder="Insert pages"
                                        rows={1}
                                        style={{ height: textAreaHeight }}
                                    />
                                </div>

                                <div className={`flex justify-center md:justify-start ${formData.data === 'cover photo' ? '' : 'hidden'}`}>
                                    <input
                                        type="url"
                                        name="cover_photo"
                                        value={formData.data === 'cover photo' ? formData.edit : ''}
                                        onChange={(e) => setFormData({ ...formData, edit: e.target.value })}
                                        className={`w-64 border-b p-2 focus:outline-none ${
                                            isDarkMode 
                                            ? 'bg-dark-bg-secondary text-dark-text-primary border-gray-600 focus:border-gray-400' 
                                            : 'bg-white text-black border-gray-300 focus:border-gray-500'
                                        }`}
                                        placeholder="URL of the cover photo"
                                    />
                                </div>

                                <div className="flex pt-8 justify-center items-center md:justify-start font-semibold">
                                    <button
                                        type="submit"
                                        className={`w-full text-lg py-2 rounded-full transition-colors ${
                                            isDarkMode 
                                            ? 'bg-dark-rose-light text-dark-text-primary hover:bg-dark-rose-dark' 
                                            : 'bg-[#34D399] text-white hover:bg-rose-dark'
                                        }`}
                                    >
                                        {loadingEdit ? "Editing..." : "Edit"}
                                    </button>
                                </div>

                                <div className="flex pb-8 justify-center pt-4 md:justify-start font-semibold">
                                    <button
                                        type="button"
                                        onClick={() => dispatch(setShowDeleteModal(true))}
                                        className="w-full text-lg bg-red-100 text-red-500 py-2 rounded-full hover:bg-red-200 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-[45%] hidden md:flex">
                    {loadingPhoto ? (
                        <p className={`flex text-2xl font-montserrat justify-items-center justify-center items-center text-center ${
                            isDarkMode ? 'text-dark-text-primary' : 'text-black'
                        }`}>
                            Loading photo...
                        </p>
                    ) : (
                        <div className="w-full md:w-full hidden md:flex">
                            <img
                                className="w-full h-auto"
                                src={mangaPhoto || 'https://media.wired.com/photos/59546725be605811a2fdceae/master/w_1600,c_limit/BobasWonderfulReturn.jpg'}
                                alt="Background"
                                onError={(e) => {
                                    e.target.src = 'https://images.squarespace-cdn.com/content/v1/593f201de3df288fc6465e6f/1621949179769-ZEZNWEU0ODIFGPCNGP5J/Saga+%2354.jpeg?format=1500w'
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Modals with dark mode support */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className={`rounded-lg p-6 max-w-sm w-full ${isDarkMode ? 'bg-dark-bg-secondary' : 'bg-white'}`}>
                        <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-dark-text-primary' : 'text-black'}`}>
                            {chapters.length === 1 
                                ? "Are you sure you want to delete this? You only have 1 chapter" 
                                : "Are you sure you want to delete this?"}
                        </h3>
                        <hr className={`my-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
                        <div className="flex items-center">
                            <button
                                onClick={() => dispatch(deleteChapter({ id }))}
                                className="flex-1 text-red-500 py-2"
                            >
                                {loadingDelete ? "Deleting..." : "Yes, I'm sure"}
                            </button>
                            <div className={`w-px h-8 mx-4 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`} />
                            <button
                                onClick={() => dispatch(setShowDeleteModal(false))}
                                className="flex-1 text-blue-500 py-2"
                            >{/* Continuación de los modales */}
                            No
                        </button>
                    </div>
                </div>
            </div>
        )}

        {showSaveModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className={`rounded-lg p-6 max-w-sm w-full ${isDarkMode ? 'bg-dark-bg-secondary' : 'bg-white'}`}>
                    <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-dark-text-primary' : 'text-black'}`}>
                        Your changes are saved correctly!
                    </h3>
                    <hr className={`my-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
                    <button
                        onClick={() => dispatch(setShowSaveModal(false))}
                        className={`w-full py-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}
                    >
                        <NavLink to={'/manager'}> Accept</NavLink>
                    </button>
                </div>
            </div>
        )}

        {showDeletedModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className={`rounded-lg p-6 max-w-sm w-full ${isDarkMode ? 'bg-dark-bg-secondary' : 'bg-white'}`}>
                    <h3 className={`text-lg font-medium mb-4 text-center ${isDarkMode ? 'text-dark-text-primary' : 'text-black'}`}>
                        Your chapter is deleted!
                    </h3>
                    <hr className={`my-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
                    <button
                        onClick={() => dispatch(setShowDeletedModal(false))}
                        className={`w-full py-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}
                    >
                        <NavLink to={'/manager'}> Accept</NavLink>
                    </button>
                </div>
            </div>
        )}

        {showNoChaptersModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className={`rounded-lg p-6 max-w-sm w-full ${isDarkMode ? 'bg-dark-bg-secondary' : 'bg-white'}`}>
                    <h3 className={`text-lg font-medium mb-4 text-center ${isDarkMode ? 'text-dark-text-primary' : 'text-black'}`}>
                        You don't have chapter, please go back to your panel!
                    </h3>
                    <hr className={`my-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
                    <button
                        onClick={() => dispatch(setShowNoChaptersModal(true))}
                        className={`w-full py-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}
                    >
                        <NavLink to={'/mangas'}> Accept</NavLink>
                    </button>
                </div>
            </div>
        )}
    </>
)
}

export default FormEditChapter