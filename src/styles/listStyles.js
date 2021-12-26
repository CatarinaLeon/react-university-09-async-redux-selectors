const listStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  '& li': {
    flex: '0 0 370px',
    marginBottom: 24,
    marginRight: 32,
  },
};

const itemStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '9px 0 9px 14px',
  lineHeight: 1.5,
  '& button': {
    flexShrink: 0,
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

export { listStyles, itemStyles };
