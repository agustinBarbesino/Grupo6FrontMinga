import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerCompany } from '../../store/actions/companyActions'
import { setRole, updateUserRole } from '../../store/actions/roleActions' 
import { updateAuthUser, signOut } from '../../store/actions/authActions'

const CreateCompany = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user'))
    const authUser = useSelector(state => state.auth.user)
    const userId = user._id
    console.log(userId)

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
      

      const handleInputChange = (e) => {
        const { id, value } = e.target;
        
        setFormData(prev => ({
          ...prev,
          [id]: value
        }));
    
        const error = validateCompanyField(id, value);
        setValidationErrors(prev => ({
          ...prev,
          [id]: error
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {
            name: validateCompanyField('name', formData.name),
            website: validateCompanyField('website', formData.website),
            photo: validateCompanyField('photo', formData.photo),
            description: validateCompanyField('description', formData.description),
          };
          
        setValidationErrors(errors);
          
        if (Object.values(errors).some(error => error !== '')) {
            return;
        }
      
        const newCompany = await dispatch(registerCompany({...formData, user_id: userId}));

        dispatch(setRole(2))

        const updatedUser = { ...user, 
          role: 2, 
          company_id: newCompany.payload._id,
          active: true, 
          company_photo: newCompany.payload.photo }
        
        localStorage.removeItem('user')  
        localStorage.setItem('user', JSON.stringify(updatedUser))

        dispatch(updateAuthUser(updatedUser))
        setShowSendModal(true)
        navigate('/')
      }

    return (
        <>
            <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                {/* Form Section */}
                <div className="w-full pt-2">
                    <form className="space-y-2"
                        onSubmit={handleSubmit}>
                         {/* name of company */}
                         <div className="flex flex-col justify-center md:justify-start">
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-64 border-b
                                    ${validationErrors.name ? 'border-red-400' : 'border-gray-300'
                                    } border-gray-300 p-2 focus:outline-none focus:border-gray-500`}
                                placeholder="Name"
                            />
                            <p
                              className={`text-xs text-red-500 transition-all duration-300 ${
                              validationErrors.name ? 'opacity-100 mt-1' : 'opacity-0 h-0'
                              }`}
                            >
                              {validationErrors.name || ''}
                            </p>
                        </div>
                        {/*website*/}
                        <div className="flex flex-col justify-center md:justify-start">
                            <input
                                type="url"
                                id="website"
                                value={formData.website}
                                onChange={handleInputChange}
                                className={`w-64 border-b
                                    ${validationErrors.website ? 'border-red-400' : 'border-gray-300'
                                    } border-gray-300 p-2 focus:outline-none focus:border-gray-500`}
                                placeholder="Website"
                            />
                            <p
                              className={`text-xs text-red-500 transition-all duration-300 ${
                              validationErrors.website ? 'opacity-100 mt-1' : 'opacity-0 h-0'
                              }`}
                            >
                              {validationErrors.website || ''}
                            </p>
                        </div>
                        {/*photo*/}
                        <div className="flex flex-col justify-center md:justify-start">
                            <input
                                type="url"
                                id="photo"
                                value={formData.photo}
                                onChange={handleInputChange}
                                className={`w-64 border-b
                                    ${validationErrors.photo ? 'border-red-400' : 'border-gray-300'
                                    } border-gray-300 p-2 focus:outline-none focus:border-gray-500`}
                                placeholder="URL Profile Image"
                            />
                            <p
                              className={`text-xs text-red-500 transition-all duration-300 ${
                              validationErrors.photo ? 'opacity-100 mt-1' : 'opacity-0 h-0'
                              }`}
                            >
                              {validationErrors.photo || ''}
                            </p>
                        </div>
                         {/* description of company*/}
                         <div className="flex flex-col justify-center md:justify-start">
                            <input
                                type="text"
                                id="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className={`w-64 border-b
                                    ${validationErrors.description ? 'border-red-400' : 'border-gray-300'
                                    } border-gray-300 p-2 focus:outline-none focus:border-gray-500`}
                                placeholder="Description"
                            />
                            <p
                              className={`text-xs text-red-500 transition-all duration-300 ${
                              validationErrors.description ? 'opacity-100 mt-1' : 'opacity-0 h-0'
                              }`}
                            >
                              {validationErrors.description || ''}
                            </p>
                        </div>
                        
                        {/* buttons */}

                        <div className="flex py-8 w-full font-semibold">
                            <button
                                type="submit"
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