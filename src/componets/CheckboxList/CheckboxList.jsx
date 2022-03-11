import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function DisorderedList({ recipe, id, type }) {
  const [stepsDone, setStepsDone] = useState([]);
  const getInProgressRecipes = () => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'))
      || { cocktails: {}, meals: {} };
    return storage;
  };

  const saveStepInLocalStorage = (step) => {
    setStepsDone([...stepsDone, step]);
    const typeFood = type === 'food' ? 'meals' : 'cocktails';
    const storage = getInProgressRecipes();
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...storage,
      [typeFood]: {
        ...storage[typeFood], [id]: [...stepsDone, step] },
    }));
  };

  const removeStepLocalStorage = (nameStep) => {
    const typeFood = type === 'food' ? 'meals' : 'cocktails';
    const storage = getInProgressRecipes();
    const newSteps = stepsDone.filter((step) => step !== nameStep);
    setStepsDone(newSteps);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...storage,
      [typeFood]: {
        ...storage[typeFood], [id]: newSteps },
    }));
  };

  const handleChange = ({ target }) => {
    if (stepsDone.includes(target.id)) removeStepLocalStorage(target.id);
    else saveStepInLocalStorage(target.id);
  };

  useEffect(() => {
    const storage = getInProgressRecipes();
    const typeFood = type === 'food' ? 'meals' : 'cocktails';

    const getStepsDone = () => {
      const array = storage[typeFood][id] || [];
      setStepsDone(array);
    };

    getStepsDone();
  }, [type, id]);

  return (
    <ul>
      { recipe.map((element, index) => (
        <li
          key={ element }
        >
          <label
            htmlFor={ element }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              id={ element }
              type="checkbox"
              checked={ stepsDone.includes(element) }
              onChange={ handleChange }
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
