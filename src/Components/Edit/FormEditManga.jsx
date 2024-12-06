import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { fetchCategories } from '../../store/actions/categoryActions.js'
import { editManga, deleteManga, setShowSaveModal, setShowDeleteModal, setShowDeletedModal } from '../../store/actions/editActions.js'

const FormEditManga = () => {
    const dispatch = useDispatch()
    const { title } = useParams()
    const { showSaveModal, showDeleteModal, showDeletedModal, mangaData, loading, loadingDelete, deleteSuccess } = useSelector((state) => state.editMangas)
    const categories = useSelector((state) => state?.categories?.categories || []) //traemos categorias
    useEffect(() => {
        dispatch(fetchCategories())  //
    }, [dispatch])
    const categorias = categories.map((category) => category.name)
    const [category, setCategory] = useState('')
    const handleChangeData = (e) => {
        setFormData({ ...formData, data: e.target.value })
    }
    const handleChangeCategory = (e) => {
        setCategory(e.target.value) // Actualiza el estado con el valor seleccionado
    }
    const initialFormData = {
        title: title,
        data: '',
        edit: '',
    }
    const [formData, setFormData] = useState(initialFormData)
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editManga({ formData }))
        setFormData(initialFormData)
    }
    const handleDelete = () => {
        dispatch(deleteManga({ title }))
    }
    useEffect(() => {
        if (mangaData) {
            dispatch(setShowSaveModal(true))
        }
    }, [mangaData, dispatch])
    useEffect(() => {
        if (deleteSuccess) {
            dispatch(setShowDeleteModal(false))
            dispatch(setShowDeletedModal(true))
        }
    }, [deleteSuccess, dispatch])
    return (
        <>
            <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                {/* Form Section */}
                <div className="w-full pt-2">
                    <form onSubmit={handleSubmit} className="space-y-2">
                        {/* name of manga */}
                        <div className="flex justify-start w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500">
                            <p>{title}</p>
                        </div>
                        {/* select data */}
                        <div className="flex justify-center md:justify-start">
                            <select
                                name="data"
                                value={formData.data}
                                onChange={handleChangeData}
                                required
                                className={`w-64 border-b ${formData.data ? "text-black" : "text-gray-400"} border-gray-300 p-2 focus:outline-none focus:border-gray-500`}
                            >
                                <option value="" disabled >
                                    select data
                                </option>
                                {['title', 'cover Photo', 'description', 'category'].map((data) => (
                                    <option key={data} value={data} className='text-black'>
                                        {data.charAt(0).toUpperCase() + data.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* data to edit */}
                        <div className="flex justify-center md:justify-start">
                            {formData.data === "category" ?
                                /* si es categoria se despliega las categorias que tenemos */
                                (
                                    <div className="flex justify-center md:justify-start">
                                        <select
                                            name="category"
                                            value={category}
                                            onChange={handleChangeCategory}
                                            required
                                            className={`w-64 border-b ${category ? "text-black" : "text-gray-400"} border-gray-300 p-2 focus:outline-none focus:border-gray-500`}
                                        >
                                            <option value="" disabled >
                                                select category
                                            </option>
                                            {categorias.map((category) => (
                                                <option key={category} value={category} className='text-black'>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                ) :
                                (<textarea
                                    name="data"
                                    value={formData.edit}
                                    onChange={(e) => setFormData({ ...formData, edit: e.target.value })}
                                    className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500 resize-none overflow-hidden"
                                    placeholder="data to edit"
                                    rows={1}
                                    onInput={(e) => {
                                        e.target.style.height = "auto"
                                        e.target.style.height = `${e.target.scrollHeight}px`
                                    }}
                                />)}
                        </div>

                        {/* buttons */}

                        <div className="flex py-8 w-[90%] justify-center items-center md:justify-start font-semibold">
                            <button
                                type="submit"
                                className="w-full text-lg bg-[#34D399] text-white py-2 rounded-full hover:bg transition-colors"
                            >
                                {loading ? "Editing..." : "Edit"} {/* Mostrar "Editing..." mientras está cargando */}
                            </button>
                        </div>

                        <div className="flex justify-center w-[90%] pt-4 md:justify-start font-semibold">
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
            {/* Modals */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-medium mb-4">Are you sure you want to delete?</h3>
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                                <h3 className="text-lg font-medium mb-4">Are you sure you want to delete this?</h3>
                                <hr className="border-gray-300 my-4" />
                                <div className="flex items-center">
                                    <button
                                        onClick={handleDelete} //debe mandar al endpoint de delete manga
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
                            Accept
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
                            Accept
                        </button>
                    </div>
                </div>
            )}
        </>
    )

}

export default FormEditManga