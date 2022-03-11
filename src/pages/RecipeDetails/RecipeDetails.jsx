import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Loading from '../../componets/Loading/Loading';
import './style.css';
import RecommendedRecipes from '../../componets/RecommendedRecipes/RecommendedRecipes';
import DetailsRecipe from '../../componets/DetailsRecipe/DetailsRecipe';
import getDetailsRecipe from '../../helpers/getDetailsRecipe';

function RecipeDetails() {
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const location = useLocation();
  const [detailsRecipe, setDetailsRecipe] = useState({});
  const history = useHistory();

  const redirectRecipeInProgress = () => {
    history.push(`/${detailsRecipe.type}s/${detailsRecipe.id}/in-progress`);
  };

  useEffect(() => {
    const fetchDetailRecipe = async () => {
      setDetailsRecipe(await getDetailsRecipe(location.pathname));
      setLoading(false);
    };

    const getFavoritesLocalStorage = () => {
      const favoriteArray = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      setIsFavorite(favoriteArray.some((favorites) => favorites.id === detailsRecipe.id));
    };

    fetchDetailRecipe();
    getFavoritesLocalStorage();
  }, [setDetailsRecipe, location.pathname, detailsRecipe.id]);

  if (loading) return <Loading />;

  return (
    <main>
      <DetailsRecipe
        detailsRecipe={ detailsRecipe }
        isFavorite={ isFavorite }
        setIsFavorite={ setIsFavorite }
        checkbox={ false }
      />

      { detailsRecipe.video !== undefined && (
        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ detailsRecipe.video }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer;
          autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}

      <RecommendedRecipes typeFood={ detailsRecipe.type } />

      <button
        data-testid="start-recipe-btn"
        type="button"
        className="button-start-recipe"
        onClick={ redirectRecipeInProgress }
      >
        Start Recipe
      </button>
    </main>
  );
}

export default RecipeDetails;
