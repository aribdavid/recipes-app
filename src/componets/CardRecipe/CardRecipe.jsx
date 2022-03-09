import React from 'react';
import PropTypes from 'prop-types';

function CardRecipe({ index, image, name }) {
  return (
    <section data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ image }
        alt=" drink "
      />
      <h1 data-testid={ `${index}-card-name` }>
        {name}
      </h1>
    </section>
  );
}

CardRecipe.propTypes = {
  index: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default CardRecipe;
