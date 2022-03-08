import React from 'react';

function Login() {
  return (
    <main>
      <form>
        <label htmlFor="email">
          Email
          <input name="email" type="email" data-testid="email-input" />
        </label>
        <label htmlFor="password">
          Senha
          <input name="password" type="password" data-testid="password-input" />
        </label>
        <button type="submit" data-testid="login-submit-btn">Entrar</button>
      </form>
    </main>
  );
}

export default Login;
