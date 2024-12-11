import { React, useState, useEffect } from 'react'
import { User, Users } from 'lucide-react'
import { getCompanies, getAuthor, updateActiveCompanies, updateActiveAuthors } from '../../store/actions/panelActions.js'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsDarkMode } from '../../store/actions/darkModeActions'

const Panel = () => {
  const [activeTab, setActiveTab] = useState('companies')
  const dispatch = useDispatch()
  const {companies, authors, active} = useSelector(state => state.panelReducer)
  const isDarkMode = useSelector(selectIsDarkMode)
  
  useEffect(() => {
    dispatch(getCompanies())
    dispatch(getAuthor())
  },[active])

  return (
    <div className={`min-h-screen w-full ${isDarkMode ? 'dark bg-dark-bg-primary' : 'bg-gray-100'}`}>
      {/* Background layers */}
      <div className="fixed inset-0">
        {/* Top image background */}
        <div className="h-[50vh] relative">
          <img
            src="https://s3-alpha-sig.figma.com/img/ca8a/5039/085206b8c835b5fa5af23f8414bac827?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Bj2n2m4Br4kyNg5jQdw8LjV854007v5YP1ehMIBNcDoN-MiFjCoQdh3IfgNmnIXA2Wi5Skj1dqcWHs9D0krPOFl8~XWOgvV36AT1qicV7y2yAxXmM-zM~DaZqnmxKHcXkHwcUkJB7gyGZ85EXqHTn-mtof5Gpt3GF207e~WC4XL~0VWiWwbEzF8KcwgpR1D93RF6jmfeJsSOhv0-9qKC1LOufmamiJCeBM9~U5BvMG0zo4879ACbTH23t7yxzh6F8saX2gkFG0zPdzJPgG-0tjnlUnnkURMgBy3I2Y3gDF12X~cL0HVTatV4t~PBfu7euc~KG6xIlSYj2ETULd0A0g__"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        {/* Bottom colored background */}
        <div className={`h-[50vh] ${isDarkMode ? 'bg-dark-bg-primary' : 'bg-gray-100'}`}></div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen font-montserrat pb-20">
        <div className="absolute inset-x-0 top-1/3 mx-auto max-w-4xl px-4">
          <div className={`rounded-lg text-center shadow-lg p-6 ${isDarkMode ? 'bg-dark-bg-secondary' : 'bg-white'}`}>
            <h2 className={`text-3xl font-extrabold inline-block text-transparent bg-clip-text ${
              isDarkMode ? 'bg-dark-pink-gradient' : 'bg-pink-gradient'
            }`}>Entities</h2>
            <div className={`w-28 h-2 mx-auto mb-6 ${isDarkMode ? 'bg-dark-rose-light' : 'bg-rose-light'}`}></div>
            
            {/* Rest of the panel content remains the same */}
            <div className={`rounded-lg overflow-hidden border-2 ${
              isDarkMode ? 'bg-dark-bg-primary border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className={`flex border-b-2 ${isDarkMode ? 'border-b-dark-rose-dark' : 'border-b-rose-dark'}`}>
                <button
                  className={`flex-1 py-4 text-center font-bold ${
                    activeTab === 'companies' 
                      ? `${isDarkMode ? 'bg-dark-pink-gradient' : 'bg-pink-gradient'} text-white` 
                      : `${isDarkMode ? 'bg-dark-bg-secondary text-dark-rose-light' : 'bg-white text-rose-dark'}`
                  }`}
                  onClick={() => setActiveTab('companies')}
                >
                  Companies
                </button>
                <button
                  className={`flex-1 py-4 text-center font-bold ${
                    activeTab === 'authors' 
                      ? `${isDarkMode ? 'bg-dark-pink-gradient' : 'bg-pink-gradient'} text-white` 
                      : `${isDarkMode ? 'bg-dark-bg-secondary text-dark-rose-light' : 'bg-white text-rose-dark'}`
                  }`}
                  onClick={() => setActiveTab('authors')}
                >
                  Authors
                </button>
              </div>

              <div className={`p-4 flex-grow overflow-y-auto ${isDarkMode ? 'bg-dark-bg-secondary' : ''}`}>
                {activeTab === 'companies' ? (
                  <div className="space-y-4 flex-grow overflow-y-auto">
                    {companies.map((company) => (
                      <div key={company.name} className={`flex items-center justify-between p-4 rounded-lg ${
                        isDarkMode ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-white'
                      }`}>
                        <div className="flex items-center text-left w-1/2">
                          <Users size={24} className={`md:block hidden ${
                            isDarkMode ? 'text-dark-rose-light' : 'text-rose-dark'
                          }`} fill={isDarkMode ? '#be185d' : '#F472B6'} />
                          <div className='md:flex md:flex-row w-full justify-between'>
                            <h3 className="md:ml-2 py-4 md:py-0">{company.name}</h3>
                            <p className={`text-sm w-1/2 text-left ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>{company.website}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between w-1/3">
                          <div className='flex md:w-1/3 md:items-left justify-center'>
                            <img
                              src={company.photo || 'https://i.pinimg.com/736x/0e/9c/c6/0e9cc65bde115ecfa5ba8056d877690a.jpg'}
                              alt="Company avatar"
                              className="w-8 h-8 rounded-full hidden md:block"
                            />
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" 
                              onChange={() => dispatch(updateActiveCompanies({ id: company._id, active: company.active }))} 
                              checked={company.active} 
                            />
                            <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 ${
                              isDarkMode ? 'peer-focus:ring-pink-900 peer-checked:bg-dark-rose-dark' : 'peer-focus:ring-pink-300 peer-checked:bg-rose-dark'
                            } rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4 flex-grow overflow-y-auto">
                    {authors.map((author) => (
                      <div key={author.name} className={`flex items-center justify-between p-4 rounded-lg ${
                        isDarkMode ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-white'
                      }`}>
                        <div className="flex items-center text-left w-2/3">
                          <User size={24} className={`md:block hidden ${
                            isDarkMode ? 'text-dark-rose-light' : 'text-rose-dark'
                          }`} fill={isDarkMode ? '#be185d' : '#F472B6'} />
                          <div className='md:flex md:flex-row md:items-center w-full justify-between'>
                            <h3 className="text-center">{author.name}</h3>
                            <div className={`flex items-center justify-between text-sm md:w-1/2 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              <p>{new Date(author.createdAt).toISOString().split('T')[0]}</p>
                              <p className='w-1/2 text-center'>{author.city}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between w-1/3">
                          <div className='flex md:w-1/2 md:items-left justify-center'>
                            <img
                              src={author.photo || 'https://i.pinimg.com/736x/5b/89/f1/5b89f121462393c9144af1dfaa3aa85b.jpg'}
                              alt="Author avatar"
                              className="w-8 h-8 rounded-full hidden md:block"
                            />
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" 
                              onChange={() => dispatch(updateActiveAuthors({ id: author._id, active: author.active }))} 
                              checked={author.active} 
                            />
                            <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 ${
                              isDarkMode ? 'peer-focus:ring-pink-900 peer-checked:bg-dark-rose-dark' : 'peer-focus:ring-pink-300 peer-checked:bg-rose-dark'
                            } rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
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
    </div>
  )
}

export default Panel