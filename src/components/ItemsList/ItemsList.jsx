/** @jsxImportSource @emotion/react */

import { memo } from 'react';
// import { useEffect} from 'react';

import PropTypes from 'prop-types';
import Paper from 'components/common/Paper/Paper';
import CardWithMenu from './CardWithMenu/CardWithMenu';
import { listStyles } from './ItemsListStyles';

const ItemsList = ({ items, onEditItem, onDeleteItem, link }) => {
  //  // // вызов при любом перерендере
  //   console.log('ItemsList');

  //   // вызовы при рендерах в зависимости от изменившихся пропов
  //   useEffect(() => {
  //     console.log('items');
  //   }, [items]);

  //   useEffect(() => {
  //     console.log('onEditItem');
  //   }, [onEditItem]);

  //   useEffect(() => {
  //     console.log('onDeleteItem');
  //   }, [onDeleteItem]);

  return (
    <ul css={listStyles}>
      {items.map(item => (
        <li key={item.id}>
          <Paper>
            <CardWithMenu
              item={item}
              link={link}
              text={item.name}
              onEdit={() => onEditItem(item)}
              onDelete={() => onDeleteItem(item)}
            />
          </Paper>
        </li>
      ))}
    </ul>
  );
};

ItemsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ).isRequired,
  onEditItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  link: PropTypes.string,
};

// export default ItemsList;
export default memo(ItemsList);
