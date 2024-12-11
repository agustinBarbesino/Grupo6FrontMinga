import { React, useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { createChapter, setShowSendModal, getMangaPhoto } from '../../store/actions/newActions.js'
import { chapterByManga } from "../../store/actions/editActions.js"
import { selectIsDarkMode } from "../../store/actions/darkModeActions"

const CreateChapter = () => {
    const dispatch = useDispatch()
    const isDarkMode = useSelector(selectIsDarkMode)
    const { id } = useParams()
    const { showSendModal, chapterData, loading, loadingSend, mangaPhoto } = useSelector((state) => state.newChapter)
    const [textAreaHeight, setTextAreaHeight] = useState('auto')
    
    useEffect(() => {
        dispatch(getMangaPhoto({ id }))
    }, [])
    
    const chaptersData = useSelector((state) => state?.editChapters?.chaptersData || [])
    const chapters = chaptersData.map((chapter) => chapter.order)
    
    const initialFormData = {
        manga_id: id,
        title: '',
        order: '',
        pages: [],
    }
    const [formData, setFormData] = useState(initialFormData)

    const handlePagesChange = (e) => {
        const inputValue = e.target.value
        const pagesArray = inputValue.split(",").map(page => page.trim())
        setFormData({ ...formData, pages: pagesArray })
        setTextAreaHeight("auto")
        setTextAreaHeight(`${e.target.scrollHeight}px`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let updatedFormData = { ...formData, cover_photo: formData.pages[0] }
        dispatch(createChapter({ updatedFormData }))
        setFormData(initialFormData)
        setTextAreaHeight('auto')
    }

    useEffect(() => {
        if (chapterData) {
            dispatch(setShowSendModal(true))
        }
        dispatch(chapterByManga({ id }))
    }, [chapterData, dispatch])

    return (
        <>
            <div className={`flex justify-between ${isDarkMode ? 'bg-dark-bg-primary' : 'bg-white'}`}>
                <div className="flex flex-col py-2 pt-24 justify-center md:justify-normal justify-items-center items-center w-full md:w-[60%] font-montserrat">
                    <h1 className={`text-2xl m-16 ${isDarkMode ? 'text-dark-text-primary' : 'text-black'}`}>
                        New Chapter
                    </h1>
                    <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                        <div className="w-full pt-2">
                            <form onSubmit={handleSubmit} className="space-y-2">
                                {/* title of chapter */}
                                <div className="flex justify-center md:justify-start">
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className={`w-64 border-b p-2 focus:outline-none ${
                                            isDarkMode 
                                            ? 'bg-dark-bg-secondary text-dark-text-primary border-gray-600 focus:border-gray-400 placeholder-gray-500' 
                                            : 'bg-white text-black border-gray-300 focus:border-gray-500 placeholder-gray-400'
                                        }`}
                                        placeholder="Insert title"
                                    />
                                </div>

                                {/* order of the chapter */}
                                <div className="flex justify-center md:justify-start">
                                    <input
                                        type="number"
                                        name="order"
                                        value={formData.order}
                                        onChange={(e) => {
                                            const newOrder = Number(e.target.value)
                                            const isOrderTaken = chapters.includes(newOrder)
                                            if (isOrderTaken) {
                                                alert(`Chapter ${newOrder} order already exists. Please choose a different order of the chapter.`)
                                            } else {
                                                setFormData({ ...formData, order: Number(e.target.value) })
                                            }
                                        }}
                                        className={`w-64 border-b p-2 focus:outline-none ${
                                            isDarkMode 
                                            ? 'bg-dark-bg-secondary text-dark-text-primary border-gray-600 focus:border-gray-400 placeholder-gray-500' 
                                            : 'bg-white text-black border-gray-300 focus:border-gray-500 placeholder-gray-400'
                                        }`}
                                        placeholder="Insert order"
                                    />
                                </div>

                                {/* pages */}
                                <div className="flex justify-center md:justify-start">
                                    <textarea
                                        name="pages"
                                        value={formData.pages.join(", ")}
                                        onChange={handlePagesChange}
                                        className={`w-64 border-b p-2 focus:outline-none resize-none overflow-hidden ${
                                            isDarkMode 
                                            ? 'bg-dark-bg-secondary text-dark-text-primary border-gray-600 focus:border-gray-400 placeholder-gray-500' 
                                            : 'bg-white text-black border-gray-300 focus:border-gray-500 placeholder-gray-400'
                                        }`}
                                        placeholder="Insert pages"
                                        rows={1}
                                        style={{ height: textAreaHeight }}
                                    />
                                </div>

                                {/* button */}
                                <div className="flex py-8 justify-center items-center md:justify-start font-semibold">
                                    <button
                                        type="submit"
                                        className="w-full text-lg bg-pink-gradient text-white py-2 rounded-full hover:bg transition-colors"
                                    >
                                        {loadingSend ? "Sending..." : "Send"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-[45%] hidden md:flex">
                    {loading ? (
                        <p className={`flex text-2xl font-montserrat justify-items-center justify-center items-center text-center ${
                            isDarkMode ? 'text-dark-text-primary' : 'text-black'
                        }`}>
                            Loading photo...
                        </p>
                    ) : (
                        <div className="w-full md:w-full hidden md:flex">
                            <img
                                className={`w-full h-auto ${isDarkMode ? 'opacity-80' : ''}`}
                                src={mangaPhoto}
                                alt="Background"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showSendModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className={`rounded-lg p-6 max-w-sm w-full ${isDarkMode ? 'bg-dark-bg-secondary' : 'bg-white'}`}>
                        <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-dark-text-primary' : 'text-black'}`}>
                            Your changes are saved correctly!
                        </h3>
                        <hr className={`my-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
                        <button
                            onClick={() => dispatch(setShowSendModal(false))}
                            className={`w-full py-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}
                        >
                            <NavLink to={'/manager'}> Accept</NavLink>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default CreateChapter