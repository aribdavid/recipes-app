import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header({ title, searchBtn }) {
  const [showInput, setShowInput] = useState(false);
  const [inputSearch, setinputSearch] = useState('');
  const history = useHistory();

  const handleClick = () => {
    history.push('/profile');
  };

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  return (
    <header className="header-container">
      <button type="button" onClick={ handleClick }>
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile Icon"
        />
      </button>
      <h1 data-testid="page-title">{ title }</h1>
      { searchBtn && (
        <button type="button" onClick={ toggleInput }>
          <img data-testid="search-top-btn" src={ searchIcon } alt="Search Button" />
        </button>
      ) }
      { showInput && (
        <div>
          <input
            data-testid="search-input"
            type="text"
            value={ inputSearch }
            onChange={ ({ target }) => setinputSearch(target.value) }
          />

          <label htmlFor="ingredient">
            <input
              name="radio-buttons"
              type="radio"
              data-testid="ingredient-search-radio"
              value="ingredient"
            />
            Search Ingredient
          </label>

          <label htmlFor="name">
            <input
              name="radio-buttons"
              type="radio"
              data-testid="name-search-radio"
              value="name"
            />
            Search Name
          </label>

          <label htmlFor="first-letter">
            <input
              name="radio-buttons"
              type="radio"
              data-testid="first-letter-search-radio"
              value="first-letter"
            />
            Search By First Letter
          </label>

          <button type="button" data-testid="exec-search-btn">
            Search
          </button>
        </div>

      ) }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
