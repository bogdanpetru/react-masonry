import { useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

export const useWindowWidth = () => {
  const [ width, setWidth ] = useState();
  const debounceRef = useRef(debounce(setWidth, 300));

  useEffect(() => {
    const onResize = () => { // todo add throttle
      debounceRef.current(global.innerWidth);
    }
    global.addEventListener('resize', onResize);

    return () => {
      global.removeEventListener('resize', onResize);
    }
  }, [])

  return width;
}
