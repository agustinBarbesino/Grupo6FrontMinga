import React from 'react'
import { useNavigate } from 'react-router-dom'
 
export default function Roles() {
    const navigate = useNavigate();

  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center md:flex-row'>
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center'>
        <h1 className='text-pink-400'>Change Rol To</h1>
        <img className='w-20 my-4' src="src/assets/logoMinga.png" alt="logo" />
        <div className='w-10/12 my-4 p-1 py-2 flex justify-start items-center rounded-lg outline outline-1 outline-slate-200 hover:outline-2 hover:outline-pink-400 transition hover:cursor-pointer'
          onClick={() => navigate('/newAuthor')}>
          <img className='mx-2' src="src/assets/peopleAuthorRole.png" alt="" />
          <div className='flex flex-col items-start'>
            <h1 className='font-bold text-pink-400'>Join as an Author!</h1>
            <h2 className='text-pink-400'>I'm a reader writting a manga</h2>
          </div>
        </div>
        <div className='w-10/12 my-4 p-1 py-2 flex justify-start items-center rounded-lg outline outline-1 outline-slate-200 hover:outline-2 hover:outline-pink-400 transition hover:cursor-pointer'
          onClick={() => navigate('/newCompany')}>
          <img className='mx-2' src="src/assets/peopleCompanyRole.png" alt="" />
          <div className='flex flex-col items-start'>
            <h1 className='font-bold text-pink-400'>Join as an Company!</h1>
            <h2 className='text-pink-400'>I'm a company and I want to publish my comics</h2>
          </div>
        </div>
      </div>
      <div className='hidden md:flex w-full md:w-1/2 md:min-h-screen relative justify-center'>
        <img className='opacity-80 object-contain w-full h-auto' src="src/assets/rolBg.png" alt="" />
        <div className='absolute w-9/12 flex flex-col justify-start items-start text-white text-start mt-44'>
          <h1 className='text-2xl font-medium'>Minga.com is the best place to find manga reviews. We’ve been super impress by the quality of applicants.   </h1>
          <p className='text-lg mt-2 opacity-60'>- Ignacio Borraz</p>
        </div>
      </div>
    </div>
  )
}
