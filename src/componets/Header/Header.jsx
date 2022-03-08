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
        <input
          data-testid="search-input"
          type="text"
          value={ inputSearch }
          onChange={ ({ target }) => setinputSearch(target.value) }
        />
      ) }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
