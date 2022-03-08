async function ingredientRequest(ingredient) {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const result = await data.json();
    return result;
  } catch (err) {
    return err;
  }
}

export default ingredientRequest;
