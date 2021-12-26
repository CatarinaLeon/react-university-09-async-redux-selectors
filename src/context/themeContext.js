import { createContext } from 'react';

const themes = {
  light: 'light',
  dark: 'dark',
};

const ThemeContext = createContext({
  theme: themes.light,
  toggleTheme: () => {},
});

export { ThemeContext, themes };
