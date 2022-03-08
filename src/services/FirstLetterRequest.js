async function firstLetterRequest(firstLetter) {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const result = await data.json();
    return result;
  } catch (err) {
    return err;
  }
}

export default firstLetterRequest;
