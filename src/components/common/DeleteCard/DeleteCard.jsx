import PropTypes from 'prop-types';
import BigButton from '../BigButton/BigButton';
import styles from './DeleteCard.module.scss';

const DeleteCard = ({ text, onDelete, onClose }) => {
  return (
    <div className={styles.modalContent}>
      <p>{text}</p>
      <div className={styles.btnWrapper}>
        <BigButton text="Нет" onClick={onClose} isGray />
        <BigButton text="Да" onClick={onDelete} />
      </div>
    </div>
  );
};

DeleteCard.propTypes = {
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteCard;
