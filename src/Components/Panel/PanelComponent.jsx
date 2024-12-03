import React, { useState } from 'react';
import { User, Users } from 'lucide-react';

const Panel = () => {
  const [activeTab, setActiveTab] = useState('companies');
  
  const companies = [
    { name: 'Blue Team', website: 'www.blueteam.com', color: 'blue' },
    { name: 'Red Team', website: 'www.redteam.com', color: 'red' },
    { name: 'Orange Team', website: 'www.orangeteam.com', color: 'orange' },
    { name: 'Purple Team', website: 'www.purpleteam.com', color: 'purple' }
  ];

  const authors = [
    { name: 'Lucas Ezequiel Silva', date: '16/02/2000', location: 'Caseros', active: true },
    { name: 'Alejo Villafañe', date: '11/06/1981', location: 'CABA', active: true },
    { name: 'Ignacio Borraz', date: '25/04/1990', location: 'Cordoba', active: false },
    { name: 'Eric Rodriguez', date: '04/01/2000', location: 'Corrientes', active: true }
  ];

  return (
    <div className="h-screen relative ">
      
      <div className="h-1/2 w-full">
        <img 
          src="https://s3-alpha-sig.figma.com/img/ca8a/5039/085206b8c835b5fa5af23f8414bac827?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Bj2n2m4Br4kyNg5jQdw8LjV854007v5YP1ehMIBNcDoN-MiFjCoQdh3IfgNmnIXA2Wi5Skj1dqcWHs9D0krPOFl8~XWOgvV36AT1qicV7y2yAxXmM-zM~DaZqnmxKHcXkHwcUkJB7gyGZ85EXqHTn-mtof5Gpt3GF207e~WC4XL~0VWiWwbEzF8KcwgpR1D93RF6jmfeJsSOhv0-9qKC1LOufmamiJCeBM9~U5BvMG0zo4879ACbTH23t7yxzh6F8saX2gkFG0zPdzJPgG-0tjnlUnnkURMgBy3I2Y3gDF12X~cL0HVTatV4t~PBfu7euc~KG6xIlSYj2ETULd0A0g__"
          alt="Background" 
          className="w-full h-3/5 object-cover bg-cover bg-center inset-0 fixed "
        />
      </div>
      <div className="absolute inset-x-0 top-1/3 mx-auto max-w-4xl px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-pink-500 mb-6">Entities</h2>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <div className="flex">
              <button
                className={`flex-1 py-4 text-center font-semibold ${
                  activeTab === 'companies' ? 'bg-pink-500 text-white' : 'bg-white text-gray-600'
                }`}
                onClick={() => setActiveTab('companies')}
              >
                Companies
              </button>
              <button
                className={`flex-1 py-4 text-center font-semibold ${
                  activeTab === 'authors' ? 'bg-pink-500 text-white' : 'bg-white text-gray-600'
                }`}
                onClick={() => setActiveTab('authors')}
              >
                Authors
              </button>
            </div>

            <div className="p-4">
              {activeTab === 'companies' ? (
                <div className="space-y-4">
                  {companies.map((company) => (
                    <div key={company.name} className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <div className="flex items-center gap-4">
                        <Users size={24} className="text-gray-400" />
                        <div>
                          <h3 className="font-medium">{company.name}</h3>
                          <p className="text-sm text-gray-500">{company.website}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <img 
                          src="https://w7.pngwing.com/pngs/177/20/png-transparent-question-mark-pink-magenta-color-question-mark-miscellaneous-purple-text-thumbnail.png"
                          alt="Company avatar"
                          className="w-8 h-8 rounded-full hidden md:block"
                        />
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {authors.map((author) => (
                    <div key={author.name} className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <div className="flex items-center gap-4">
                        <User size={24} className="text-gray-400" />
                        <div>
                          <h3 className="font-medium">{author.name}</h3>
                          <div className="flex gap-4 text-sm text-gray-500">
                            <span>{author.date}</span>
                            <span>{author.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <img 
                          src="https://w7.pngwing.com/pngs/177/20/png-transparent-question-mark-pink-magenta-color-question-mark-miscellaneous-purple-text-thumbnail.png"
                          alt="Author avatar"
                          className="w-8 h-8 rounded-full hidden md:block "
                        />
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={author.active} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
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
  );
};

export default Panel;