import React from 'react';
import { useHistory } from 'react-router-dom';

function ExploreRecipes() {
  const history = useHistory();

  return (
    <main className="explore-recipes-container">
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push} }
      >
        By Ingredient
      </button>
    </main>
  );
}

export default ExploreRecipes;
