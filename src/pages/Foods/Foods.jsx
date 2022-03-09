import React, { useEffect, useContext, useState } from 'react';
import CardRecipe from '../../componets/CardRecipe/CardRecipe';
import myContext from '../../context/myContext';
import foodRequest from '../../services/FoodRequest';
import foodCategoryRequest from '../../services/FoodCategoryRequest';
import filteredFoodRequest from '../../services/FilteredFoodRequest';

function Foods() {
  const { resultRecipes,
    setResultRecipes,
    foodCategories,
    setFoodCategories } = useContext(myContext);

  const [activeCategory, selectCategory] = useState('');

  useEffect(() => {
    const getFoods = async (category) => (
      activeCategory !== '' ? setResultRecipes(await filteredFoodRequest(category))
        : setResultRecipes(await foodRequest())
    );

    const getFoodCategories = async () => {
      setFoodCategories(await foodCategoryRequest());
    };

    getFoods(activeCategory);
    getFoodCategories();
  }, [setFoodCategories, setResultRecipes, activeCategory]);

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
              type="checkbox"
              id={ element.strCategory }
              data-testid={ `${element.strCategory}-category-filter` }
              value={ element.strCategory }
              name="category"
              onChange={ ({ target }) => {
                if (target.checked) {
                  selectCategory(target.value);
                } else {
                  selectCategory('');
                }
              } }
            />
          </label>
        ))}
      </section>
      <section>
        {resultRecipes
          .map((e, index) => (
            <CardRecipe
              key={ e.idMeal }
              index={ index }
              image={ e.strMealThumb }
              name={ e.strMeal }
            />
          )) }
      </section>
    </main>
  );
}

export default Foods;
