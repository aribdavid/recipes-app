import React, { useContext, useEffect } from 'react';
import CardRecipe from '../../componets/CardRecipe/CardRecipe';
import myContext from '../../context/myContext';
import drinkRequest from '../../services/DrinkRequest';

function Drinks() {
  const { resultRecipes, setResultRecipes } = useContext(myContext);

  const getDrinks = async () => {
    setResultRecipes(await drinkRequest());
  };

  useEffect(() => {
    getDrinks();
  }, []);

  return (
    <section>
      { resultRecipes.map((element, index) => (
        <CardRecipe
          key={ element.idDrink }
          index={ index }
          image={ element.strDrinkThumb }
          name={ element.strDrink }
        />
      ))}
    </section>
  );
}

export default Drinks;
