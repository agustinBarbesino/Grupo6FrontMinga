import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerCompany } from '../../store/actions/companyActions'

const CreateCompany = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user._id
    console.log(userId)

    const role = useSelector(state => state.role.selectedRole)

    const rolChange = () => {
        user.role = role
    }

    const [showSendModal, setShowSendModal] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        website: '',
        photo: '',
        description: '',
        user_id: ''
    })

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        website: '',
        photo: '',
        description: ''
      });

      const validateCompanyField = (name, value) => {
        let error = '';
      
        switch (name) {
          case 'name':
            if (!value) {
              error = 'Name is required.';
            } else if (!/^[A-Za-z\s]+$/.test(value)) {
              error = 'Name must contain only letters.';
            } else if (value.length < 3) {
              error = 'Name must be at least 3 characters long.';
            } else if (value.length > 20) {
              error = 'Name must be at most 20 characters long.';
            }
            break;
      
          case 'website':
            if (!value) {
              error = 'Website is required.';
            } else if (!/^https?:\/\/\S+\.\S+$/.test(value)) {
              error = 'Website must be a valid URL.';
            }
            break;
      
          case 'description':
            if (!value) {
              error = 'Description is required.';
            } else if (value.length < 10) {
              error = 'Description must be at least 10 characters long.';
            } else if (value.length > 1000) {
              error = 'Description must be at most 1000 characters long.';
            }
            break;
      
          case 'photo':
            if (!value) {
              error = 'Photo URL is required.';
            } else if (!/^https?:\/\/\S+\.\S+$/.test(value)) {
              error = 'Photo must be a valid URL.';
            }
            break;
      
          default:
            break;
        }
      
        return error;
      };
      

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerCompany({ ...formData, user_id: user._id }));
        setShowSendModal(true);
        rolChange()
      }

    return (
        <>
            <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                {/* Form Section */}
                <div className="w-full pt-2">
                    <form className="space-y-2"
                        onSubmit={handleSubmit}>
                         {/* name of company */}
                         <div className="flex justify-center md:justify-start">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                placeholder="Name"
                            />
                        </div>
                        {/*website*/}
                        <div className="flex justify-center md:justify-start">
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                placeholder="Website"
                            />
                        </div>
                        {/*photo*/}
                        <div className="flex justify-center md:justify-start">
                            <input
                                type="url"
                                name="photo"
                                value={formData.photo}
                                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                placeholder="URL Profile Image"
                            />
                        </div>
                         {/* description of company*/}
                         <div className="flex justify-center md:justify-start">
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-64 border-b border-gray-300 p-2 focus:outline-none focus:border-gray-500"
                                placeholder="Description"
                            />
                        </div>
                        
                        {/* buttons */}

                        <div className="flex py-8 w-[90%] justify-center items-center md:justify-start font-semibold">
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

export default CreateCompany