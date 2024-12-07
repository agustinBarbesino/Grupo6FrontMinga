import { React, useState, useEffect } from 'react'
import { User, Users } from 'lucide-react'
import { getCompanies, getAuthor, updateActiveCompanies, updateActiveAuthors } from '../../store/actions/panelActions.js'
import { useSelector, useDispatch } from 'react-redux'

const Panel = () => {
  const [activeTab, setActiveTab] = useState('companies')
  const dispatch = useDispatch()
  const {companies, authors, active} = useSelector(state => state.panelReducer)
  
  useEffect(() => {
    dispatch(getCompanies())
    dispatch(getAuthor())
  },[active])
  return (
    <div className="h-screen relative font-montserrat mb-20">

      <div className="h-1/2 w-full ">
        <img
          src="https://s3-alpha-sig.figma.com/img/ca8a/5039/085206b8c835b5fa5af23f8414bac827?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Bj2n2m4Br4kyNg5jQdw8LjV854007v5YP1ehMIBNcDoN-MiFjCoQdh3IfgNmnIXA2Wi5Skj1dqcWHs9D0krPOFl8~XWOgvV36AT1qicV7y2yAxXmM-zM~DaZqnmxKHcXkHwcUkJB7gyGZ85EXqHTn-mtof5Gpt3GF207e~WC4XL~0VWiWwbEzF8KcwgpR1D93RF6jmfeJsSOhv0-9qKC1LOufmamiJCeBM9~U5BvMG0zo4879ACbTH23t7yxzh6F8saX2gkFG0zPdzJPgG-0tjnlUnnkURMgBy3I2Y3gDF12X~cL0HVTatV4t~PBfu7euc~KG6xIlSYj2ETULd0A0g__"
          alt="Background"
          className="w-full h-3/5 object-cover bg-cover bg-center inset-0 fixed "
        />
      </div>
      <div className="absolute inset-x-0 top-1/3 mx-auto max-w-4xl px-4 ">
        <div className="bg-white rounded-lg text-center shadow-lg p-6  ">
          <h2 className="text-3xl bg-pink-gradient font-extrabold text-transparent inline-block bg-clip-text">Entities</h2>
          <div className="w-28 h-2 bg-rose-light mx-auto mb-6"></div>
          <div className="bg-gray-50 rounded-lg overflow-hidden border-2">
            <div className="flex border-b-2 border-b-rose-dark">
              <button
                className={`flex-1 py-4 text-center font-bold ${activeTab === 'companies' ? 'bg-pink-gradient text-white' : 'bg-white text-rose-dark'
                  }`}
                onClick={() => setActiveTab('companies')}
              >
                Companies
              </button>
              <button
                className={`flex-1 py-4 text-center font-bold ${activeTab === 'authors' ? 'bg-pink-gradient text-white' : 'bg-white text-rose-dark'
                  }`}
                onClick={() => setActiveTab('authors')}
              >
                Authors
              </button>
            </div>

            <div className="p-4 flex-grow overflow-y-auto ">
              {activeTab === 'companies' ? (
                <div className="space-y-4 flex-grow overflow-y-auto">
                  {companies.map((company) => (
                    <div key={company.name} className="flex items-center justify-between p-4 bg-white rounded-lg ">
                      <div className="flex items-center text-left  w-1/2">
                        <Users size={24} className="text-rose-dark md:block hidden" fill="#F472B6" />
                        <div className='md:flex md:flex-row w-full justify-between '>
                          <h3 className="md:ml-2 py-4 md:py-0">{company.name}</h3>
                          <p className="text-sm text-gray-500 w-1/2 text-left ">{company.website}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-1/3">
                        <div className='flex md:w-1/3 md:items-left justify-center '>
                          <img
                            src={company.photo == null ?`https://i.pinimg.com/736x/0e/9c/c6/0e9cc65bde115ecfa5ba8056d877690a.jpg`:company.photo}
                            alt="Company avatar"
                            className="w-8 h-8 rounded-full hidden md:block "
                          />

                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" onChange={() => dispatch(updateActiveCompanies({ id: company._id, active: company.active }))} checked={company.active} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-dark"></div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 flex-grow overflow-y-auto">
                  {authors.map((author) => (
                    <div key={author.name} className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <div className="flex items-center text-left w-2/3">
                        <User size={24} className="text-rose-dark md:block hidden" fill="#F472B6"/>
                        <div className='md:flex md:flex-row  md:items-center w-full justify-between'>
                          <h3 className=" text-center">{author.name}</h3>
                          <div className="flex items-center justify-between text-sm md:w-1/2 text-gray-500 ">
                            <p >{new Date(author.createdAt).toISOString().split('T')[0]}</p>
                            <p className='w-1/2 text-center'>{author.city}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-1/3">
                        <div className='flex md:w-1/2 md:items-left justify-center '>
                          <img
                            src={author.photo == null ?'https://i.pinimg.com/736x/5b/89/f1/5b89f121462393c9144af1dfaa3aa85b.jpg':author.photo}
                            alt="Company avatar"
                            className="w-8 h-8 rounded-full hidden md:block "
                          />

                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" onChange={() => dispatch(updateActiveAuthors({ id: author._id, active: author.active }))} checked={author.active} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-dark"></div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Panel