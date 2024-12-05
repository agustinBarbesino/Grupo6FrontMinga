import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-r from-red-500 to-yellow-500">
      <h1 className="text-4xl font-bold text-white pb-8">¡Ups!</h1>
      <p className="text-2xl text-white mb-4">We cannot find the page you are looking for.</p>
      <p className="text-lg text-white mb-8">The link may be broken or the page may have been deleted.</p>
      <Link to="/" className="bg-white text-red-500 hover:bg-gray-200 py-2 px-4 rounded">
      Return to home page
      </Link>
    </div>
  )
}

export default ErrorPage;