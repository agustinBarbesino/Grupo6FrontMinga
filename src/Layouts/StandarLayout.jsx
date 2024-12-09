import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsDarkMode } from '../store/actions/darkModeActions';
import { Outlet } from 'react-router-dom';
import Header from '../Components/LayoutsCom/Header.jsx';
import Footer from '../Components/LayoutsCom/Footer.jsx';
import Shimeji from '../Components/Shimeji/Shimeji.jsx';
export default function StandarLayout() {
  const isDarkMode = useSelector(selectIsDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <>
      <div className="flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen relative">
        <Header />
        <Shimeji></Shimeji>
        <main className=' flex-grow min-h-80 z-20 dark:text-white'>
          <Outlet></Outlet>
        </main>
        <Footer />
      </div>
    </>
  );
}