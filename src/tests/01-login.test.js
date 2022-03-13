import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouterAndContext';

const email = 'teste@teste.com';
const password = '12345678910';

describe('Testa os inputs', () => {
  beforeEach(() => {
    renderWithRouterAndContext(<App />);
  });

  it('Verifica se existe um input de email e senha', () => {
    const inputEmail = screen.getByLabelText(/email/i);
    const inputPassword = screen.getByLabelText(/Senha/i);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  it('Verifica se é possivel digitar nos inputs', () => {
    const inputEmail = screen.getByLabelText(/email/i);
    const inputPassword = screen.getByLabelText(/Senha/i);

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, password);

    expect(inputEmail.value).toBe(email);
    expect(inputPassword.value).toBe(password);
  });
});

describe('Testa o botão de fazer login', () => {
  beforeAll(() => {
    // Peguei desse link esse trecho de código para retirar console.error : Not implemented: window.computedStyle(elt, pseudoElt)
    // link: https://github.com/nickcolley/jest-axe/issues/147

    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);
  });

  beforeEach(() => {
    renderWithRouterAndContext(<App />);
  });

  it('Verifica se existe um botão de fazer login', () => {
    const buttonLogin = screen.getByRole('button', { name: /Entrar/i });

    expect(buttonLogin).toBeInTheDocument();
  });

  it('Verifica se o botão está desabilitado ao entrar na página', () => {
    const buttonLogin = screen.getByRole('button', { name: /Entrar/i });

    expect(buttonLogin).toHaveProperty('disabled', true);
  });
});

describe('Verifica se só é possivel fazer login com os valores corretos', () => {
  it(
    'Verifica se colocar o email incorreto o botão de login continua desabilitado',
    () => {
      renderWithRouterAndContext(<App />);

      const incorretEmail = 'teste@teste';
      const inputEmail = screen.getByLabelText(/Email/i);
      const inputPassword = screen.getByLabelText(/Senha/i);
      const buttonLogin = screen.getByRole('button', { name: /Entrar/i });

      userEvent.type(inputEmail, incorretEmail);
      userEvent.type(inputPassword, password);

      expect(buttonLogin).toHaveProperty('disabled', true);
    },
  );

  it(
    'Verifica se colocar a senha incorreta o botão de login continua desabilitado',
    () => {
      renderWithRouterAndContext(<App />);

      const incorretPassword = '123456';
      const inputEmail = screen.getByLabelText(/Email/i);
      const inputPassword = screen.getByLabelText(/Senha/i);
      const buttonLogin = screen.getByRole('button', { name: /Entrar/i });

      userEvent.type(inputEmail, email);
      userEvent.type(inputPassword, incorretPassword);

      expect(buttonLogin).toHaveProperty('disabled', true);
    },
  );

  it(
    'Verifica se colocar o email e senha corretas o botão de login habilita',
    () => {
      renderWithRouterAndContext(<App />);

      const inputEmail = screen.getByLabelText(/Email/i);
      const inputPassword = screen.getByLabelText(/Senha/i);
      const buttonLogin = screen.getByRole('button', { name: /Entrar/i });

      userEvent.type(inputEmail, email);
      userEvent.type(inputPassword, password);

      expect(buttonLogin).toHaveProperty('disabled', false);
    },
  );

  it(
    'Verifica se é redirecionado para a página /foods ao fazer login',
    () => {
      const { history } = renderWithRouterAndContext(<App />);

      const inputEmail = screen.getByLabelText(/Email/i);
      const inputPassword = screen.getByLabelText(/Senha/i);
      const buttonLogin = screen.getByRole('button', { name: /Entrar/i });

      userEvent.type(inputEmail, email);
      userEvent.type(inputPassword, password);
      userEvent.click(buttonLogin);

      expect(history.location.pathname).toBe('/foods');
    },
  );
});
