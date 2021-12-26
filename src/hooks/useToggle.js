import { useState, useDebugValue } from 'react';

const useToggle = (initValue = false) => {
  const [state, setState] = useState(initValue);

  const toggleState = () => setState(prevState => !prevState);

  useDebugValue(state ? 'true' : 'false');

  return [state, toggleState];
};

export default useToggle;
