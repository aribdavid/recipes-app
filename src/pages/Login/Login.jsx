import React, { useState } from 'react';

const PASSWORD_MIN_LENGTH = 5;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableButton, buttonEnabler] = useState(true);

  const verifier = () => {
    const validateEmail = () => (
      email.split('').includes('@')
      && email.split('').includes('.')
      && email.split('.').includes('com')
    );
    const isEmailValid = validateEmail();
    if (password.length > PASSWORD_MIN_LENGTH && isEmailValid) {
      buttonEnabler(false);
    }
    if (password.length < PASSWORD_MIN_LENGTH || !isEmailValid) {
      buttonEnabler(true);
    }
  };

  return (
    <main>
      <form>
        <label htmlFor="email">
          Email
          <input
            name="email"
            type="email"
            data-testid="email-input"
            onChange={ ({ target }) => {
              setEmail(target.value);
              verifier();
            } }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            name="password"
            type="password"
            data-testid="password-input"
            onChange={ ({ target }) => {
              setPassword(target.value);
              verifier();
            } }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ disableButton }
          onClick={ () => {
            localStorage.setItem('mealsToken', 1);
            localStorage.setItem('cocktailsToken', 1);
          } }
        >
          Entrar

        </button>
      </form>
    </main>
  );
}

export default Login;
