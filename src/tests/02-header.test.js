import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

describe('Verifica os componentes do header', () => {
  it('Verifica se existe um header na página', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');

    const header = screen.getByRole('banner');

    expect(header).toBeInTheDocument();
  });

  it('Verifica se o header possui um icone de perfil', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');

    const profileBtn = screen.getByTestId('profile-top-btn');

    expect(profileBtn).toBeInTheDocument();
  });

  it('Verifica se o header possui um título da página', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');

    let pageTitle = screen.getByTestId('page-title');

    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Foods');

    history.push('/drinks');

    pageTitle = screen.getByTestId('page-title');

    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Drinks');
  });

  it('Verifica se o header possui um icone de pesquisar receita', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/foods');

    const searchBtn = screen.getByTestId('search-top-btn');

    expect(searchBtn).toBeInTheDocument();
  });
});
