import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header({ title, searchBtn }) {
  const history = useHistory();

  const handleClick = () => {
    history.push('/profile');
  };

  return (
    <header>
      <button type="button" onClick={ handleClick }>
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile Icon"
        />
      </button>
      <h1 data-testid="page-title">{ title }</h1>
      { searchBtn && (
        <img data-testid="search-top-btn" src={ searchIcon } alt="Search Button" />
      ) }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
