import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function DisorderedList({ recipe, id, type }) {
  const getInProgressRecipes = () => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'))
      || { cocktails: {}, meals: {} };
    return storage;
  };

  const saveStepInLocalStorage = (step) => {
    const typeFood = type === 'food' ? 'meals' : 'cocktails';
    const storage = getInProgressRecipes();
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...storage,
      [typeFood]: {
        ...storage[typeFood], [id]: [...storage[typeFood][id], step] },
    }));
  };

  useEffect(() => {
    const setInLocalStorage = () => {
      const storage = getInProgressRecipes();
      const typeFood = type === 'food' ? 'meals' : 'cocktails';
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...storage,
        [typeFood]: { ...storage[typeFood], [id]: [] },
      }));
    };

    setInLocalStorage();
  }, []);

  return (
    <ul>
      { recipe.map((element, index) => (
        <li
          data-testid={ `${index}-ingredient-step` }
          key={ element }
        >
          <label htmlFor={ element }>
            <input
              id={ element }
              type="checkbox"
              onClick={ ({ target }) => saveStepInLocalStorage(target.id) }
            />
            { element }
          </label>
        </li>
      )) }
    </ul>
  );
}

DisorderedList.propTypes = {
  recipe: PropTypes.arrayOf,
  id: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default DisorderedList;
