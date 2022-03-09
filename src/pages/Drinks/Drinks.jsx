import React, { useContext, useEffect } from 'react';
import CardRecipe from '../../componets/CardRecipe/CardRecipe';
import myContext from '../../context/myContext';
import drinkRequest from '../../services/DrinkRequest';
import drinkCategoryRequest from '../../services/DrinkCategoryRequest';

function Drinks() {
  const { resultRecipes, setResultRecipes,
    drinkCategories, setDrinkCategories } = useContext(myContext);

  const getDrinks = async () => {
    setResultRecipes(await drinkRequest());
  };

  const getDrinksCategories = async () => {
    setDrinkCategories(await drinkCategoryRequest());
  };

  useEffect(() => {
    getDrinks();
    getDrinksCategories();
  }, []);

  return (
    <main>
      <section>
        {drinkCategories.map((element) => (
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
          <section key={ element.idDrink } data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ element.strDrinkThumb }
              alt=" drink "
            />
            <h1 data-testid={ `${index}-card-name` }>
              {element.strDrink}
            </h1>
          </section>
        ))}
      </section>
    </main>
  );
}

export default Drinks;
