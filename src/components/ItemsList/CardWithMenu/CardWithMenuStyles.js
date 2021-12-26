export const cardStyles = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '9px 0 9px 14px',
  lineHeight: 1.5,

  '& button': {
    width: 32,
    height: 32,
    padding: 4,
    borderRadius: '50%',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    transition: 'all 200ms',
    '&:hover': {
      backgroundColor: '#ECEFF1',
    },
  },
};

export const menuStyles = {
  position: 'absolute',
  bottom: -108,
  right: 0,
  zIndex: 100,
  minWidth: 232,
  padding: '8px 0',
  backgroundColor: '#fff',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',

  '& .menu-item': {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 24px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#FAFAFA',
    },
    '& span:first-of-type': {
      height: 24,
      marginRight: 20,
    },
  },
};
