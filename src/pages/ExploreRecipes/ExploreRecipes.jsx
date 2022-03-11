import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function ExploreRecipes() {
  const [pathname, setPathName] = useState('');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setPathName(location.pathname.split('/')[2]);
    console.log(pathname);
  }, []);

  return (
    <main className="explore-recipes-container">
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push(`/explore/${pathname}/ingredients`) }
      >
        By Ingredient
      </button>

      { pathname === 'foods' && (
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => history.push(`/explore/${pathname}/nationalities`) }
        >
          By Nationality
        </button>
      ) }

      <button
        type="button"
        data-testid="explore-surprise"
      >
        Surprise me!
      </button>
    </main>
  );
}

export default ExploreRecipes;
