import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchCategories } from '../../store/actions/categoryActions.js'
import { createManga, setShowSendModal } from '../../store/actions/newActions.js'
import { NavLink } from 'react-router-dom'
import { selectIsDarkMode } from "../../store/actions/darkModeActions"

const CreateManga = () => {
    const dispatch = useDispatch()
    const isDarkMode = useSelector(selectIsDarkMode)
    const categories = useSelector((state) => state?.categories?.categories || [])
    const user = JSON.parse(localStorage.getItem('user'))
    const { showSendModal, mangaData, loading, initialFormDataManga } = useSelector((state) => state.newManga)
    const [formData, setFormData] = useState(initialFormDataManga)
    const [category, setCategory] = useState('')

    useEffect(() => {
        dispatch(fetchCategories())
        if (user.author_id) {
            setFormData({ ...formData, author_id: user.author_id })
        } else if (user.company_id) {
            setFormData({ ...formData, company_id: user.company_id })
        }
    }, [dispatch])

    const categorias = categories.map((category) => category.name)

    useEffect(() => {
        if (category) {
            let cat = categories.find(c => c.name == category)
            setFormData({ ...formData, category_id: cat._id })
        }
    }, [category])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createManga({ formData }))
        setFormData(initialFormDataManga)
        setCategory('')
    }

    useEffect(() => {
        if (mangaData) {
            dispatch(setShowSendModal(true))
        }
    }, [mangaData])

    return (
        <>
            <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                <div className="w-full pt-2">
                    <form onSubmit={handleSubmit} className="space-y-2">
                        {/* title of manga */}
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
                                className={`w-64 border-b p-2 focus:outline-none ${
                                    isDarkMode 
                                    ? 'bg-dark-bg-secondary border-gray-600 focus:border-gray-400' 
                                    : 'bg-white border-gray-300 focus:border-gray-500'
                                } ${
                                    category 
                                    ? isDarkMode ? 'text-dark-text-primary' : 'text-black'
                                    : 'text-gray-400'
                                }`}
                            >
                                <option value="" disabled>Insert category</option>
                                {categorias.map((category) => (
                                    <option 
                                        key={category} 
                                        value={category} 
                                        className={isDarkMode ? 'bg-dark-bg-secondary text-dark-text-primary' : 'bg-white text-black'}
                                    >
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
                                className={`w-64 border-b p-2 focus:outline-none ${
                                    isDarkMode 
                                    ? 'bg-dark-bg-secondary text-dark-text-primary border-gray-600 focus:border-gray-400 placeholder-gray-500' 
                                    : 'bg-white text-black border-gray-300 focus:border-gray-500 placeholder-gray-400'
                                }`}
                                placeholder="Insert link of the cover photo"
                                required
                            />
                        </div>

                        {/* description */}
                        <div className="flex justify-center md:justify-start">
                            <textarea
                                name="data"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className={`w-64 border-b p-2 focus:outline-none resize-none overflow-hidden ${
                                    isDarkMode 
                                    ? 'bg-dark-bg-secondary text-dark-text-primary border-gray-600 focus:border-gray-400 placeholder-gray-500' 
                                    : 'bg-white text-black border-gray-300 focus:border-gray-500 placeholder-gray-400'
                                }`}
                                placeholder="Insert description"
                                rows={1}
                                onInput={(e) => {
                                    e.target.style.height = "auto"
                                    e.target.style.height = `${e.target.scrollHeight}px`
                                }}
                                required
                            />
                        </div>

                        {/* button */}
                        <div className="flex justify-center py-8 w-full font-semibold">
                            <button
                                type="submit"
                                className="w-64 text-lg bg-pink-gradient text-white py-2 rounded-full hover:bg hover:transition-colors"
                            >
                                {loading ? "Sending..." : "Send"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal */}
            {showSendModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className={`rounded-lg p-6 max-w-sm w-full ${isDarkMode ? 'bg-dark-bg-secondary' : 'bg-white'}`}>
                        <h3 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-dark-text-primary' : 'text-black'}`}>
                            Your manga has been created correctly!
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

export default CreateManga