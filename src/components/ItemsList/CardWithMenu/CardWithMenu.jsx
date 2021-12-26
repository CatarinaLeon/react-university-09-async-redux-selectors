/** @jsxImportSource @emotion/react */

import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useOutsideClickDetector from 'hooks/useOutsideClickDetector';
import { cardStyles, menuStyles } from './CardWithMenuStyles';
import { ReactComponent as DotsIcon } from 'images/dots.svg';
import editIcon from 'images/edit.svg';
import deleteIcon from 'images/delete.svg';

const CardWithMenu = ({ item, onEdit, onDelete, link }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const cardRef = useRef(null);
  const toggleMenu = () => setIsMenuOpen(prevState => !prevState);
  useOutsideClickDetector(cardRef, toggleMenu, isMenuOpen);

  const handleEdit = () => {
    onEdit();
    toggleMenu();
  };

  const handleDelete = () => {
    onDelete();
    toggleMenu();
  };

  return (
    <div ref={cardRef} css={cardStyles}>
      {link && (
        <Link
          to={{
            pathname: `/${link}/${item.id}`,
            state: {
              from: location,
              label: 'Назад к университету',
            },
          }}
        >
          <p>{item.name}</p>
        </Link>
      )}
      {!link && <p>{item.name}</p>}

      <button type="button" onClick={toggleMenu} aria-label="Menu">
        <DotsIcon />
      </button>

      {isMenuOpen && (
        <div css={menuStyles}>
          <div className="menu-item" onClick={handleEdit}>
            <span>
              <img src={editIcon} alt="Edit" />
            </span>
            <span>редактировать</span>
          </div>
          <div className="menu-item" onClick={handleDelete}>
            <span>
              <img src={deleteIcon} alt="Delete" />
            </span>
            <span>удалить</span>
          </div>
        </div>
      )}
    </div>
  );
};

CardWithMenu.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  link: PropTypes.string,
};

export default CardWithMenu;
