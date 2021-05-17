import { useEffect, useState } from 'react';
import styled from 'styled-components';
import search from '../assets/images/search.svg';
import useSearch from '../hooks/useSearch';

const Wrapper = styled.div`
  padding: 15px;
  background-color: #efefef;
  width: 25%;
  min-width: 25%;
  margin-right: 20px;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 15px;

  &::after {
    content: '';
    position: absolute;
    width: 32px;
    height: 32px;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: url(${search}) no-repeat;
  }
`;

const Input = styled.input`
  border-radius: 3px;
  border: 1px solid var(--main);
  padding: 15px;
  outline: none;
  width: 100%;
  font-weight: bold;
  padding-right: 50px;

  &:focus {
    box-shadow: 0 0 2px var(--main);
  }
`;

const Checkbox = styled.div`
  margin-bottom: 10px;

  input {
    display: none;

    &:checked + label::before {
      background-color: var(--main);
    }
  }
`;

const Label = styled.label`
  cursor: pointer;
  position: relative;
  padding-left: 30px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-color: #fff;
  }
`;

const SearchBlock = ({ setWords, starMod, filterStarredWords }) => {
  const [searchText, setSearchText] = useState('');
  const { list } = useSearch(searchText);
  const [filters, setFilters] = useState({ adjective: false, verb: false, noun: false });

  useEffect(() => {
    const savedText = localStorage.getItem('searchText');
    savedText && setSearchText(savedText);
    const savedFilters = JSON.parse(localStorage.getItem('filters'));
    savedFilters && setFilters(savedFilters);
  }, []);

  useEffect(() => {
    setWords(list);
  }, [list, setWords]);

  useEffect(() => {
    if (starMod) {
      filterStarredWords(searchText, filters);
    }
    localStorage.setItem('searchText', searchText);
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [searchText, filterStarredWords, starMod, filters]);

  const filtersHandler = event => {
    setFilters(obj => ({ ...obj, [event.target.id]: !filters[event.target.id] }));
  };

  return (
    <Wrapper className='border-radius'>
      <InputWrapper>
        <Input value={searchText} onChange={e => setSearchText(e.target.value)} />
      </InputWrapper>
      {starMod &&
        Object.keys(filters).map(item => {
          return (
            <Checkbox key={item}>
              <input checked={filters[item]} onChange={filtersHandler} type='checkbox' id={item} />
              <Label htmlFor={item}>{item}</Label>
            </Checkbox>
          );
        })}
    </Wrapper>
  );
};

export default SearchBlock;
