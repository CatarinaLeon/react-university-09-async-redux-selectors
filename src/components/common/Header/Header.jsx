import { useContext } from 'react';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { ThemeContext, themes } from 'context/themeContext';
import PropTypes from 'prop-types';
import s from './Header.module.css';

const Header = ({ title }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <header className={theme === themes.light ? s.lightTheme : s.darkTheme}>
      <ThemeSwitcher />
      {title && <h2 className="heading">{title}</h2>}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
