import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import nationalitiesRequest from '../../services/NationalitiesRequest';
import nationalityFilterRequest from '../../services/NationalityFilterRequest';
import foodRequest from '../../services/FoodRequest';

const NUMBER_TWELVE = 12;

function ExploreNationalities() {
  const [nationalities, setNationalities] = useState([]);
  const [activeNationality, setActiveNationality] = useState('');
  const [recipesData, setRecipesData] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      setNationalities(await nationalitiesRequest());
      setRecipesData(await foodRequest(NUMBER_TWELVE));
      if (activeNationality === 'All') {
        setRecipesData(await nationalityFilterRequest(activeNationality));
      }
      if (activeNationality !== 'All') {
        setRecipesData(await nationalityFilterRequest(activeNationality));
      }
    };
    getRecipes();
  }, [activeNationality]);
  return (
    <main>
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ ({ target }) => {
          setActiveNationality(target.value);
        } }
      >
        <option value="All">All</option>
        {nationalities.map((elem, index) => (
          <option
            data-testid={ `${elem.strArea}-option` }
            key={ index }
            name={ elem.strArea }
            value={ elem.strArea }
          >
            {elem.strArea}
          </option>
        ))}
      </select>
      {recipesData.map((elem, index) => (
        <Link
          data-testid={ `${index}-recipe-card` }
          key={ index }
          to={ `/foods/${elem.idMeal}` }
        >
          <section>
            <img
              className="image-card"
              data-testid={ `${index}-card-img` }
              src={ elem.strMealThumb }
              alt=" drink "
            />
            <h1 data-testid={ `${index}-card-name` }>
              {elem.strMeal}
            </h1>
          </section>
        </Link>
      ))}
    </main>
  );
}

export default ExploreNationalities;
