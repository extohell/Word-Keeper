import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import SearchBlock from './components/SearchBlock';
import WordsList from './components/WordsList';
import useStarred from './hooks/useStarred';

const Wrapper = styled.div`
  width: 1000px;
  background-color: #f8f5f5;
  padding: 10px;
  margin-top: 200px;
`;

const Content = styled.div`
  margin-bottom: 20px;
  display: flex;
  min-height: 150px;
`;

const Title = styled.p`
  font-size: 30px;
  margin-left: 15px;
  font-weight: bold;
`;

const App = () => {
  const [words, setWords] = useState([]);
  const [starMod, setStarMod] = useState(false);
  const { starredWords, addToStarred, removeFromStarred, setStarredWords } = useStarred();
  const [filtredStarredWords, setFiltredStarredWords] = useState(starredWords);

  const filterStarredWords = useCallback(
    (text, filters) => {
      const activeFilters = Object.keys(filters).filter(key => filters[key]);
      setFiltredStarredWords(
        starredWords.filter(item => {
          const match = item.word.startsWith(text),
            withFilter = activeFilters.length ? activeFilters.includes(item.tags.part_of_speach) : true;
          return withFilter && match;
        })
      );
    },
    [starredWords]
  );

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('starredWords'));
    saved?.length && setStarredWords(saved);
  }, [setStarredWords]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('starMod'));
    saved && setStarMod(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('starredWords', JSON.stringify(starredWords));
  }, [starredWords]);

  useEffect(() => {
    localStorage.setItem('starMod', JSON.stringify(starMod));
  }, [starMod]);

  return (
    <Wrapper className='border-radius'>
      <Header setStarMod={setStarMod} starMod={starMod} />
      {starMod && <Title>Starred Words</Title>}
      <Content>
        <SearchBlock setWords={setWords} starMod={starMod} filterStarredWords={filterStarredWords} />
        <WordsList
          words={words}
          addToStarred={addToStarred}
          starredWords={starredWords}
          filtredStarredWords={filtredStarredWords}
          removeFromStarred={removeFromStarred}
          starMod={starMod}
          setStarredWords={setStarredWords}
        />
      </Content>
    </Wrapper>
  );
};

export default App;
