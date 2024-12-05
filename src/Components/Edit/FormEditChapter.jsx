import {React, useState }from 'react'

const FormEditChapter = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showSaveModal, setShowSaveModal] = useState(false)
    const chapters = ['cap1', 'cap2']
    const dataToEdit = ['order', 'title']
    const [chapter, setChapter] = useState('')
    const [data, setData] = useState('')
    const handleChangeChapter = (e) => {
        setChapter(e.target.value) // Actualiza el estado con el valor seleccionado
    }
    const handleChangeData = (e) => {
        setData(e.target.value) // Actualiza el estado con el valor seleccionado
    }
    const [formData, setFormData] = useState({
        name: '',
        chapter: '',
        data: '',
        edit: '',
        })
    return (
        <>
            <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                {/* Form Section */}
                <div className="w-full pt-2">
                    <form className="space-y-2">
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
                                value={chapter}
                                onChange={handleChangeChapter}
                                required
                                className={`w-64 border-b ${chapter ? "text-black" : "text-gray-400"} border-gray-300 p-2 focus:outline-none focus:border-gray-500`}
                            >
                                <option value="" disabled >
                                    select chapter
                                </option>
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
                                value={data}
                                onChange={handleChangeData}
                                required
                                className={`w-64 border-b ${data ? "text-black" : "text-gray-400"} border-gray-300 p-2 focus:outline-none focus:border-gray-500`}
                            >
                                <option value="" disabled >
                                    select data
                                </option>
                                {dataToEdit.map((data) => (
                                    <option key={data} value={data} className='text-black'>
                                        {data}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* data to edit */}
                        <div className="flex justify-center md:justify-start">
                            <input
                                type="text"
                                name="data"
                                value={formData.edit}
                                onChange={(e) => setFormData({ ...formData, edit: e.target.value })}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                placeholder="data to edit"
                            />
                        </div>

                        {/* buttons */}

                        <div className="flex pt-16 w-[90%] justify-center items-center md:justify-start font-semibold">
                            <button
                                type="submit"
                                onClick={() => setShowSaveModal(true)}
                                className="w-full text-lg bg-[#34D399] text-white py-2 rounded-full hover:bg transition-colors"
                            >
                                Edit
                            </button>
                        </div>

                        <div className="flex justify-center w-[90%] pt-4 md:justify-start font-semibold">
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(true)}
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
                                        onClick={() => setShowDeleteModal(false)}
                                        className="flex-1 text-red-500 py-2"
                                    >
                                        Yes, I'm sure
                                    </button>
                                    <div className="w-px bg-gray-400 h-8 mx-4" />
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
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
                            onClick={() => setShowSaveModal(false)}
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

export default FormEditChapter