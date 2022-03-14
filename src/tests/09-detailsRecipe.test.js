import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import 'jest-localstorage-mock';

describe('Testa a tela de detalhes de bebida e comida', () => {
  it('Todos os componentes estão na tela de comidas', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods/52977');
    const recipeImage = await screen.findByTestId('recipe-photo');
    const recipeTitle = await screen.findByTestId('recipe-title');
    const shareBtn = await screen.findByTestId('share-btn');
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    const ingredients = await screen.findAllByTestId(/ingredient-name-and-measure/i);
    const instructions = await screen.findByTestId('instructions');
    const video = await screen.findByTestId('video');
    const startRecipe = await screen.findByTestId('start-recipe-btn');
    const recommendationCard = await screen.findAllByTestId(/0-recomendation-card/i);

    expect(recipeImage).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    ingredients.forEach((element) => expect(element).toBeInTheDocument());
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(startRecipe).toBeInTheDocument();
    recommendationCard.forEach((element) => expect(element).toBeInTheDocument());
  });

  /*   it('Verifica o botão de compartilhar', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods/52977');
    const copy = jest.spyOn(window, 'execCommand');
    const shareBtn = await screen.findByTestId('share-btn');
    userEvent.click(shareBtn);
    expect(copy).toHaveBeenCalledWith('copy');
    expect(shareBtn.innerHTML).toBe('Link copied!');
  }); */

  it('Verifica o botão de favoritar ', async () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods/52977');
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(favoriteBtn);
  });

  it(
    'Verifica se clicar em "Start recipe", é redirecionado para a pagina correta',
    async () => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/foods/52977');
      const startRecipe = await screen.findByTestId('start-recipe-btn');
      userEvent.click(startRecipe);
      const { pathname } = history.location;
      expect(pathname).toBe('/foods/52977/in-progress');
    },
  );
});
