import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext, themes } from 'context/themeContext';
import { NavLink } from 'react-router-dom';
import './NavItem.scss';

const NavItem = ({ name, icon, path }) => {
  const { theme } = useContext(ThemeContext);

  const navItenStyles = ['NavItem'];
  theme === themes.dark && navItenStyles.push('NavItem-dark');

  return (
    <NavLink
      to={path}
      className={navItenStyles.join(' ')}
      activeClassName="NavItemActive"
    >
      <span className="iconWrapper">{icon}</span>
      <span className="itemName">{name}</span>
    </NavLink>
  );
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
};

export default NavItem;
