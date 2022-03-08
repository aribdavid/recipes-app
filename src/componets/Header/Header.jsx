import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import searchFood from '../../helpers/searchFood';

function Header({ title, searchBtn }) {
  const [showInput, setShowInput] = useState(false);
  const [valueInputSearch, setValueInputSearch] = useState('');
  const [radioValue, setRadioValue] = useState('name');
  const history = useHistory();

  async function handleClickSearchFood() {
    if (radioValue === 'first letter' && valueInputSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const results = await searchFood(radioValue, valueInputSearch, title);
      if (results.length === 1) {
        return title === 'foods' ? history.push(`/${title}/${results[0].idMeal}`)
          : history.push(`/${title}/${results[0].idDrink}`);
      }
    }
  }

  const handleClickProfile = () => {
    history.push('/profile');
  };

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  return (
    <header className="header-container">
      <button type="button" onClick={ handleClickProfile }>
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
            value={ valueInputSearch }
            onChange={ ({ target }) => setValueInputSearch(target.value) }
          />

          <label htmlFor="ingredient">
            <input
              name="radio-buttons"
              type="radio"
              data-testid="ingredient-search-radio"
              value="ingredient"
              onChange={ ({ target }) => setRadioValue(target.value) }
            />
            Ingredient
          </label>

          <label htmlFor="name">
            <input
              name="radio-buttons"
              type="radio"
              data-testid="name-search-radio"
              value="name"
              onChange={ ({ target }) => setRadioValue(target.value) }
            />
            Name
          </label>

          <label htmlFor="first-letter">
            <input
              name="radio-buttons"
              type="radio"
              data-testid="first-letter-search-radio"
              value="first letter"
              onChange={ ({ target }) => setRadioValue(target.value) }
            />
            First letter
          </label>

          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ handleClickSearchFood }
          >
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
