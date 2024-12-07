import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsDarkMode } from '../store/actions/darkModeActions';
import { Outlet } from 'react-router-dom';
import Header from '../Components/LayoutsCom/Header.jsx';
import Footer from '../Components/LayoutsCom/Footer.jsx';

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
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main className="flex-grow min-h-80 dark:text-white">
          <Outlet></Outlet>
        </main>
        <Footer />
      </div>
    </>
  );
}