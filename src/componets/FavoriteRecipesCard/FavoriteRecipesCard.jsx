import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';

export default function FavoriteRecipesCard({ recipe, index, unFavorite }) {
  const [isCopied, setIsCopied] = useState(false);
  const history = useHistory();

  function handleShare() {
    const currentURL = window.location.href;
    const url = `${currentURL.replace('favorite-recipes', '')}`
    + `${recipe.type}s/${recipe.id}`;
    window.navigator.clipboard.writeText(url);
    setIsCopied(true);
  }

  return (
    <div>
      <button
        type="button"
        data-testid={ `${index}-horizontal-image` }
        onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
      >
        <img
          src={ recipe.image }
          alt={ `${recipe.name}` }
        />
      </button>
      <h1
        data-testid={ `${index}-horizontal-top-text` }
      >
        {
          recipe.alcoholicOrNot === ''
            ? `${recipe.area} - ${recipe.category}`
            : `${recipe.alcoholicOrNot}`
        }
      </h1>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          { recipe.name }
        </p>
      </Link>
      <button
        type="button"
        name={ recipe.image }
        onClick={ () => handleShare() }
        data-testid={ `${index}-horizontal-share-btn` }
      >
        { isCopied ? 'Link copied!' : (
          <img
            className="share-icon"
            src={ shareIcon }
            alt="shareIcon"
          />
        )}
      </button>

      <button
        type="button"
        onClick={ (event) => unFavorite(event) }
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          className="favorite-button"
          src={ blackHeart }
          alt="Desfavoritar"
          name={ recipe.name }
          style={ { width: '25px' } }
        />
      </button>
    </div>
  );
}

FavoriteRecipesCard.propTypes = {
  index: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.shape({
      map: PropTypes.func,
    }),
    type: PropTypes.string.isRequired,
  }).isRequired,
  unFavorite: PropTypes.func.isRequired,
};
