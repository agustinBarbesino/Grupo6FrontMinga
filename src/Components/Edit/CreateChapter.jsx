import { React, useState } from 'react'

const CreateChapter = () => {
    const [showSendModal, setShowSendModal] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        order: '',
        pages: '',
    })
    return (
        <>
            <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                {/* Form Section */}
                <div className="w-full pt-2">
                    <form className="space-y-2">
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
                                onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                placeholder="Insert order"
                            />
                        </div>
                       
                        {/*pages*/}
                        
                        <div className="flex justify-center md:justify-start">
                        <textarea
                                    name="pages"
                                    value={formData.pages}
                                    onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                                    className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500 resize-none overflow-hidden"
                                    placeholder="Insert pages"
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
                                type="button"
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

export default CreateChapter