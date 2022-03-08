import React, { useEffect, useContext } from 'react';
import myContext from '../../context/myContext';
import foodRequest from '../../services/FoodRequest';

function Foods() {
  const { resultRecipes, setResultRecipes } = useContext(myContext);

  const getFoods = async () => {
    setResultRecipes(await foodRequest());
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <section>
      { resultRecipes.map((element, index) => (
        <section key={ element.idMeal } data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ element.strMealThumb }
            alt=" drink "
          />
          <h1 data-testid={ `${index}-card-name` }>
            {element.strMeal}
          </h1>
        </section>
      ))}
    </section>
  );
}

export default Foods;
