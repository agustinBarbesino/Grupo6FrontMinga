import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchCategories } from '../../store/actions/categoryActions.js'
import { createManga } from '../../store/actions/newActions.js'


const CreateManga = () => {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state?.categories?.categories || []) //traemos categorias
    const rol = 1 // rol del usuario traer con estado
    const modifier = '6750a0c15da1e9bc5c771f08' // traer del estado global el id de usuario o compania
    useEffect(() => {
        dispatch(fetchCategories())  //
    }, [dispatch])
    /* modal que confirma envio */
    const [showSendModal, setShowSendModal] = useState(false)
    /* para los nombres de las categoras */
    const categorias = categories.map((category) => category.name)
    /* para actualizar la categoria segun la seleccionada */
    const [category, setCategory] = useState('')
    /* se manda el id de la categoria selecionada al form para crear manga */
    const handleChangeCategory = (e) => {
        const selectedCategory = e.target.value
        setCategory(e.target.value)
        let cat = categories.find(c => c.name == selectedCategory)
        setFormData({ ...formData, category_id: cat._id })
    }
    /* estado inicial de los datos que se van a mandar a creacion */
    const initialFormData = {
        title: '',
        category_id: '',
        description: '',
        cover_photo: '',
    }
    const [formData, setFormData] = useState(initialFormData)
    /* boton de enviar para enviar la info y limpiar formulario, segun el rol se manda autor o compania id */
    const handleSubmit = (e) => {
        e.preventDefault()
        let updatedFormData = { ...formData }
        // Agregar `author_id` o `company_id` basado en el rol
        if (rol === 1) {
            updatedFormData.author_id = modifier
        } else if (rol === 2) {
            updatedFormData.company_id = modifier
        }
        dispatch(createManga({ updatedFormData }))
        setFormData(initialFormData)
        setCategory('')
    }
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
                            />
                        </div>
                        {/* select category */}
                        <div className="flex justify-center md:justify-start">
                            <select
                                name="data"
                                value={category}
                                onChange={handleChangeCategory}
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
                        {/* title of manga */}
                        <div className="flex justify-center md:justify-start">
                            <input
                                type="text"
                                name="cover_photo"
                                value={formData.cover_photo}
                                onChange={(e) => setFormData({ ...formData, cover_photo: e.target.value })}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                placeholder="Insert link of the cover photo"
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
                            />
                        </div>

                        {/* buttons */}

                        <div className="flex pt-16 w-[90%] justify-center items-center md:justify-start font-semibold">
                            <button
                                type="submit"
                                onClick={() => setShowSendModal(true)}
                                className="w-full text-lg bg-pink-gradient text-white py-2 rounded-full hover:bg transition-colors"
                            >
                                Send
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
                            onClick={() => setShowSendModal(false)}
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

export default CreateManga