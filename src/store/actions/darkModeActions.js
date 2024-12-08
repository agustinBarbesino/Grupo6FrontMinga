export const TOGGLE_THEME = 'TOGGLE_THEME';
export const SET_THEME = 'SET_THEME';

export const toggleTheme = () => {
  return {
    type: TOGGLE_THEME
  };
};

export const setTheme = (isDark) => {
  return {
    type: SET_THEME,
    payload: isDark
  };
};

export const selectIsDarkMode = (state) => state.theme.isDarkMode;