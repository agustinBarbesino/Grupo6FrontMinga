import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerAuthor } from '../../store/actions/authorActions'
import { useNavigate } from 'react-router-dom'

const CreateAuthor = () => {
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
        last_name: '',
        city: '',
        country: '',
        date: '',
        photo: '',
        user_id: ''
    })

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        last_name: '',
        city: '',
        country: '',
        date: '',
        photo: ''
      });

      const validateAuthorField = (name, value) => {
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
      
          case 'last_name':
            if (!value) {
              error = 'Last name is required.';
            } else if (!/^[A-Za-z\s]+$/.test(value)) {
              error = 'Last name must contain only letters.';
            } else if (value.length < 3) {
              error = 'Last name must be at least 3 characters long.';
            } else if (value.length > 20) {
              error = 'Last name must be at most 20 characters long.';
            }
            break;
      
          case 'city':
            if (!value) {
              error = 'City is required.';
            } else if (!/^[A-Za-z\s]+$/.test(value)) {
              error = 'City must contain only letters.';
            } else if (value.length < 2) {
              error = 'City must be at least 2 characters long.';
            } else if (value.length > 30) {
              error = 'City must be at most 30 characters long.';
            }
            break;
      
          case 'country':
            if (!value) {
              error = 'Country is required.';
            } else if (!/^[A-Za-z\s]+$/.test(value)) {
              error = 'Country must contain only letters.';
            } else if (value.length < 2) {
              error = 'Country must be at least 2 characters long.';
            } else if (value.length > 30) {
              error = 'Country must be at most 30 characters long.';
            }
            break;
      
          case 'date':
            if (!value) {
              error = 'Date is required.';
            } else if (isNaN(Date.parse(value))) {
              error = 'Date must be a valid date.';
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
    
        const error = validateAuthorField(id, value);
        setValidationErrors(prev => ({
          ...prev,
          [id]: error
        }));
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {
            name: validateAuthorField('name', formData.name),
            last_name: validateAuthorField('last_name', formData.last_name),
            city: validateAuthorField('city', formData.city),
            country: validateAuthorField('country', formData.country),
            date: validateAuthorField('date', formData.date),
            photo: validateAuthorField('photo', formData.photo)
          };
          
        setValidationErrors(errors);
          
        if (Object.values(errors).some(error => error !== '')) {
            return;
        }
        console.log(formData)
        dispatch(registerAuthor({...formData, user_id: userId}));
        rolChange()
        setShowSendModal(true)
        navigate('/home')
      }
    
    return (
        <>
            <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-8 items-start justify-center">
                {/* Form Section */}
                <div className="w-full pt-2">
                    <form className="space-y-2 flex flex-col justify-center items-center"
                        onSubmit={handleSubmit}>
                         {/* name of author */}
                         <div className="flex justify-center">
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-64 border-b ${
                                    validationErrors.name ? 'border-red-400' : 'border-gray-300'
                                    } border-gray-300 p-2 focus:outline-none focus:border-gray-500`}
                                placeholder="Name"
                            />
                            {validationErrors.name && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
                            )}
                        </div>
                         {/* last name of author */}
                         <div className="flex justify-center md:justify-start">
                            <input
                                type="text"
                                id="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                className={`w-64 border-b 
                                    ${
                                    validationErrors.last_name ? 'border-red-400' : 'border-gray-300'
                                    } border-gray-300 p-2 focus:outline-none focus:border-gray-500`}
                                placeholder="Last Name"
                            />
                            {validationErrors.last_name && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.last_name}</p>
                            )}
                        </div>
                         {/* city of author */}
                         <div className="flex justify-center md:justify-start">
                            <input
                                type="text"
                                id="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className={`w-64 border-b
                                    ${validationErrors.city ? 'border-red-400' : 'border-gray-300'
                                    } border-gray-300 p-2 focus:outline-none focus:border-gray-500`}
                                placeholder="City"
                            />
                            {validationErrors.city && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.city}</p>
                            )}
                        </div>
                         {/* country of author */}
                         <div className="flex justify-center md:justify-start">
                            <input
                                type="text"
                                id="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className={`w-64 border-b 
                                    ${validationErrors.country ? 'border-red-400' : 'border-gray-300'
                                    }border-gray-300 p-2 focus:outline-none focus:border-gray-500`}
                                placeholder="Country"
                            />
                            {validationErrors.country && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.country}</p>
                            )}
                        </div>
                         {/* date*/}
                         <div className="flex justify-center md:justify-start">
                            <input
                                type="date"
                                id="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className={`w-64 border-b
                                    ${validationErrors.date ? 'border-red-400' : 'border-gray-300'
                                    } border-gray-300 p-2 focus:outline-none focus:border-gray-500`}
                                placeholder="Date"
                            />
                            {validationErrors.date && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.date}</p>
                            )}
                        </div>
                       
                        {/*photo*/}
                        <div className="flex justify-center md:justify-start">
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
                            {validationErrors.photo && (
                                <p className="text-red-500 text-xs mt-1">{validationErrors.photo}</p>
                            )}
                        </div>
                        {/* buttons */}

                        <div className="flex py-8 w-[90%] justify-center items-center md:justify-start font-semibold">
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

export default CreateAuthor