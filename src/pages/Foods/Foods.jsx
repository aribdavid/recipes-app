import React, { useEffect, useContext } from 'react';
import CardRecipe from '../../componets/CardRecipe/CardRecipe';
import myContext from '../../context/myContext';
import foodRequest from '../../services/FoodRequest';

function Foods() {
  const { resultRecipes, setResultRecipes } = useContext(myContext);

  const getFoods = async () => {
    const NUMBER_TWELVE = 12;
    setResultRecipes(await foodRequest(NUMBER_TWELVE));
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <section>
      { resultRecipes.map((element, index) => (
        <CardRecipe
          key={ element.idMeal }
          index={ index }
          image={ element.strMealThumb }
          name={ element.strMeal }
        />
      ))}
    </section>
  );
}

export default Foods;
