import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const Profile = () => {
  const [isNew, setIsNew] = useState(true);
  
  const isCompany = window.location.pathname.includes('company');
  const profileData = isCompany ? {
    name: "Toei Animation",
    location: "Toei Animation Co., Ltd is a Japanese animation studio owned by the Toei Company, Limited...",
    mangas: [
      { id: 1, title: "Komi san Cant Communicate" },
      { id: 2, title: "Boruto" },
      { id: 3, title: "Evangelion" },
      { id: 4, title: "Kaguya-sama: Love is war" }
    ]
  } : {
    name: "Lucas Ezequiel Silva",
    location: "Caseros, Buenos Aires",
    birthDate: "16/02/2000",
    mangas: [
      { id: 1, title: "Komi san Cant Communicate" },
      { id: 2, title: "Boruto" },
      { id: 3, title: "Evangelion" },
      { id: 4, title: "Kaguya-sama: Love is war" }
    ]
  };

  const handleToggleChange = () => {
    setIsNew(!isNew);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto p-4 lg:py-8">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-8 lg:px-8">
        <div className="w-8 h-8" />
        <div className="flex items-center gap-2">
          
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:flex lg:gap-24 lg:px-8 lg:relative">
        {/* Vertical Separator Line for Desktop */}
        <div className="hidden lg:block absolute left-1/3 top-0 w-px h-full bg-gray-200" />
        
        {/* Profile Section */}
        <div className="flex flex-col items-center lg:w-1/3">
          <div className="relative">
            <div className="w-24 h-24 lg:w-48 lg:h-48 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="https://s3-alpha-sig.figma.com/img/d9d0/f1ac/c322ab5c9cf4fc346fed889dff86ac76?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fLZ4YdyFHqkpCA4dDW0v0EjE3IovdMrJ1hYBQHPbCrGANkayfrUAKfIzRmSntLANAzSOuVnE8WxGpA9t23ODn9~JDwfrE8WeE7aJ0muvNTvjN1aG~CvpCmzSv50WwUzWHLceqK-x0rVm0fTbmGjKv62HAeG1s5LeuWSVMb~nu28WMW5~geFtXn-8VtOoTPhOkCQXmMRYsKXYyfoOVW67oqu1fhRerzqg0pNO9DJ8bEIHjkLnDi~2XDCxNzYqPI4zq6CL2ovPCOKTeUvTdkqVBwGCuUItM~IN-9-GSOe5QTRWrjXWkdsCxgJGbnddWevI6gB4KeR6ak49QVTR713OsQ__"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 lg:p-3 shadow-lg">
              <Camera className="w-4 h-4 lg:w-6 lg:h-6" />
            </button>
          </div>

          <div className="text-center mt-4">
            <h1 className="text-xl lg:text-3xl font-bold mb-2">{profileData.name}</h1>
            <p className="text-gray-600 text-sm lg:text-base">{profileData.location}</p>
            {!isCompany && (
              <p className="text-gray-600 text-sm lg:text-base">{profileData.birthDate}</p>
            )}
          </div>

          {/* Toggle Switch */}
          <div className="flex justify-around items-center w-full max-w-xs mt-6 lg:mt-8">
            <span className="text-gray-600">new</span>
            <button 
              onClick={handleToggleChange}
              className="w-12 h-6 bg-emerald-500 rounded-full relative transition-all duration-300 cursor-pointer"
            >
              <div 
                className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300
                  ${isNew ? 'right-1' : 'left-1'}`}
              />
            </button>
            <span className="text-gray-600">old</span>
          </div>
        </div>

        {/* Manga Grid */}
        <div className="w-full lg:w-2/3 mt-8 lg:mt-0">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {profileData.mangas.map(manga => (
              <div key={manga.id} className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img
                  src="https://s3-alpha-sig.figma.com/img/d9d0/f1ac/c322ab5c9cf4fc346fed889dff86ac76?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fLZ4YdyFHqkpCA4dDW0v0EjE3IovdMrJ1hYBQHPbCrGANkayfrUAKfIzRmSntLANAzSOuVnE8WxGpA9t23ODn9~JDwfrE8WeE7aJ0muvNTvjN1aG~CvpCmzSv50WwUzWHLceqK-x0rVm0fTbmGjKv62HAeG1s5LeuWSVMb~nu28WMW5~geFtXn-8VtOoTPhOkCQXmMRYsKXYyfoOVW67oqu1fhRerzqg0pNO9DJ8bEIHjkLnDi~2XDCxNzYqPI4zq6CL2ovPCOKTeUvTdkqVBwGCuUItM~IN-9-GSOe5QTRWrjXWkdsCxgJGbnddWevI6gB4KeR6ak49QVTR713OsQ__"
                  alt={manga.title}
                  className="w-full h-full object-cover"
                />
                <p className="p-2 text-sm lg:text-base font-medium">{manga.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Manage Button */}
      <button className="w-full max-w-md lg:max-w-xs bg-pink-500 text-white rounded-lg py-3 mt-8 hover:bg-pink-600 transition-colors">
        Manage!
      </button>
    </div>
  );
};

export default Profile;