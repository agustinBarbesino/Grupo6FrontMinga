import { React, useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { fetchCategories } from '../../store/actions/categoryActions.js'
import { editManga, deleteManga, setShowSaveModal, setShowDeleteModal, setShowDeletedModal, getMangaPhoto } from '../../store/actions/editActions.js'
import { selectIsDarkMode } from '../../store/actions/darkModeActions'

const FormEditManga = () => {
    const dispatch = useDispatch()
    const isDarkMode = useSelector(selectIsDarkMode)
    const { title } = useParams()
    const { showSaveModal, showDeleteModal, showDeletedModal, mangaData, loadingEdit, loadingDelete, deleteSuccess, initialFormDataManga, mangaPhoto, loadingPhoto } = useSelector((state) => state.editMangas)
    const categories = useSelector((state) => state?.categories?.categories || [])
    const categorias = categories.map((category) => category.name)
    const [formData, setFormData] = useState(initialFormDataManga)
    const [category, setCategory] = useState('')

    useEffect(() => {
        dispatch(fetchCategories())
        setFormData({ ...formData, title: title })
        dispatch(getMangaPhoto({ title }))
    }, [])

    useEffect(() => {
        if (category) {
            let cat = categories.find(c => c.name == category)
            setFormData({ ...formData, edit: cat._id })
        }
    }, [category])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editManga({ formData }))
        setFormData(initialFormDataManga)
    }

    useEffect(() => {
        if (mangaData) {
            dispatch(setShowSaveModal(true))
            setFormData({ ...formData, title: title })
        } else if (deleteSuccess) {
            dispatch(setShowDeleteModal(false))
            dispatch(setShowDeletedModal(true))
        }
    }, [mangaData, deleteSuccess])

    return (
        <>
            <div className="flex justify-between">
                <div className={`flex py-2 pt-24 flex-col justify-center justify-items-center items-center w-full md:w-[60%] font-montserrat ${
                    isDarkMode ? 'bg-dark-bg-primary' : 'bg-white'
                }`}>
                    <h1 className={`text-2xl my-16 ${isDarkMode ? 'text-dark-text-primary' : ''}`}>Edit Manga</h1>
                    <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                        <div className="w-full pt-2">
                            <form onSubmit={handleSubmit} className="space-y-2">
                                <div className={`flex justify-start w-64 border-b ${
                                    isDarkMode ? 'border-gray-600 text-dark-text-primary' : 'border-gray-300'
                                } p-2 focus:outline-none focus:border-gray-500`}>
                                    <p>{title}</p>
                                </div>
                                
                                <div className="flex justify-center md:justify-start">
                                    <select
                                        name="data"
                                        value={formData.data}
                                        onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                                        required
                                        className={`w-64 border-b ${
                                            isDarkMode 
                                                ? `bg-dark-bg-secondary text-dark-text-primary border-gray-600 ${formData.data ? "" : "text-gray-500"}` 
                                                : `bg-white ${formData.data ? "text-black" : "text-gray-400"} border-gray-300`
                                        } p-2 focus:outline-none focus:border-gray-500`}
                                    >
                                        <option value="" disabled>
                                            select data
                                        </option>
                                        {['title', 'cover Photo', 'description', 'category'].map((data) => (
                                            <option key={data} value={data} className={
                                                isDarkMode ? 'bg-dark-bg-secondary text-dark-text-primary' : 'text-black'
                                            }>
                                                {data.charAt(0).toUpperCase() + data.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex justify-center md:justify-start">
                                    {formData.data === "category" ? (
                                        <div className="flex justify-center md:justify-start">
                                            <select
                                                name="data"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                required
                                                className={`w-64 border-b ${
                                                    isDarkMode 
                                                        ? `bg-dark-bg-secondary text-dark-text-primary border-gray-600 ${category ? "" : "text-gray-500"}` 
                                                        : `bg-white ${category ? "text-black" : "text-gray-400"} border-gray-300`
                                                } p-2 focus:outline-none focus:border-gray-500`}
                                            >
                                                <option value="" disabled>
                                                    Insert category
                                                </option>
                                                {categorias.map((category) => (
                                                    <option key={category} value={category} className={
                                                        isDarkMode ? 'bg-dark-bg-secondary text-dark-text-primary' : 'text-black'
                                                    }>
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <textarea
                                            name="data"
                                            value={formData.edit}
                                            onChange={(e) => setFormData({ ...formData, edit: e.target.value })}
                                            className={`w-64 border-b p-2 focus:outline-none focus:border-gray-500 resize-none overflow-hidden ${
                                                isDarkMode 
                                                    ? 'bg-dark-bg-secondary text-dark-text-primary border-gray-600' 
                                                    : 'bg-white border-gray-300'
                                            }`}
                                            placeholder="data to edit"
                                            rows={1}
                                            onInput={(e) => {
                                                e.target.style.height = "auto"
                                                e.target.style.height = `${e.target.scrollHeight}px`
                                            }}
                                        />
                                    )}
                                </div>

                                <div className="flex pt-8 w-[90%] justify-center items-center md:justify-start font-semibold">
                                    <button
                                        type="submit"
                                        className="w-full text-lg bg-[#34D399] text-white py-2 rounded-full hover:bg-[#3de0a5] transition-colors"
                                    >
                                        {loadingEdit ? "Editing..." : "Edit"}
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
                <div className="w-full md:w-[45%] hidden md:flex">
                    {loadingPhoto ? (
                        <p className={`flex text-2xl font-montserrat justify-items-center justify-center items-center text-center ${
                            isDarkMode ? 'text-dark-text-primary' : ''
                        }`}>
                            Loading photo...
                        </p>
                    ) : (
                        <div className="w-full md:w-full h-screen hidden md:flex">
                            <img
                                className="w-full h-auto"
                                src={mangaPhoto}
                                alt="Background"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className={`${
                        isDarkMode ? 'bg-dark-bg-secondary' : 'bg-white'
                    } rounded-lg p-6 max-w-sm w-full`}>
                        <h3 className={`text-lg font-medium mb-4 ${
                            isDarkMode ? 'text-dark-text-primary' : ''
                        }`}>Are you sure you want to delete this?</h3>
                        <hr className={isDarkMode ? 'border-gray-600' : 'border-gray-300'} />
                        <div className="flex items-center">
                            <button
                                onClick={() => dispatch(deleteManga({ title }))}
                                className="flex-1 text-red-500 py-2 hover:text-red-400"
                            >
                                {loadingDelete ? "Deleting..." : "Yes, I'm sure"}
                            </button>
                            <div className={`w-px h-8 mx-4 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`} />
                            <button
                                onClick={() => dispatch(setShowDeleteModal(false))}
                                className="flex-1 text-blue-500 py-2 hover:text-blue-400"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSaveModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className={`${
                        isDarkMode ? 'bg-dark-bg-secondary' : 'bg-white'
                    } rounded-lg p-6 max-w-sm w-full`}>
                        <h3 className={`text-lg font-medium mb-4 ${
                            isDarkMode ? 'text-dark-text-primary' : ''
                        }`}>Your changes are saved correctly!</h3>
                        <hr className={isDarkMode ? 'border-gray-600' : 'border-gray-300'} />
                        <button
                            onClick={() => dispatch(setShowSaveModal(false))}
                            className="w-full text-blue-500 py-2 hover:text-blue-400"
                        >
                            <NavLink to={'/manager'}> Accept</NavLink>
                        </button>
                    </div>
                </div>
            )}

            {showDeletedModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className={`${
                        isDarkMode ? 'bg-dark-bg-secondary' : 'bg-white'
                    } rounded-lg p-6 max-w-sm w-full`}>
                        <h3 className={`text-lg font-medium mb-4 text-center ${
                            isDarkMode ? 'text-dark-text-primary' : ''
                        }`}>Your manga is deleted!</h3>
                        <hr className={isDarkMode ? 'border-gray-600' : 'border-gray-300'} />
                        <button
                            onClick={() => dispatch(setShowDeletedModal(false))}
                            className="w-full text-blue-500 py-2 hover:text-blue-400"
                        >
                            <NavLink to={'/manager'}> Accept</NavLink>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default FormEditManga