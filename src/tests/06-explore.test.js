import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

describe('Testa a tela explore', () => {
  it('Testa se o botão de comidas redireciona para a /explore/foods', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore');

    const btnFoods = screen.getByTestId('explore-foods');
    userEvent.click(btnFoods);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/foods');
  });

  it('Testa se o botão de bebidas redireciona para a /explore/drinks', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore');

    const btnDrinks = screen.getByTestId('explore-drinks');
    userEvent.click(btnDrinks);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/drinks');
  });

  it(`Testa se o botão de ingredientes redireciona para a /explore/foods/ingredients na 
  tela de explorar comidas`, () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/explore/foods');

    const btnIngredients = screen.getByTestId('explore-by-ingredient');
    userEvent.click(btnIngredients);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/foods/ingredients');
  });
});
