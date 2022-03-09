const NUMBER_TWELVE = 12;

async function drinkRequest() {
  try {
    const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const result = await data.json();
    const finalResult = result.drinks.slice(0, NUMBER_TWELVE);
    return (finalResult);
  } catch (err) {
    return err;
  }
}

export default drinkRequest;
