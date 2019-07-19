/* eslint react-hooks/exhaustive-deps: */
import { useEffect } from 'react';
import debounce from 'debounce';

function useIntersect(callback) {
  useEffect(() => {
    const temp = window.onscroll;
    window.onscroll = debounce(() => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        callback && callback();
      }
    }, 100);

    return () => {
      window.onscroll.clear();
      window.onscroll = temp;
    }
  });
}

export default useIntersect;