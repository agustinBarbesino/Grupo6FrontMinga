import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { createChapter, setShowSendModal } from '../../store/actions/newActions.js'


const CreateChapter = () => {
    const dispatch = useDispatch()
    /* estado de modal, data de mangas y cargando */
    const {showSendModal, chapterData, loading} = useSelector((state) => state.newChapter)
    /* estado para controlar la altura dinámica del text area */
    const [textAreaHeight, setTextAreaHeight] = useState('auto')
    const {id} = useParams()
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
        // Ajustar la altura del textarea en función del contenido
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
      }, [chapterData, dispatch])
    return (
        <>
            <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                {/* Form Section */}
                <div className="w-full pt-2">
                    <form onSubmit={handleSubmit} className="space-y-2">
                        {/* title of chapter */}
                        <div className="flex justify-center md:justify-start">
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                placeholder="Insert title"
                            />
                        </div>
                        {/* order of the chapter*/}
                        <div className="flex justify-center md:justify-start">
                            <input
                                type="number"
                                name="order"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                placeholder="Insert order"
                            />
                        </div>

                        {/*pages*/}

                        <div className="flex justify-center md:justify-start">
                            <textarea
                                name="pages"
                                value={formData.pages.join(", ")} 
                                onChange={handlePagesChange}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500 resize-none overflow-hidden"
                                placeholder="Insert pages"
                                rows={1}
                                style={{ height: textAreaHeight }} 
                            />

                        </div>

                        {/* buttons */}

                        <div className="flex pt-16 w-[90%] justify-center items-center md:justify-start font-semibold">
                            <button
                                type="submit"
                                className="w-full text-lg bg-pink-gradient text-white py-2 rounded-full hover:bg transition-colors"
                            >
                                {loading ? "Sending..." : "Send"} {/* Mostrar "Sending..." mientras está cargando */}
                            </button>
                        </div>

                    </form>
                </div>


            </div>
            {/* Modals */}
            {showSendModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-medium mb-4">Your changes are saved correctly!</h3>
                        <hr className="border-gray-300 my-4" />
                        <button
                            onClick={(e) => dispatch(setShowSendModal(false))}
                            className="w-full text-blue-500 py-2"
                        >
                            Accept
                        </button>
                    </div>
                </div>
            )}
        </>
    )

}

export default CreateChapter