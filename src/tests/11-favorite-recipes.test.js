import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import 'jest-localstorage-mock';
import favRecipes from './mocks/favRecipes';

const PATHNAME_FAVORITERECIPES = '/favorite-recipes';

describe('Testa a tela de receitas favoritas', () => {
  it('Testa se os botões de filtro estão na tela ', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push(PATHNAME_FAVORITERECIPES);
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    const buttonFood = screen.getByTestId('filter-by-food-btn');
    const buttonDrink = screen.getByTestId('filter-by-drink-btn');
    expect(buttonAll).toBeInTheDocument();
    expect(buttonFood).toBeInTheDocument();
    expect(buttonDrink).toBeInTheDocument();
  });

  it('Testa se as receitas estão na tela ', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favRecipes));
    history.push(PATHNAME_FAVORITERECIPES);
    const imagesRecipes = await screen.findAllByTestId(/horizontal-image/i);
    const textRecipes = await screen.findAllByTestId(/horizontal-top-text/i);
    const nameRecipes = await screen.findAllByTestId(/horizontal-name/i);
    const LENGTH_RECIPES = 3;
    expect(imagesRecipes).toHaveLength(LENGTH_RECIPES);
    expect(textRecipes).toHaveLength(LENGTH_RECIPES);
    expect(nameRecipes).toHaveLength(LENGTH_RECIPES);
  });

  it('aparece somente comidas ao clicar no botão de comidas', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favRecipes));
    history.push(PATHNAME_FAVORITERECIPES);
    const buttonFood = screen.getByTestId('filter-by-food-btn');
    userEvent.click(buttonFood);
    const imagesRecipes = await screen.findAllByTestId(/horizontal-image/i);
    const textRecipes = await screen.findAllByTestId(/horizontal-top-text/i);
    const nameRecipes = await screen.findAllByTestId(/horizontal-name/i);
    const LENGTH_RECIPES = 1;
    expect(imagesRecipes).toHaveLength(LENGTH_RECIPES);
    expect(textRecipes).toHaveLength(LENGTH_RECIPES);
    expect(nameRecipes).toHaveLength(LENGTH_RECIPES);
  });

  it('aparece somente bebidas ao clicar no botão de bebidas', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favRecipes));
    history.push(PATHNAME_FAVORITERECIPES);
    const buttonDrink = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(buttonDrink);
    const imagesRecipes = await screen.findAllByTestId(/horizontal-image/i);
    const textRecipes = await screen.findAllByTestId(/horizontal-top-text/i);
    const nameRecipes = await screen.findAllByTestId(/horizontal-name/i);
    const LENGTH_RECIPES = 2;
    expect(imagesRecipes).toHaveLength(LENGTH_RECIPES);
    expect(textRecipes).toHaveLength(LENGTH_RECIPES);
    expect(nameRecipes).toHaveLength(LENGTH_RECIPES);
  });

  it('aparece todas as receitas ao clicar no botão de "All"', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favRecipes));
    history.push(PATHNAME_FAVORITERECIPES);
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    userEvent.click(buttonAll);
    const imagesRecipes = await screen.findAllByTestId(/horizontal-image/i);
    const textRecipes = await screen.findAllByTestId(/horizontal-top-text/i);
    const nameRecipes = await screen.findAllByTestId(/horizontal-name/i);
    const LENGTH_RECIPES = 3;
    expect(imagesRecipes).toHaveLength(LENGTH_RECIPES);
    expect(textRecipes).toHaveLength(LENGTH_RECIPES);
    expect(nameRecipes).toHaveLength(LENGTH_RECIPES);
  });
});
