// src/Components/DarkMode/DarkMode.jsx
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, selectIsDarkMode } from '../../store/actions/darkModeActions';
import { Moon, Sun } from 'lucide-react';

export function DarkMode() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700" />
      )}
    </button>
  );
}

export default DarkMode;