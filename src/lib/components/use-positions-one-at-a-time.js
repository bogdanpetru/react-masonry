import {useRef, useState, useEffect} from 'react';

const usePositionsOneAtATime = (positions, transitionStep = 100) => {
  const [oneAtATimePositions, setPositions] = useState([]);
  const timeoutRef = useRef();

  const placeStone = (positions, currentStone = 0) => {
    if (positions.length + 1 < currentStone) {
      return;
    }

    setPositions(positions.slice(0, currentStone));

    timeoutRef.current = setTimeout(
      () => placeStone(positions, currentStone + 1),
      transitionStep
    );
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    placeStone(positions);
  }, [positions]);

  return oneAtATimePositions;
};

export { usePositionsOneAtATime };
