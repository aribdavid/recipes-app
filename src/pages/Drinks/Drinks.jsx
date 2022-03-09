import React, { useContext, useEffect, useState } from 'react';
import CardRecipe from '../../componets/CardRecipe/CardRecipe';
import myContext from '../../context/myContext';
import drinkRequest from '../../services/DrinkRequest';
import drinkCategoryRequest from '../../services/DrinkCategoryRequest';
import filteredDrinkRequest from '../../services/FilteredDrinkRequest';

function Drinks() {
  const { resultRecipes, setResultRecipes,
    drinkCategories, setDrinkCategories } = useContext(myContext);

  const [activeCategory, selectCategory] = useState('');

  useEffect(() => {
    const getDrinks = async (category) => (
      activeCategory !== '' ? setResultRecipes(await filteredDrinkRequest(category))
        : setResultRecipes(await drinkRequest())
    );

    const getDrinksCategories = async () => {
      setDrinkCategories(await drinkCategoryRequest());
    };
    getDrinks(activeCategory);
    getDrinksCategories();
  }, [setDrinkCategories, setResultRecipes, activeCategory]);

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
              type="checkbox"
              name="category"
              id={ element.strCategory }
              value={ element.strCategory }
              data-testid={ `${element.strCategory}-category-filter` }
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
        <label
          htmlFor="all"
        >
          All
          <input
            type="checkbox"
            name="category"
            id="all"
            data-testid="All-category-filter"
            onChange={ ({ target }) => {
              if (target.checked) {
                selectCategory('');
              }
            } }
          />
        </label>
      </section>
      <section>
        { resultRecipes.map((element, index) => (
          <CardRecipe
            key={ element.idDrink }
            id={ element.idDrink }
            type="drinks"
            index={ index }
            image={ element.strDrinkThumb }
            name={ element.strDrink }
          />
        ))}
      </section>
    </main>
  );
}

export default Drinks;
