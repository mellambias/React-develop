import { useState, useEffect } from 'react';
import { getImage } from '../services/catImage';

function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (fact) getImage(fact).then(setImageUrl);
  }, [fact]);
  return { imageUrl };
}

export { useCatImage };
