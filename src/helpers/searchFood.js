import firstLetterRequest from '../services/FirstLetterRequest';
import ingredientRequest from '../services/IngredientRequest';
import nameRequest from '../services/NameRequest';

const searchFood = async (option, name) => {
  const options = {
    ingredient: ingredientRequest,
    name: nameRequest,
    'first letter': firstLetterRequest,
  };
  const result = await options[option](name);
  console.log(result);
};

export default searchFood;
