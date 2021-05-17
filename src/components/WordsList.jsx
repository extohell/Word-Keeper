import React, { useState } from 'react';
import styled from 'styled-components';
import Word from './Word';

const Wrapper = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`;

const WordsList = ({
  words,
  removeFromStarred,
  addToStarred,
  starredWords,
  filtredStarredWords,
  starMod,
  setStarredWords
}) => {
  const list = starMod ? filtredStarredWords : words;
  const [dragging, setDragging] = useState(null);

  const onDragOver = overItem => {
    if (dragging !== overItem) {
      console.log(overItem);
      const draggingIndex = starredWords.findIndex(item => item.word === dragging);
      const overIndex = starredWords.findIndex(item => item.word === overItem);
      const result = [...starredWords];
      const tmp = result[draggingIndex];
      result[draggingIndex] = result[overIndex];
      result[overIndex] = tmp;

      setStarredWords(result);
    }
  };

  return (
    <Wrapper>
      {list.map(item => {
        return (
          <Word
            item={item}
            key={item.word}
            starred={starredWords.some(starred => starred.word === item.word)}
            addToStarred={addToStarred}
            removeFromStarred={removeFromStarred}
            starMod={starMod}
            onDragOver={onDragOver}
            dragging={dragging}
            setDragging={setDragging}
          />
        );
      })}
    </Wrapper>
  );
};

export default WordsList;
