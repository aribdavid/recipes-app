import React, { useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';

function MyProvider({ children }) {
  const [resultRecipes, setResultRecipes] = useState([]);
  const [detailsRecipe, setDetailsRecipe] = useState({});

  const state = {
    resultRecipes,
    setResultRecipes,
    detailsRecipe,
    setDetailsRecipe,
  };
  return (
    <myContext.Provider value={ state }>
      {children}
    </myContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default MyProvider;
