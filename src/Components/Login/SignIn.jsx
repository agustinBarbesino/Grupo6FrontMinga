import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { signIn, clearError, clearSuccess, selectAuthError, selectAuthLoading, selectAuthSuccess, selectIsAuthenticated } from '../../store/actions/authActions';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthLoading);
  const success = useSelector(selectAuthSuccess);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    dispatch(clearError());
    dispatch(clearSuccess());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
        
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters long';
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

    const error = validateField(id, value);
    setValidationErrors(prev => ({
      ...prev,
      [id]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password)
    };
    
    setValidationErrors(errors);
    
    if (Object.values(errors).some(error => error !== '')) {
      return;
    }
    
    dispatch(signIn(formData));
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/api/auth/signin/google";
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 hidden md:flex">
        <img
          className="w-full h-full object-cover"
          src="src/assets/signinBg.png"
          alt="Background"
        />
      </div>
      <div className="w-full min-h-screen md:w-1/2 flex flex-col justify-center items-center md:items-center p-6">
        <h1 className="text-2xl font-bold mb-4">
          Welcome <span className="text-pink-400">back</span>!
        </h1>
        <p className='w-7/12 mb-6 text-gray-600 text-center'>
          Discover manga and comics, track your progress, have fun, read manga.
        </p>

        {error && (
          <div className="w-4/5 sm:w-3/5 mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="w-4/5 sm:w-3/5 mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-4/5 sm:w-3/5">
          <div className="relative w-full mb-6">
            <label
              htmlFor="email"
              className="absolute -top-3 left-4 px-1 bg-white text-sm text-pink-400"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full border-2 ${
                validationErrors.email ? 'border-red-400' : 'border-gray-300'
              } rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-pink-400`}
              placeholder="your@email.com"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400">
              @
            </span>
            {validationErrors.email && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
            )}
          </div>

          <div className="relative w-full mb-6">
            <label
              htmlFor="password"
              className="absolute -top-3 left-4 px-1 -py-0 bg-white text-sm text-pink-400"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full border-2 ${
                validationErrors.password ? 'border-red-400' : 'border-gray-300'
              } rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-pink-400`}
              placeholder="Enter your password"
            />
            <Lock className="absolute w-4 h-4 right-4 top-1/2 -translate-y-1/2 text-pink-400"/>
            {validationErrors.password && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || Object.values(validationErrors).some(error => error !== '')}
            className="w-full bg-pink-400 text-white mb-4 py-2 rounded-lg hover:shadow-[4px_4px_0_0_#FFA500] transition disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex justify-center items-center border border-gray-300 text-gray-700 py-2 rounded-lg hover:border-pink-400 hover:text-pink-400 transition mb-6"
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            Sign In with Google
          </button>
        </form>

        <p className="text-gray-600 text-sm mb-4">
          You don't have an account yet?{' '}
          <a href="/signup" className="text-pink-400 font-bold hover:underline">
            Sign Up
          </a>
        </p>
        <p className="text-gray-600 text-sm">
          Go back to{' '}
          <a href="/" className="text-pink-400 font-bold hover:underline">
            Home Page
          </a>
        </p>
      </div>
    </div>
  );
}