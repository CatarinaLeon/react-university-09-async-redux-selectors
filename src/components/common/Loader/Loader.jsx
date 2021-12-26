/** @jsxImportSource @emotion/react */

import PulseLoader from 'react-spinners/PulseLoader';

const wrapperStyles = {
  position: 'absolute',
  top: 0,
  left: '30%',
};

const Loader = () => {
  return (
    <div css={wrapperStyles}>
      <PulseLoader margin={4} size={13} color={'#ff6b0a'} />
    </div>
  );
};

export default Loader;
