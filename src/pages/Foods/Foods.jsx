import React, { useEffect, useContext } from 'react';
import CardRecipe from '../../componets/CardRecipe/CardRecipe';
import myContext from '../../context/myContext';
import foodRequest from '../../services/FoodRequest';
import foodCategoryRequest from '../../services/FoodCategoryRequest';

function Foods() {
  const { resultRecipes,
    setResultRecipes,
    foodCategories,
    setFoodCategories } = useContext(myContext);

  useEffect(() => {
    const getFoods = async () => {
      setResultRecipes(await foodRequest());
    };

    const getFoodCategories = async () => {
      setFoodCategories(await foodCategoryRequest());
    };
    getFoods();
    getFoodCategories();
  }, [setFoodCategories, setResultRecipes]);

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
          <CardRecipe key={ element.idMeal } data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ element.strMealThumb }
              alt=" drink "
            />
            <h1 data-testid={ `${index}-card-name` }>
              {element.strMeal}
            </h1>
          </CardRecipe>
        ))}
      </section>
    </main>
  );
}

export default Foods;
