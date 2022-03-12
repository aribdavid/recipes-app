import React, { useState, useEffect } from 'react';
import shareIcon from '../../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isShared, setShare] = useState(false);

  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);
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
        recipe.type === 'food' ? (
          <section
            key={ index }
          >
            <img
              className="image-card"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt=" food "
            />
            <h1 data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category} `}
            </h1>
            <h3 data-testid={ `${index}-horizontal-name` }>
              {recipe.name}
            </h3>
            <h4 data-testid={ `${index}-horizontal-done-date` }>
              {recipe.doneDate}
            </h4>
            <button
              type="button"
              value="kleber"
              onClick={ () => {
                navigator.clipboard.writeText(`http://localhost:3000/foods/${recipe.id}`);
                setShare(true);
              } }
            >
              {isShared ? 'Link copied!' : (
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="share-logo"
                  src={ shareIcon }
                />
              )}
            </button>
            {recipe.tags.map((tag) => (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}

              </span>
            ))}

          </section>
        ) : (
          <section
            key={ index }
          >
            <img
              className="image-card"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt=" drink "
            />
            <h1 data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.alcoholicOrNot}`}
            </h1>
            <h3 data-testid={ `${index}-horizontal-name` }>
              {recipe.name}
            </h3>
            <h4>{recipe.alcoholicOrNot}</h4>
            <h4 data-testid={ `${index}-horizontal-done-date` }>
              {recipe.doneDate}
            </h4>
            <button
              type="button"
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                alt="share-logo"
                src={ shareIcon }
              />
            </button>
          </section>
        )
      ))}
    </div>
  );
}

export default DoneRecipes;
