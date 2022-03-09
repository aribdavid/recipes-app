import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import myContext from '../../context/myContext';
import detailsRecipeRequest from '../../services/DetailsRecipeRequest';
import Loading from '../../componets/Loading/Loading';
import './style.css';

function RecipeDetails() {
  const recomendados = ['um'];
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { setDetailsRecipe, detailsRecipe } = useContext(myContext);

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

  const createDetailList = (data, typeFood) => {
    const recipe = typeFood === 'foods'
      ? getIngredientsAndMeassures(Object.entries(data.meals[0]))
      : getIngredientsAndMeassures(Object.entries(data.drinks[0]));

    return typeFood === 'foods'
      ? {
        thumb: data.meals[0].strMealThumb,
        title: data.meals[0].strMeal,
        category: data.meals[0].strCategory,
        recipe,
        instructions: data.meals[0].strInstructions,
        video: data.meals[0].strYoutube,
      }
      : {
        thumb: data.drinks[0].strDrinkThumb,
        title: data.drinks[0].strDrink,
        category: data.drinks[0].strCategory,
        recipe,
        instructions: data.drinks[0].strInstructions,
        video: data.drinks[0].strYoutube,
      };
  };

  const getDetailsRecipe = async () => {
    const idRecipe = (location.pathname.split('/'));
    const result = await detailsRecipeRequest(idRecipe[2], idRecipe[1]);
    setDetailsRecipe(createDetailList(result, idRecipe[1]));
    setLoading(false);
  };

  useEffect(() => {
    getDetailsRecipe();
  }, []);

  if (loading) return <Loading />;

  return (
    <main>
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
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button data-testid="favorite-btn" type="button">Favoritar</button>

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

      <ul>
        { recomendados.map((element, index) => (
          <li
            data-testid={ `${index}-recomendation-card` }
            key={ element }
          >
            { element }
          </li>
        )) }
      </ul>

      <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
    </main>
  );
}

export default RecipeDetails;
