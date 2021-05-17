import { useState } from 'react';

const useStarred = text => {
  const [starredWords, setStarredWords] = useState([]);

  const addToStarred = word => {
    setStarredWords(arr => [...arr, word]);
  };

  const removeFromStarred = word => {
    setStarredWords(arr => arr.filter(item => item.word !== word.word));
  };

  return { starredWords, addToStarred, removeFromStarred, setStarredWords };
};

export default useStarred;
