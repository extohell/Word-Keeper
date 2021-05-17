import React, { useState } from 'react';
import styled from 'styled-components';
import starEmpty from '../assets/images/star_empty.svg';
import starFull from '../assets/images/star_full.svg';

const Wrapper = styled.div`
  background-color: #fff;
  padding: 8px 15px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 3px;

  opacity: ${props => (props.dragging ? 0.2 : 1)};
  box-shadow: ${props => (props.dragging ? 'inset 0 0 0 2px #000' : 'none')};

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const Btn = styled.button`
  margin-left: auto;
  img {
    display: block;
  }

  &:hover {
    filter: drop-shadow(0 0 2px var(--main));
  }
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 20px;
`;

const Part = styled.span`
  font-style: italic;
  margin-right: 20px;
`;

const Desc = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 20px;
`;

const ShortInfo = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

const Burger = styled.span`
  margin-right: 20px;
  min-width: 30px;
  height: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    height: 1px;
    width: 100%;
    background-color: #000;
  }
`;

const Info = styled.div`
  width: 100%;
  font-size: 16px;
  margin-top: 20px;

  * {
    font-size: 16px;
  }
`;

const Word = ({ item, addToStarred, removeFromStarred, starred, starMod, onDragOver, dragging, setDragging }) => {
  const { word, defs, tags } = item;
  const [showInfo, setShowInfo] = useState(false);

  const starWordHandler = event => {
    event.stopPropagation();
    starred ? removeFromStarred(item) : addToStarred(item);
  };

  return (
    <Wrapper
      draggable={starMod}
      onDragStart={() => setDragging(word)}
      onDragEnd={() => setDragging(null)}
      dragging={dragging === word}
      onDragEnter={() => onDragOver(word)}>
      <ShortInfo onClick={() => setShowInfo(!showInfo)}>
        {starMod && (
          <Burger>
            <span />
            <span />
            <span />
          </Burger>
        )}
        <Label>{word}</Label>
        <Part>{tags.part_of_speach}</Part>
        {!!defs.length && !showInfo && <Desc>{defs[0]}</Desc>}
        <Btn onClick={starWordHandler}>
          <img src={starred ? starFull : starEmpty} width='30' height='30' alt='' />
        </Btn>
      </ShortInfo>
      {showInfo && (
        <Info>
          <b>Pronunciation</b>: <span>{tags.ipa_pron}</span>
          {!!defs.length && (
            <div>
              <p>
                <b>Definitions:</b>
              </p>
              <ul>
                {defs.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </Info>
      )}
    </Wrapper>
  );
};

export default Word;
