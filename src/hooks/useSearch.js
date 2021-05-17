import { useCallback, useEffect, useState } from 'react';
import { oxfordAPI } from '../api.js';

const useSearch = text => {
  const [list, setList] = useState([]);

  const fetchData = useCallback(async str => {
    const res = await oxfordAPI.search(str);
    setList(res);
  }, []);

  useEffect(() => {
    if (text) {
      fetchData(text);
    } else {
      setList([]);
    }
  }, [text, fetchData]);

  return { list };
};

export default useSearch;
