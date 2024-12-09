import { React, useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { fetchCategories } from '../../store/actions/categoryActions.js'
import { editChapter, setShowSaveModal, setShowDeleteModal, setShowDeletedModal, deleteChapter, setShowNoChaptersModal, getChapterPhoto, chapterByManga } from '../../store/actions/editActions.js'

const FormEditChapter = () => {
    const dispatch = useDispatch()
    const { title, id, idC } = useParams() //id y titulo del manga
    useEffect(() => {
        dispatch(chapterByManga({idC}))
    }, [dispatch])
    console.log("idc",idC)
    const { showSaveModal, showDeleteModal, showDeletedModal, showNoChaptersModal, loadingEdit, loadingDelete, deleteSuccess, chaptersTrigger, initialFormDataChapter, loadingPhoto, mangaPhoto  } = useSelector((state) => state.editChapters)
    const chaptersData = useSelector((state) => state?.editChapters?.chaptersData || [])
    const [formData, setFormData] = useState(initialFormDataChapter)
    const [filteredChapters, setFilteredChapters] = useState([])
    const [textAreaHeight, setTextAreaHeight] = useState('auto')
    const handlePagesChange = (e) => {
        const inputValue = e.target.value
        const pagesArray = inputValue.split(",").map(page => page.trim())
        setFormData({ ...formData, pages: pagesArray })
        // Ajustar la altura del textarea en función del contenido
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
    console.log("chapters", chapters)
    useEffect(() => {
        if (chaptersData.length === 0) {
            dispatch(setShowNoChaptersModal(true))
        }
    }
        , [chaptersData, dispatch])
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
         <div className="flex justify-between">
                <div className="flex pb-2 pt-24 md:pt-16 flex-col justify-center justify-items-center items-center w-full md:w-1/2 font-montserrat">
                    <h1 className="text-2xl my-16 md:mt-0">Edit Chapter</h1>
            <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                {/* Form Section */}
                <div className="w-full pt-2">
                    <form onSubmit={handleSubmit} className="space-y-2">
                        {/* name of manga */}
                        <div className="flex justify-center md:justify-start">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                placeholder="name of the manga"
                            />
                        </div>
                        {/* select chapter */}
                        <div className="flex justify-center md:justify-start">
                            <select
                                name="chapter"
                                value={formData.chapter}
                                onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                                required
                                className={`w-64 border-b ${formData.chapter != '' ? "text-black" : "text-gray-400"} border-gray-300 p-2 focus:outline-none focus:border-gray-500`}
                            >
                                {chapters.length === 0 ? <option >You don't have chapters</option> : <option value="" disabled >
                                    select chapter
                                </option>}
                                {chapters.map((chapter) => (
                                    <option key={chapter} value={chapter} className='text-black'>
                                        {chapter}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* select data */}
                        <div className="flex justify-center md:justify-start">
                            <select
                                name="data"
                                value={formData.data}
                                onChange={(e) => { setFormData({ ...formData, data: e.target.value }) }}
                                required
                                className={`w-64 border-b ${formData.data ? "text-black" : "text-gray-400"} border-gray-300 p-2 focus:outline-none focus:border-gray-500`}
                            >
                                <option value="" disabled >
                                    select data
                                </option>
                                {/* variables */}
                                {['order', 'title', 'cover photo', 'pages'].map((data) => (
                                    <option key={data} value={data} className='text-black'>
                                        {data.charAt(0).toUpperCase() + data.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* data to edit */}
                        {/* title of chapter */}
                        <div className={`flex justify-center md:justify-start ${formData.data == 'title' ? '' : 'hidden'}`}>
                            <input
                                type="text"
                                name="title"
                                value={formData.data == 'title' ? formData.edit : ''}
                                onChange={(e) => setFormData({ ...formData, edit: e.target.value })}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                placeholder="Insert title"
                            />
                        </div>
                        {/* order of the chapter*/}
                        <div className={`flex justify-center md:justify-start ${formData.data == 'order' ? '' : 'hidden'}`}>
                            <input
                                type="number"
                                name="order"
                                value={formData.data == 'order' ? formData.edit : ''}
                                onChange={(e) => {
                                    const newOrder = Number(e.target.value)
                                    // Verificar si el nuevo 'order' ya está en los capítulos
                                    const isOrderTaken = chapters.includes(newOrder)
                                    if (isOrderTaken) {
                                        alert(`Chapter ${newOrder} order already exists. Please choose a different order of the chapter.`)
                                    } else {
                                        // Solo actualizar el estado si el número no está tomado
                                        setFormData({ ...formData, edit: Number(e.target.value) })
                                    }
                                }}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                placeholder="Insert order"
                            />
                        </div>

                        {/*pages*/}

                        <div className={`flex justify-center md:justify-start ${formData.data == 'pages' ? '' : 'hidden'}`}>
                            <textarea
                                name="pages"
                                value={formData.data == 'pages' ? formData.edit : ''}
                                onChange={handlePagesChange}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500 resize-none overflow-hidden"
                                placeholder="Insert pages"
                                rows={1}
                                style={{ height: textAreaHeight }}
                            />

                        </div>
                        {/* cover photo */}
                        <div className={`flex justify-center md:justify-start ${formData.data == 'cover photo' ? '' : 'hidden'}`}>
                            <input
                                type="url"
                                name="pages"
                                value={formData.data == 'cover photo' ? formData.edit : ''}
                                onChange={(e) => setFormData({ ...formData, edit: e.target.value })}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                placeholder="URL of the cover photo"
                            />
                        </div>
                        {/* cover photo */}
                        <div className={`flex justify-center md:justify-start ${formData.data == '' ? '' : 'hidden'}`}>
                            <input
                                type="string"
                                name="cover_photo"
                                value={formData.edit}
                                onChange={(e) => setFormData({ ...formData, edit: e.target.value })}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                placeholder="data to edit"
                            />
                        </div>

                        {/* buttons */}

                        <div className="flex pt-8 w-[90%] justify-center items-center md:justify-start font-semibold">
                            <button
                                type="submit"
                                className="w-full text-lg bg-[#34D399] text-white py-2 rounded-full hover:bg transition-colors"
                            >
                                {loadingEdit ? "Editing..." : "Edit"} {/* Mostrar "Editing..." mientras está cargando */}
                            </button>
                        </div>

                        <div className="flex pb-8 justify-center w-[90%] pt-4 md:justify-start font-semibold">
                            <button
                                type="button"
                                onClick={() => dispatch(setShowDeleteModal(true))}
                                className="w-full text-lg bg-red-100 text-[#EE8380] py-2 rounded-full hover:bg-red-200 transition-colors"
                            >

                                Delete
                            </button>
                        </div>
                    </form>
                </div>


            </div>
            </div>
                <div className="w-full md:w-[45%] hidden md:flex ">
                {
                        loadingPhoto ? (<p className='flex text-2xl font-montserrat justify-items-center justify-center items-center text-center'> Loading photo...</p>) :

                            (
                                <div className="w-full md:w-full hidden md:flex">
                                <img
                                  className="w-full h-auto "
                                  src={mangaPhoto? mangaPhoto: 'https://media.wired.com/photos/59546725be605811a2fdceae/master/w_1600,c_limit/BobasWonderfulReturn.jpg'}
                                  alt="Background"
                                  onError={(e) => {
                                    e.target.src = 'https://images.squarespace-cdn.com/content/v1/593f201de3df288fc6465e6f/1621949179769-ZEZNWEU0ODIFGPCNGP5J/Saga+%2354.jpeg?format=1500w'
                                  }}
                                />
                              </div>
                            )
                    }
                </div>
            </div>
            {/* Modals */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-medium mb-4">Are you sure you want to delete?</h3>
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                                {chapters.length === 1 ?
                                    <h3 className="text-lg font-medium mb-4">Are you sure you want to delete this?
                                    You only have 1 chapter
                                    </h3>
                                    :
                                    <h3 className="text-lg font-medium mb-4">Are you sure you want to delete this?</h3>

                                        
                                }

                                <hr className="border-gray-300 my-4" />
                                <div className="flex items-center">
                                    <button
                                        onClick={() => dispatch(deleteChapter({ id }))} //debe mandar al endpoint de delete chapter
                                        className="flex-1 text-red-500 py-2"
                                    >

                                        {loadingDelete ? "Deliting..." : "Yes, I'm sure"} {/* Mostrar "Deliting..." mientras está cargando */}
                                    </button>
                                    <div className="w-px bg-gray-400 h-8 mx-4" />
                                    <button
                                        onClick={() => dispatch(setShowDeleteModal(false))}
                                        className="flex-1 text-blue-500 py-2"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {showSaveModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-medium mb-4">Your changes are saved correctly!</h3>
                        <hr className="border-gray-300 my-4" />
                        <button
                            onClick={() => dispatch(setShowSaveModal(false))}
                            className="w-full text-blue-500 py-2"
                        >
                            <NavLink to={'/manager'}> Accept</NavLink>
                        </button>
                    </div>
                </div>
            )}
            {showDeletedModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-medium mb-4 text-center">Your chapter is deleted!</h3>
                        <hr className="border-gray-300 my-4" />
                        <button
                            onClick={() => dispatch(setShowDeletedModal(false))}
                            className="w-full text-blue-500 py-2"
                        >
                            <NavLink to={'/manager'}> Accept</NavLink>
                        </button>
                    </div>
                </div>
            )}
            {showNoChaptersModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-medium mb-4 text-center">You don't have chapter, please go back to your panel!</h3>
                        <hr className="border-gray-300 my-4" />
                        <button
                            onClick={() => dispatch(setShowNoChaptersModal(true))}
                            className="w-full text-blue-500 py-2"
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