import React from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function SignIn() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 hidden md:flex">
        <img
          className="w-full h-full object-cover"
          src="src/assets/signinBg.png"
          alt="Background"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
        <h1 className="text-2xl font-bold mb-4">
            Welcome <span className="text-pink-400">back</span>
            !
        </h1>
        <p className='w-7/12 mb-6 text-gray-600 text-center'>Discover manga and comics, track your progress, have fun, read manga.</p>
        <form className="w-4/5 sm:w-3/5">
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
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-pink-400"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400">
                @
            </span>
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
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-pink-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-400 text-white mb-4 py-2 rounded-lg hover:shadow-[4px_4px_0_0_#FFA500] transition"
          >
            Sign In
          </button>
          <button
            type="button"
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
            Go back to {' '}
          <a href="/" className="text-pink-400 font-bold hover:underline">
            Home Page
          </a>
        </p>
      </div>
    </div>
  );
}