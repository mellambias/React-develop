import { useState, useEffect } from 'react';
import { getCatFact } from '../services/facts';

function useCatFact() {
  const [fact, setFact] = useState(null);
  const getFact = () => {
    getCatFact().then(setFact);
  };
  useEffect(getFact, []);
  return [fact, getFact];
}

export { useCatFact };
