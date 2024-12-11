import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategoriesLoading, selectCategoriesError } from '../store/actions/categoryActions';
import { selectIsAuthenticated } from '../store/actions/authActions';
import { selectIsDarkMode } from '../store/actions/darkModeActions';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state) => state?.categories?.categories || []);
  const isLoading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isDarkMode = useSelector(selectIsDarkMode);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [categories]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === categories.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? categories.length - 1 : prev - 1
    );
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      navigate('/mangas');
    } else {
      navigate('/signin');
    }
  };

  const currentCategory = categories && categories[currentSlide];

  return (
    <div className={`flex flex-col w-full ${isMobile ? '' : `${isDarkMode ? 'bg-gray-900' : 'bg-[#F4F4F4]'} pb-16 pt-16`}`}>
      <div className={`${isMobile ? 'min-h-screen' : 'min-h-[calc(100vh-40vh)]'}`}>
        {/* Carousel Section*/}
        {!isMobile && (
          <section className={`hidden lg:block w-full py-8 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-[#F4F4F4]'} pt-16`}>
            <div className="relative w-full mx-auto h-[265px] max-w-[1258px] 2xl:max-w-[1458px] 3xl:max-w-[1658px] 4xl:max-w-[1858px]">
              <div
                onClick={() => navigate('/mangas')}
                className="w-full h-full flex flex-col md:flex-row items-center p-4 md:p-6 rounded-lg transition-colors duration-300 cursor-pointer"
                style={{ backgroundColor: currentCategory?.color || '#F472B6' }}
              >
                {/* Button left */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="hidden md:flex text-white p-2 md:p-3 rounded-full items-center justify-center z-10 transition-all duration-300"
                  style={{
                    backgroundColor: currentCategory?.color || '#F9A8D4',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = currentCategory?.hover || '#F472B6'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = currentCategory?.color || '#F9A8D4'}
                >
                  <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Content */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-1 relative md:pr-16">
                  {isLoading ? (
                    <div className="text-white text-center col-span-3">Loading categories...</div>
                  ) : error ? (
                    <div className="text-red-500 text-center col-span-3">Error: {error}</div>
                  ) : currentCategory ? (
                    <>
                      {/* Character Photo - Left */}
                      <div className="hidden md:block relative">
                        <img
                          src={currentCategory.characterPhoto}
                          alt={`${currentCategory.name} character`}
                          className="w-48 md:w-[277px] h-56 md:h-[298px] object-contain absolute -top-32"
                        />
                      </div>

                      {/* Cover Photo - Center */}
                      <div className="hidden md:block relative">
                        <img
                          src={currentCategory.coverPhoto}
                          alt={`${currentCategory.name} cover`}
                          className="w-36 md:w-[180px] h-56 md:h-[270px] rounded-lg object-cover absolute -top-32"
                        />
                      </div>

                      {/* Text Content */}
                      <div className="text-white text-center md:text-left flex flex-col justify-center h-full">
                        <div>
                          <h2 className="text-xl md:text-2xl mb-2">
                            {currentCategory.name}:
                          </h2>
                          <p className="text-xs leading-[95.19%]">
                            {currentCategory.description.slice(0, 200)}...
                          </p>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>

                {/* button right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="hidden md:flex text-white p-2 md:p-3 rounded-full items-center justify-center z-10 transition-all duration-300"
                  style={{
                    backgroundColor: currentCategory?.color || '#F9A8D4',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = currentCategory?.hover || '#F472B6'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = currentCategory?.color || '#F9A8D4'}
                >
                  <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Hero Section */}
        <section className="relative mx-auto">
          <div className="relative w-full mx-auto lg:h-[551px] h-screen flex items-center max-w-[1258px] 2xl:max-w-[1458px] 3xl:max-w-[1658px] 4xl:max-w-[1858px]">
            {/* Background image */}
            <div className={`${isMobile ? 'fixed top-0 left-0 right-0 h-screen' : 'absolute inset-0 h-full'}`}>
              <img
                src="https://s3-alpha-sig.figma.com/img/c3ca/6946/5e5e0084c33976fd998b27efb07aded4?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hTtGgNfuPtvJDmq4aJpdOJKQ4f3iPd553pcQb~fJZVljyj0x0aCTINMUNeJQjITpgHPcNWm8FXyPrckj3j54FZyTrjAOtVIwablfx5fzBCSLvVFOrK7b5P66-xeABnqXVZJFKme~CNup0V084RvDhTf06HQ~HCNacnuUxqlzhpfChWMQGg1wxCtW3xf2uTuCRTkHKsUQWTP9LL5OXbQ-IWaknXytpNFrm-wfn1Z-ZqLS-tDfE6nwDEaumQFELLPZcknwe2MdmnPqFS4BuDEzvQX3qxxI4zLfkZcWmx8I3uw~nJZgYKExV3~tRjXXl4zaLBEFXcBxjv-em30sypT6Og__"
                alt="Background"
                className="w-full h-full object-cover lg:object-[center_-200px]"
              />
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/50' : 'bg-black/60'}`}></div>
            </div>

            {/* Hero content */}
            <div className={`relative ${isMobile ? 'z-10' : 'z-0'} text-white px-6 md:px-8 lg:px-8 w-full h-full flex flex-col justify-center lg:justify-end ${isMobile ? 'pt-20' : ''} pb-16`}>
              <div className="ml-0 md:ml-10 lg:ml-20 space-y-4 text-center lg:text-left">
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">
                  {isMobile ? "Your favorite manga store" : "Live the emotion of the manga"}
                </h1>
                <p className="text-base md:text-2xl max-w-md">
                  {isMobile
                    ? "Find your perfect manga and live amazing adventures"
                    : "Find the perfect manga for you"}
                </p>
                <p className="text-base max-w-md">
                  #MingaForever 🔥
                </p>
                <button
                  onClick={handleAuthAction}
                  className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-[#F472B6] hover:bg-[#F9A8D4]'} 
                    w-full max-w-[200px] py-3 text-white font-medium text-xl rounded-md transition-colors duration-300`}
                >
                  {isAuthenticated ? 'Explore!' : 'Sign In!'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}