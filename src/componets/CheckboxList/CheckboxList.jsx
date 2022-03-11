import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import myContext from '../../context/myContext';

function DisorderedList({ recipe, id, type }) {
  const [stepsDone, setStepsDone] = useState([]);
  const { setBtnFinishDisabled } = useContext(myContext);

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

  useEffect(() => {
    const verifyCheckbox = () => {
      const statusBtnFinished = recipe.every((element) => stepsDone.includes(element));
      setBtnFinishDisabled(!statusBtnFinished);
      console.log(statusBtnFinished);
    };
    verifyCheckbox();
  }, [stepsDone, setBtnFinishDisabled, recipe]);

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
    <>
      { recipe.map((element, index) => (
        <label
          htmlFor={ element }
          data-testid={ `${index}-ingredient-step` }
          key={ element }
        >
          <input
            id={ element }
            type="checkbox"
            checked={ stepsDone.includes(element) }
            onChange={ handleChange }
          />
          { element }
        </label>
      )) }
    </>
  );
}

DisorderedList.propTypes = {
  recipe: PropTypes.arrayOf,
  id: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default DisorderedList;
