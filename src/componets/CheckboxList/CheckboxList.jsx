import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function DisorderedList({ recipe, id }) {
  const getInProgressRecipes = () => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'))
      || { cocktails: {}, meals: {} };
    console.log(storage);
  };

  useEffect(() => {
    getInProgressRecipes();
  }, []);

  return (
    <ul>
      { recipe.map((element, index) => (
        <li
          data-testid={ `${index}-ingredient-step` }
          key={ element }
        >
          <label htmlFor={ element }>
            <input id={ element } type="checkbox" />
            { element }
          </label>
        </li>
      )) }
    </ul>
  );
}

DisorderedList.propTypes = {
  recipe: PropTypes.arrayOf,
  id: PropTypes.number,
}.isRequired;

export default DisorderedList;
