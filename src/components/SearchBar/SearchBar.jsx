import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import {
  StyledSearchBar,
  SearchForm,
  SearchBtn,
  SearchBtnLabel,
  SearchFormInput,
} from './SearchBar.styled';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.warn('Enter your query!');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <StyledSearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <ImSearch size="2em" />
          <SearchBtnLabel />
        </SearchBtn>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={query}
          onChange={handleQueryChange}
        />
      </SearchForm>
    </StyledSearchBar>
  );
};

export default SearchBar;
