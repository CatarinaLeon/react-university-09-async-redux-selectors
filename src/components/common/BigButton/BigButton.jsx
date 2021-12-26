/** @jsxImportSource @emotion/react */
import PropTypes from 'prop-types';

const btnStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 16px',
  backgroundColor: '#FF6B0A',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 200ms',
  '&:not(:disabled):hover': {
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
  },
  '&:disabled': {
    backgroundColor: '#FFE0B2',
    cursor: 'not-allowed',
  },
  '& .image': {
    marginRight: 10,
  },
  '& .heading': {
    color: '#fff',
    lineHeight: 1.2,
  },
};

const defineStyles = isGrey => ({
  ...btnStyles,
  backgroundColor: isGrey ? '#BDBDBD' : '#FF6B0A',
});

const BigButton = props => {
  const {
    text,
    icon,
    onClick = () => {},
    type = 'button',
    disabled = false,
    isGray = false,
  } = props;

  const finalStyles = defineStyles(isGray);

  return (
    <button css={finalStyles} type={type} onClick={onClick} disabled={disabled}>
      {icon && <img className="image" src={icon} alt={text} />}
      <span className="heading">{text}</span>
    </button>
  );
};

BigButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isGray: PropTypes.bool,
};

// const BigButton = ({ icon, text }) => {
//   return (
//     <button css={btnStyles}>
//       {icon && <img className="image" src={icon} alt={text} />}
//       <span className="heading">{text}</span>
//     </button>
//   );
// };

// BigButton.propTypes = {
//   text: PropTypes.string.isRequired,
//   onclick: PropTypes.func,
//   icon: PropTypes.string,
// };

export default BigButton;
