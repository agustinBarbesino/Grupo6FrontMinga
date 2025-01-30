import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsDarkMode } from '../store/actions/darkModeActions'

const ErrorPage = () => {
  const isDarkMode = useSelector(selectIsDarkMode)

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen text-center ${
      isDarkMode ? 'bg-dark-pink-gradient' : 'bg-pink-gradient'
    }`}>
      <h1 className="text-4xl font-bold text-white pb-8">¡Ups!</h1>
      <p className="text-2xl text-white mb-4">
        We cannot find the page you are looking for.
      </p>
      <p className="text-lg text-white mb-8">
        The link may be broken or the page may have been deleted.
      </p>
      <Link 
        to="/" 
        className={`${
          isDarkMode 
            ? 'bg-dark-bg-primary text-dark-rose-light hover:bg-dark-bg-secondary' 
            : 'bg-white text-rose-dark hover:bg-gray-200'
        } py-2 px-4 rounded transition-colors`}
      >
        Return to home page
      </Link>
    </div>
  )
}

export default ErrorPage