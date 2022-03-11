import React, { useContext } from 'react';
import myContext from '../../context/myContext';

function DoneRecipes() {
  const { doneRecipes } = useContext(myContext);

  return (
    <div>
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn">
        Food
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drink
      </button>
      {doneRecipes.map((recipe, index) => (
        <section
          key={ index }
        >
          <img
            className="image-card"
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.thumb }
            alt=" drink "
          />
          <h1 data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</h1>
          <h3 data-testid={ `${index}-horizontal-name` }>
            {recipe.title}
          </h3>
          <h4 data-testid={ `${index}-horizontal-done-date` }>
            {recipe.title}
          </h4>
          <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
            {recipe.title}
          </button>
          <p data-testid={ `${index}-horizontal-tag` }>Oi</p>

        </section>
      ))}
    </div>
  );
}

export default DoneRecipes;
