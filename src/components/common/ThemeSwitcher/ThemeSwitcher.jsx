import { useContext } from 'react';
import { ThemeContext, themes } from 'context/themeContext';
import css from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={css.container}>
      <label className={css.switch}>
        <input
          type="checkbox"
          onChange={toggleTheme}
          checked={theme === themes.light}
        />
        <span className={`${css.slider} ${css.round}`}></span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
