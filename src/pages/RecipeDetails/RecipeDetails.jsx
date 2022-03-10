import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import myContext from '../../context/myContext';
import detailsRecipeRequest from '../../services/DetailsRecipeRequest';
import Loading from '../../componets/Loading/Loading';
import './style.css';
import RecommendedRecipes from '../../componets/RecommendedRecipes/RecommendedRecipes';
import DetailsRecipe from '../../componets/DetailsRecipe/DetailsRecipe';

function RecipeDetails() {
  const [loading, setLoading] = useState(true);
  const [typeFood, setTypeFood] = useState('');
  const [idFood, setIdFood] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const location = useLocation();
  const { setDetailsRecipe, detailsRecipe } = useContext(myContext);
  const history = useHistory();

  const getingredientMeasure = (array, key) => {
    const filterIngredients = array
      .filter((element) => (element[0].includes(key)))
      .filter((item) => item[1]);
    let values = [];

    filterIngredients.forEach((item) => {
      values = [...values, item[1]];
    });

    return values;
  };

  const getIngredientsAndMeassures = (array) => {
    const ingredients = getingredientMeasure(array, 'strIngredient');
    const meassures = getingredientMeasure(array, 'strMeasure');
    let recipe = [];
    ingredients.forEach((ingredient, index) => {
      recipe = [...recipe, `${ingredient} - ${meassures[index]}`];
    });

    return recipe;
  };

  const createDetailList = (data, food) => {
    const recipe = food === 'foods'
      ? getIngredientsAndMeassures(Object.entries(data.meals[0]))
      : getIngredientsAndMeassures(Object.entries(data.drinks[0]));

    return food === 'foods'
      ? {
        thumb: data.meals[0].strMealThumb,
        title: data.meals[0].strMeal,
        category: data.meals[0].strCategory,
        recipe,
        instructions: data.meals[0].strInstructions,
        video: data.meals[0].strYoutube,
        nationality: data.meals[0].strArea || '',
        alcoholicOrNot: '',
      }
      : {
        thumb: data.drinks[0].strDrinkThumb,
        title: data.drinks[0].strDrink,
        category: data.drinks[0].strCategory,
        recipe,
        instructions: data.drinks[0].strInstructions,
        video: data.drinks[0].strYoutube,
        nationality: data.drinks[0].strArea || '',
        alcoholicOrNot: data.drinks[0].strCategory === 'Cocktail' ? 'Alcoholic'
          : 'non-alcoholic',
      };
  };
  const getLocalStorage = () => {
    const favoriteArray = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setIsFavorite(favoriteArray.some((favorites) => favorites.id === idFood));
  };

  const getDetailsRecipe = async () => {
    const idRecipe = (location.pathname.split('/'));
    setTypeFood(idRecipe[1]);
    setIdFood(idRecipe[2]);
    const result = await detailsRecipeRequest(idRecipe[2], idRecipe[1]);
    setDetailsRecipe(createDetailList(result, idRecipe[1]));
    setLoading(false);
  };

  const redirectRecipeInProgress = () => {
    history.push({
      pathname: `/${typeFood}/${idFood}/in-progress`,
      state: { detailsRecipe },
    });
  };

  useEffect(() => {
    getDetailsRecipe();
  }, []);

  useEffect(() => {
    getLocalStorage();
  }, [idFood]);

  if (loading) return <Loading />;

  return (
    <main>
      <DetailsRecipe
        detailsRecipe={ detailsRecipe }
        idFood={ idFood }
        typeFood={ typeFood }
        isFavorite={ isFavorite }
        setIsFavorite={ setIsFavorite }
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

      <RecommendedRecipes typeFood={ typeFood } />

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
