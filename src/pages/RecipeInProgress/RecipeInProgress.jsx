import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsRecipe from '../../componets/DetailsRecipe/DetailsRecipe';
import Loading from '../../componets/Loading/Loading';
import getDetailsRecipe from '../../helpers/getDetailsRecipe';

function RecipeInProgress() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [detailsRecipe, setDetailsRecipe] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDetailRecipe = async () => {
      setDetailsRecipe(await getDetailsRecipe(location.pathname));
      setLoading(false);
    };

    const getLocalStorage = () => {
      const favoriteArray = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      setIsFavorite(favoriteArray.some((favorites) => favorites.id === detailsRecipe.id));
    };

    fetchDetailRecipe();
    getLocalStorage();
  }, [setDetailsRecipe, location.pathname, detailsRecipe.id]);

  if (loading) return <Loading />;

  return (
    <main>
      <DetailsRecipe
        detailsRecipe={ detailsRecipe }
        isFavorite={ isFavorite }
        setIsFavorite={ setIsFavorite }
        checkbox
      />

      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </main>
  );
}

export default RecipeInProgress;
