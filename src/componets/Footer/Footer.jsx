import React from 'react';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './style.css';

function Footer() {
  return (
    <footer className="footer-container" data-testid="footer">
      <button type="button">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink icon"
        />
      </button>

      <button type="button">
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explore icon"
        />
      </button>

      <button type="button">
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="explore icon"
        />
      </button>
    </footer>
  );
}

export default Footer;
