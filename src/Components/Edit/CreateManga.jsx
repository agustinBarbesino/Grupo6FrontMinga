import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchCategories } from '../../store/actions/categoryActions.js'
import { createManga, setShowSendModal } from '../../store/actions/newActions.js'
import { NavLink } from 'react-router-dom'


const CreateManga = () => {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state?.categories?.categories || []) //traemos categorias
    const user = JSON.parse(localStorage.getItem('user'))
    /* estado de modal, data de mangas y cargando */
    const { showSendModal, mangaData, loading, initialFormDataManga } = useSelector((state) => state.newManga)
    const [formData, setFormData] = useState(initialFormDataManga)
    useEffect(() => {
        dispatch(fetchCategories())
        if (user.author_id) {
            setFormData({ ...formData, author_id: user.author_id })
        } else if (user.company_id) {
            setFormData({ ...formData, company_id: user.company_id })
        }
    }, [dispatch])
    /* para los nombres de las categoras */
    const categorias = categories.map((category) => category.name)
    /* para actualizar la categoria segun la seleccionada */
    const [category, setCategory] = useState('')
    useEffect(() => {
        if (category) {
            let cat = categories.find(c => c.name == category)
            setFormData({ ...formData, category_id: cat._id })
           
        }
       
    }, [category])
    
    /* boton de enviar para enviar la info y limpiar formulario, segun el rol se manda autor o compania id */
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('datos', formData)
        dispatch(createManga({ formData }))
        setFormData(initialFormDataManga)
        setCategory('')
    }
    /* Si el manga fue creado con éxito, mostramos el modal */
    useEffect(() => {
        if (mangaData) {
            dispatch(setShowSendModal(true))
        }
    }, [mangaData])
    return (
        <>
            <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                {/* Form Section */}
                <div className="w-full pt-2" >
                    <form onSubmit={handleSubmit} className="space-y-2">
                        {/* title of manga */}
                        <div className="flex justify-center md:justify-start">
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                placeholder="Insert title"
                                required
                            />
                        </div>
                        {/* select category */}
                        <div className="flex justify-center md:justify-start">
                            <select
                                name="data"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                className={`w-64 border-b ${category ? "text-black" : "text-gray-400"} border-gray-300 p-2 focus:outline-none focus:border-gray-500`}
                            
                            >
                                <option value="" disabled >
                                    Insert category
                                </option>
                                {categorias.map((category) => (
                                    <option key={category} value={category} className='text-black'>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* cover photo */}
                        <div className="flex justify-center md:justify-start">
                            <input
                                type="text"
                                name="cover_photo"
                                value={formData.cover_photo}
                                onChange={(e) => setFormData({ ...formData, cover_photo: e.target.value })}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                placeholder="Insert link of the cover photo"
                                required
                            />
                        </div>

                        {/* description*/}
                        <div className="flex justify-center md:justify-start">
                            <textarea
                                name="data"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500 resize-none overflow-hidden"
                                placeholder="Insert description"
                                rows={1}
                                onInput={(e) => {
                                    e.target.style.height = "auto"
                                    e.target.style.height = `${e.target.scrollHeight}px`
                                }}
                                required
                            />
                        </div>

                        {/* buttons */}

                        <div className="flex justify-center py-8 w-full font-semibold">
                            <button
                                type="submit"
                                className="w-64 text-lg bg-pink-gradient text-white py-2 rounded-full hover:bg hover:transition-colors"
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
                        <h3 className="text-lg font-medium mb-4">Your manga has been created correctly!</h3>
                        <hr className="border-gray-300 my-4" />
                        <button
                            onClick={() => dispatch(setShowSendModal(false))}
                            className="w-full text-blue-500 py-2"
                        >
                            <NavLink to={'/manager'}> Accept</NavLink>
                        </button>
                    </div>
                </div>
            )}
        </>
    )

}

export default CreateManga