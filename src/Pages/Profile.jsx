import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Camera } from 'lucide-react';
import { fetchAuthorData, fetchCompanyData } from '../store/actions/profileActions';

const Profile = () => {
  const [isNew, setIsNew] = useState(true);
  const dispatch = useDispatch();
  
  const user = useSelector(state => state.auth.user);
  const { profile, mangas, loading, error, profileType } = useSelector(state => state.profile);

  useEffect(() => {
    if (user?.author_id) {
      dispatch(fetchAuthorData(user.author_id));
    } else if (user?.company_id) {
      dispatch(fetchCompanyData(user.company_id));
    }
  }, [dispatch, user]);

  const manager=()=>{
    window.location.href="/manager"
  }
  const getSortedMangas = () => {
    if (!mangas) return [];
    
    return [...mangas].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      
      return !isNew 
        ? dateB.getTime() - dateA.getTime() 
        : dateA.getTime() - dateB.getTime();
    });
  };

  const handleToggleChange = () => {
    setIsNew(!isNew);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error loading profile: {error}
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto p-4 lg:py-8">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-8 lg:px-8 pt-16">
        <div className="w-8 h-8" />
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">{profileType === 'author' ? 'Author' : 'Company'}</h2>
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
                src={profile.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 lg:p-3 shadow-lg">
              <Camera className="w-4 h-4 lg:w-6 lg:h-6" />
            </button>
          </div>

          <div className="text-center mt-4">
            <h1 className="text-xl lg:text-3xl font-bold mb-2">
              {profileType === 'author' ? `${profile.name} ${profile.last_name}` : profile.name}
            </h1>
            <p className="text-gray-600 text-sm lg:text-base">
              {profileType === 'author' ? `${profile.city}, ${profile.country}` : profile.description}
            </p>
            {profileType === 'author' && (
              <p className="text-gray-600 text-sm lg:text-base">
                {new Date(profile.date).toLocaleDateString()}
              </p>
            )}
            {profileType === 'company' && (
              <a href={profile.website} className="text-blue-500 text-sm lg:text-base hover:underline">
                {profile.website}
              </a>
            )}
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center space-x-4 w-full max-w-xs mt-6 lg:mt-8">
            <span className="text-gray-700 font-medium text-base">New</span>
            <button 
              onClick={handleToggleChange}
              className="w-12 h-6 bg-emerald-500 rounded-full relative transition-all duration-300 cursor-pointer"
            >
              <div 
                className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300
                  ${isNew ? 'right-1' : 'left-1'}`}
              />
            </button>
            <span className="text-gray-700 font-medium text-base">Old</span>
          </div>
        </div>

        {/* Manga Grid */}
        <div className="w-full lg:w-2/3 mt-8 lg:mt-0">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {getSortedMangas().map(manga => (
              <div key={manga._id} className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-full">
                  <img
                    src={manga.cover_photo}
                    alt={manga.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                    <p className="text-white text-sm font-medium truncate">
                      {manga.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Manage Button */}
      <button onClick={manager} className="w-full max-w-md lg:max-w-xs bg-pink-500 text-white rounded-lg py-3 mt-8 hover:bg-pink-600 transition-colors">
        Manage!
      </button>
    </div>
  );
};

export default Profile;