import React from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';

function MyProvider({ children }) {
  const state = {};
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
