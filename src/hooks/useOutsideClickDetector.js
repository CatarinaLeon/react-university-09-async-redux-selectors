import { useEffect } from 'react';

const useOutsideClickDetector = (ref, action, shouldAct = true) => {
  useEffect(() => {
    if (!shouldAct) return;
    /**
     * Do action if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
    }
    // Add the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Remove the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, action, shouldAct]);
};

export default useOutsideClickDetector;
