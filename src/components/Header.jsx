import React from 'react';
import styled from 'styled-components';
import star from '../assets/images/star_white.svg';
import starEmpty from '../assets/images/star_white_empty.svg';

const Wrapper = styled.div`
  background-color: var(--main);
  color: #fff;
  width: 100%;
  padding: 20px 30px;
  font-weight: bold;
  font-size: 22px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ToStarredWords = styled.button`
  font-size: inherit;
  color: inherit;
  font-weight: inherit;
  display: flex;
  align-items: center;

  &:hover {
    text-shadow: 0 0 2px #fff;
    img {
      filter: drop-shadow(0 0 2px #fff);
    }
  }
`;

const Star = styled.img`
  margin-right: 5px;
`;

const Header = ({ setStarMod, starMod }) => {
  return (
    <Wrapper className='border-radius'>
      Word Keeper
      <ToStarredWords onClick={() => setStarMod(!starMod)}>
        <Star src={starMod ? star : starEmpty} alt='' />
        Starred Words
      </ToStarredWords>
    </Wrapper>
  );
};

export default Header;
