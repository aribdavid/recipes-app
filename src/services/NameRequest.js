async function nameRequest(name) {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const result = await data.json();
    return result;
  } catch (err) {
    return err;
  }
}

export default nameRequest;
