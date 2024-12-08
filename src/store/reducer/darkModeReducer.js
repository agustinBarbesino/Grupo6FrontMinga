import { TOGGLE_THEME, SET_THEME } from '../actions/themeActions';

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme === 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initialState = {
  isDarkMode: getInitialTheme()
};

const darkModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      const newDarkMode = !state.isDarkMode;
      localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
      return {
        ...state,
        isDarkMode: newDarkMode
      };
    case SET_THEME:
      localStorage.setItem('theme', action.payload ? 'dark' : 'light');
      return {
        ...state,
        isDarkMode: action.payload
      };
    default:
      return state;
  }
};

export default darkModeReducer;