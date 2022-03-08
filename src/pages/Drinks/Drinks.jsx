import React, { useContext, useEffect } from 'react';
import myContext from '../../context/myContext';
import drinkRequest from '../../services/DrinkRequest';

function Drinks() {
  const { resultRecipes, setResultRecipes } = useContext(myContext);
  const getDrinks = async () => {
    const results = await drinkRequest();
    setResultRecipes(...results);
  };
  useEffect(() => {
    getDrinks();
  }, []);

  return (
    <section>
      {resultRecipes.length > 0 && resultRecipes.map((element, index) => (
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
  );
}

export default Drinks;
