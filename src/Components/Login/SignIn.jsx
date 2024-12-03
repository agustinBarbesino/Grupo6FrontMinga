import React from 'react'

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
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-pink-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-pink-400"
              placeholder="Enter your password"
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
            className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:border-pink-400 hover:text-pink-400 transition mb-6"
          >
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