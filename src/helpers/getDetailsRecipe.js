import detailsRecipeRequest from '../services/DetailsRecipeRequest';

const getIngredientMeasure = (array, key) => {
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
  const ingredients = getIngredientMeasure(array, 'strIngredient');
  const meassures = getIngredientMeasure(array, 'strMeasure');
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
      id: data.meals[0].idMeal,
      type: 'food',
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
      id: data.drinks[0].idDrink,
      type: 'drink',
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

const getDetailsRecipe = async (location) => {
  const idRecipe = location.split('/');
  const result = await detailsRecipeRequest(idRecipe[2], idRecipe[1]);
  return createDetailList(result, idRecipe[1]);
};

export default getDetailsRecipe;
