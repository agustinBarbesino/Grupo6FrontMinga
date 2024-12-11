import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Cake, Globe } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { editCompany, deleteCompany } from '../../store/actions/companyActions';
import { editAuthor, deleteAuthor } from '../../store/actions/authorActions';
import { setRole, updateUserRole } from '../../store/actions/roleActions';
import { updateAuthUser, signOut } from '../../store/actions/authActions';
import { selectIsDarkMode } from '../../store/actions/darkModeActions';

const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isDarkMode = useSelector(selectIsDarkMode);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user._id
    const profile = JSON.parse(localStorage.getItem('profile'))

    const isCompany = user.company_id ? true : false
    const profileData = isCompany ? {
        name: profile.name,
        website: profile.website,
        photo: profile.photo,
        description: profile.description,
    } : {
        name: profile.name,
        last_name: profile.last_name,
        city: profile.city,
        country: profile.country,
        date: new Date(profile.date).toISOString().split('T')[0],
        photo: profile.photo,
    }
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [formData, setFormData] = useState({
        ...profileData, user_id: ''
    });

    const [validationErrors, setValidationErrors] = useState({});

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
    
        const error = isCompany ? 
        validateCompanyField(id, value) : 
        validateAuthorField(id, value);
        setValidationErrors(prev => ({
          ...prev,
          [id]: error
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = isCompany? {
            name: validateCompanyField('name', formData.name),
            website: validateCompanyField('website', formData.website),
            photo: validateCompanyField('photo', formData.photo),
            description: validateCompanyField('description', formData.description)
        } : {
            name: validateAuthorField('name', formData.name),
            last_name: validateAuthorField('last_name', formData.last_name),
            city: validateAuthorField('city', formData.city),
            country: validateAuthorField('country', formData.country),
            date: validateAuthorField('date', formData.date),
            photo: validateAuthorField('photo', formData.photo)
        }
    
        setValidationErrors(errors);
          
        if (Object.values(errors).some(error => error !== '')) {
            return;
        }

        dispatch(isCompany ? 
            editCompany({id: user.company_id, ...formData, user_id: userId}) : 
            editAuthor({id: user.author_id, ...formData, user_id: userId})
        );
        setShowSaveModal(true)
        navigate('/profile')
    }

    const handleDeleteAccount = (e) => {
        e.preventDefault() 
        dispatch(isCompany ? deleteCompany(user.company_id):
                            deleteAuthor(user.author_id));
        dispatch(updateUserRole({id: userId, role: 0}))
        dispatch(setRole(0))
        const updatedUser = { ...user, role: 0 }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        dispatch(updateAuthUser(updatedUser))
        dispatch(signOut())
        setShowDeleteModal(false)
        navigate('/')
    }

    return (
        <div className="min-h-screen relative pt-32 bg-white dark:bg-dark-bg-primary">
            {/* Background - hidden on mobile */}
            <div className="absolute inset-0 hidden md:block" style={{ zIndex: 1 }}>
                <div className="relative w-full h-[60%]">
                    <div className="absolute inset-0 bg-footer bg-cover bg-center"></div>
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>
                <div className="w-full h-1/2 bg-white dark:bg-dark-bg-primary"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 container mx-auto px-4">
                {/* Title */}
                <h1 className="hidden md:block text-6xl font-bold text-center text-white pt-8">Profile</h1>

                {/* Content container */}
                <div className="md:mt-[30vh] rounded-lg shadow-lg p-8 max-w-8xl mx-auto bg-white dark:bg-dark-bg-secondary dark:text-dark-text-primary">
                    {/* Mobile profile image */}
                    <div className="md:hidden flex justify-center mb-8">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                            <img
                                src={formData.photo}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                        {/* Form Section */}
                        <div className="w-full md:w-1/3 flex flex-col justify-center items-center">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {isCompany ? (
                                    <>
                                        <div className="flex flex-col justify-center md:justify-start">
                                            <input
                                                type="text"
                                                id="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-64 border-b p-2 focus:outline-none border-gray-300 dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400"
                                                placeholder="Name"
                                            />
                                            <p className={`text-xs text-red-500 transition-all duration-300 ${
                                                validationErrors.name ? 'opacity-100 mt-1' : 'opacity-0 h-0'
                                            }`}>
                                                {validationErrors.name || ''}
                                            </p>
                                        </div>

                                        <div className="flex flex-col justify-center md:justify-start">
                                            <input
                                                type="text"
                                                id="website"
                                                value={formData.website}
                                                onChange={handleInputChange}
                                                className="w-64 border-b p-2 focus:outline-none border-gray-300 dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400"
                                                placeholder="Website"
                                            />
                                            <p className={`text-xs text-red-500 transition-all duration-300 ${
                                                validationErrors.website ? 'opacity-100 mt-1' : 'opacity-0 h-0'
                                            }`}>
                                                {validationErrors.website || ''}
                                            </p>
                                        </div>

                                        <div className="flex flex-col justify-center md:justify-start">
                                            <input
                                                type="text"
                                                id="photo"
                                                value={formData.photo}
                                                onChange={handleInputChange}
                                                className="w-64 border-b p-2 focus:outline-none border-gray-300 dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400"
                                                placeholder="Photo URL"
                                            />
                                            <p className={`text-xs text-red-500 transition-all duration-300 ${
                                                validationErrors.photo ? 'opacity-100 mt-1' : 'opacity-0 h-0'
                                            }`}>
                                                {validationErrors.photo || ''}
                                            </p>
                                        </div>

                                        <div className="flex flex-col justify-center md:justify-start">
                                            <input
                                                type="text"
                                                id="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                className="w-64 border-b p-2 focus:outline-none border-gray-300 dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400"
                                                placeholder="Description"
                                            />
                                            <p className={`text-xs text-red-500 transition-all duration-300 ${
                                                validationErrors.description ? 'opacity-100 mt-1' : 'opacity-0 h-0'
                                            }`}>
                                                {validationErrors.description || ''}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col justify-center md:justify-start">
                                            <input
                                                type="text"
                                                id="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-64 border-b p-2 focus:outline-none border-gray-300 dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400"
                                                placeholder="Name"
                                            />
                                            <p className={`text-xs text-red-500 transition-all duration-300 ${
                                                validationErrors.name ? 'opacity-100 mt-1' : 'opacity-0 h-0'
                                            }`}>
                                                {validationErrors.name || ''}
                                            </p>
                                        </div>

                                        <div className="flex flex-col justify-center md:justify-start">
                                            <input
                                                type="text"
                                                id="last_name"
                                                value={formData.last_name}
                                                onChange={handleInputChange}
                                                className="w-64 border-b p-2 focus:outline-none border-gray-300 dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400"
                                                placeholder="Last Name"
                                            />
                                            <p className={`text-xs text-red-500 transition-all duration-300 ${
                                                validationErrors.last_name ? 'opacity-100 mt-1' : 'opacity-0 h-0'
                                            }`}>
                                                {validationErrors.last_name || ''}
                                            </p>
                                        </div>

                                        <div className="flex flex-col justify-center md:justify-start">
                                            <input
                                                type="text"
                                                id="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-64 border-b p-2 focus:outline-none border-gray-300 dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400"
                                                placeholder="City"
                                            />
                                            <p className={`text-xs text-red-500 transition-all duration-300 ${
                                                validationErrors.city ? 'opacity-100 mt-1' : 'opacity-0 h-0'
                                            }`}>
                                                {validationErrors.city || ''}
                                            </p>
                                        </div>

                                        <div className="flex flex-col justify-center md:justify-start">
                                            <input
                                                type="text"
                                                id="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                className="w-64 border-b p-2 focus:outline-none border-gray-300 dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400"
                                                placeholder="Country"
                                            />
                                            <p className={`text-xs text-red-500 transition-all duration-300 ${
                                                validationErrors.country ? 'opacity-100 mt-1' : 'opacity-0 h-0'
                                            }`}>
                                                {validationErrors.country || ''}
                                            </p>
                                        </div>

                                        <div className="flex flex-col justify-center md:justify-start">
                                            <input
                                                type="date"
                                                id="date"
                                                value={formData.date}
                                                onChange={handleInputChange}
                                                className="w-64 border-b p-2 focus:outline-none border-gray-300 dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400"
                                            />
                                            <p className={`text-xs text-red-500 transition-all duration-300 ${
                                                validationErrors.date ? 'opacity-100 mt-1' : 'opacity-0 h-0'
                                            }`}>
                                                {validationErrors.date || ''}
                                            </p>
                                        </div>

                                        <div className="flex flex-col justify-center md:justify-start">
                                            <input
                                                type="text"
                                                id="photo"
                                                value={formData.photo}
                                                onChange={handleInputChange}
                                                className="w-64 border-b p-2 focus:outline-none border-gray-300 dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400"
                                                placeholder="Photo URL"
                                            />
                                            <p className={`text-xs text-red-500 transition-all duration-300 ${
                                                validationErrors.photo ? 'opacity-100 mt-1' : 'opacity-0 h-0'
                                            }`}>
                                                {validationErrors.photo || ''}
                                            </p>
                                        </div>
                                    </>
                                )}

                                {/* Buttons */}
                                <div className="flex justify-center md:justify-start">
                                    <button
                                        type="submit"
                                        className="w-64 md:w-[100%] text-lg py-2 rounded-full transition-colors bg-emerald-500 hover:bg-emerald-600 text-white dark:bg-dark-rose-light dark:hover:bg-dark-rose-dark dark:text-dark-text-primary"
                                    >
                                        Save
                                    </button>
                                </div>

                                <div className="flex justify-center md:justify-start">
                                    <button
                                        type="button"
                                        onClick={() => setShowDeleteModal(true)}
                                        className="w-64 md:w-[100%] text-lg py-2 rounded-full transition-colors bg-red-100 text-red-500 hover:bg-red-200 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800"
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Desktop Profile Image Section */}
                        <div className="hidden md:flex w-full md:w-1/3 pt-16 flex-col items-end">
                            <div>
                                <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200 mb-4">
                                    <img
                                        src={formData.photo}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {isCompany ? (
                                    <>
                                        <h2 className="text-2xl font-semibold mb-2 dark:text-dark-text-primary">
                                            {formData.name}
                                        </h2>
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-dark-text-secondary mb-2">
                                            <Globe size={18} />
                                            <p>{formData.website}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-semibold mb-2 dark:text-dark-text-primary">
                                            {`${formData.name} ${formData.last_name}`}
                                        </h2>
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-dark-text-secondary mb-2">
                                            <MapPin size={18} />
                                            <p>{`${formData.city} ${formData.country}`}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-500 dark:text-dark-text-secondary">
                                            <Cake size={18} />
                                            <p>{formData.date}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="rounded-lg p-6 max-w-sm w-full bg-white dark:bg-dark-bg-secondary dark:text-dark-text-primary">
                        <h3 className="text-lg font-medium mb-4">Are you sure you want to delete?</h3>
                        <hr className="my-4 border-gray-300 dark:border-gray-600" />
                        <div className="flex items-center">
                            <button
                                onClick={handleDeleteAccount}
                                className="flex-1 py-2 text-red-500 dark:text-red-400"
                            >
                                Yes, I'm sure
                            </button>
                            <div className="w-px h-8 mx-4 bg-gray-400 dark:bg-gray-600" />
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 py-2 text-blue-500 dark:text-blue-400"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSaveModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="rounded-lg p-6 max-w-sm w-full bg-white dark:bg-dark-bg-secondary dark:text-dark-text-primary">
                        <h3 className="text-lg font-medium mb-4">Your changes are saved correctly!</h3>
                        <hr className="my-4 border-gray-300 dark:border-gray-600" />
                        <button
                            onClick={() => setShowSaveModal(false)}
                            className="w-full py-2 text-blue-500 dark:text-blue-400"
                        >
                            Accept
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProfile;