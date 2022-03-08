async function ingredientRequest(ingredient, typeFood) {
  const url = typeFood === 'Foods'
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  try {
    const data = await fetch(url);
    const result = await data.json();
    return result;
  } catch (err) {
    return err;
  }
}

export default ingredientRequest;
