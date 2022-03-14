import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import 'jest-localstorage-mock';

describe('Testa a tela principal de bebidas ou comidas', () => {
  it('Verifica se ao renderizar a tela de comidas, aparece 12 receitas', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const LENGTH = 12;
    const recipes = await screen.findAllByTestId(/recipe-card/i);
    expect(recipes).toHaveLength(LENGTH);
  });

  it('Verifica se ao renderizar a tela de bebidas, aparece 12 receitas', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/drinks');
    const LENGTH = 12;
    const recipes = await screen.findAllByTestId(/recipe-card/i);
    expect(recipes).toHaveLength(LENGTH);
  });

  it('Verifica se o card da receita está correto', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');
    const LENGTH = 12;
    const recipes = await screen.findAllByTestId(/recipe-card/i);
    expect(recipes).toHaveLength(LENGTH);
    const imageRecipe = screen.getByTestId('0-card-img');
    const titleRecipe = screen.getByTestId('0-card-name');
    const urlImage = 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg';

    expect(imageRecipe).toHaveProperty('src', urlImage);
    expect(titleRecipe.innerHTML).toBe('Corba');
  });
});
