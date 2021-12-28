import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeContext, themes } from 'context/themeContext';
// import {changeFilter} from '../../../redux/cities/citiesActions'
import { citiesActions, citiesSelectors } from 'redux/cities';

const Filter = ({ label = '' }) => {
  const filter = useSelector(citiesSelectors.getFilter);
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <label style={{ color: theme === themes.dark ? 'white' : 'black' }}>
        {label}
        <input
          type="text"
          value={filter}
          // onChange={e => onFilterChange(e.target.value)}
          onChange={e => dispatch(citiesActions.changeFilter(e.target.value))}
        ></input>
      </label>
    </div>
  );
};

Filter.propTypes = {
  // value: PropTypes.string.isRequired,
  label: PropTypes.string,
  // onFilterChange: PropTypes.func.isRequired,
};

export default Filter;

// import PropTypes from 'prop-types';

// const Filter = ({ label = '', value, onFilterChange }) => {
//   return (
//     <div>
//       <label>
//         {label}
//         <input
//           type="text"
//           value={value}
//           onChange={e => onFilterChange(e.target.value)}
//         ></input>
//       </label>
//     </div>
//   );
// };

// Filter.propTypes = {
//   value: PropTypes.string.isRequired,
//   label: PropTypes.string,
//   onFilterChange: PropTypes.func.isRequired,
// };

// export default Filter;
