import React, { useEffect, useContext } from 'react';
import myContext from '../../context/myContext';
import foodRequest from '../../services/FoodRequest';
import foodCategoryRequest from '../../services/FoodCategoryRequest';

function Foods() {
  const { resultRecipes,
    setResultRecipes,
    foodCategories,
    setFoodCategories } = useContext(myContext);

  const getFoods = async () => {
    setResultRecipes(await foodRequest());
  };

  const getFoodCategories = async () => {
    setFoodCategories(await foodCategoryRequest());
  };

  useEffect(() => {
    getFoods();
    getFoodCategories();
  }, []);

  return (
    <main>
      <section>
        {foodCategories.map((element) => (
          <label
            key={ element.strCategory }
            htmlFor={ element.strCategory }
          >
            {element.strCategory}
            <input
              type="radio"
              name={ element.strCategory }
              data-testid={ `${element.strCategory}-category-filter` }
            />
          </label>
        ))}
      </section>
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
    </main>
  );
}

export default Foods;
