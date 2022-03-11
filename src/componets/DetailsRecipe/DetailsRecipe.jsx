import React, { useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function DetailsRecipe({ detailsRecipe, isFavorite, setIsFavorite }) {
  const [copied, setCopied] = useState(false);
  const dataFavoriteRecipes = () => {
    const favoriteArray = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    if (isFavorite) {
      const newFavorites = favoriteArray
        .filter((recipe) => recipe.id !== detailsRecipe.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      const objectFavortiteRecipes = {
        id: detailsRecipe.id,
        type: detailsRecipe.type,
        nationality: detailsRecipe.nationality,
        category: detailsRecipe.category,
        alcoholicOrNot: detailsRecipe.alcoholicOrNot,
        name: detailsRecipe.title,
        image: detailsRecipe.thumb,
      };
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...favoriteArray, objectFavortiteRecipes]));
    }
    setIsFavorite(!isFavorite);
  };

  const copyLink = () => {
    copy(window.location.href);
    setCopied(true);
  };
  return (
    <div>
      <img
        className="image-recipe"
        data-testid="recipe-photo"
        src={ detailsRecipe.thumb }
        alt="imagem da receita"
      />
      <h1
        className="title-recipe"
        data-testid="recipe-title"
      >
        { detailsRecipe.title }
      </h1>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ copyLink }
      >
        { copied ? 'Link copied!' : 'Share' }
      </button>
      <button
        type="button"
        onClick={ dataFavoriteRecipes }
      >
        {isFavorite ? <img
          data-testid="favorite-btn"
          src={ blackHeartIcon }
          alt="favorite icon black"
        />
          : <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="favorite icon" />}
      </button>

      <p data-testid="recipe-category">
        { detailsRecipe.category === 'Cocktail' ? 'Alcoholic' : detailsRecipe.category }
      </p>

      <ul>
        { detailsRecipe.recipe.map((element, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ element }
          >
            { element }
          </li>
        )) }
      </ul>
      <div className="instructions-recipe">
        <p data-testid="instructions">
          { detailsRecipe.instructions }
        </p>
      </div>
    </div>
  );
}

DetailsRecipe.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  detailsRecipe: PropTypes.objectOf,
  category: PropTypes.string,
  nationality: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
  title: PropTypes.string,
  thumb: PropTypes.string,
  recipe: PropTypes.arrayOf,
  instructions: PropTypes.string,
}.isRequired;

export default DetailsRecipe;
