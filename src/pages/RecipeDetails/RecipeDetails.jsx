import React from 'react';

function RecipeDetails() {
  const ingredientes = ['um', 'dois'];
  const recomendados = ['um', 'dois'];
  return (
    <main>
      <img data-testid="recipe-photo" src="#" alt="imagem da receita" />
      <h1 data-testid="recipe-title">Titulo</h1>
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button data-testid="favorite-btn" type="button">Favoritar</button>
      <p data-testid="recipe-category">Categoria</p>

      <ul>
        { ingredientes.map((element, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ element }
          >
            { element }
          </li>
        )) }
      </ul>

      <p data-testid="instructions">Instruções</p>
      <video data-testid="video" width="320" height="240">
        <track
          kind="captions"
        />
        <source src="https://www.youtube.com/watch?v=ba3ASX6cx9M" />
      </video>

      <ul>
        { recomendados.map((element, index) => (
          <li
            data-testid={ `${index}-recomendation-card` }
            key={ element }
          >
            { element }
          </li>
        )) }
      </ul>

      <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
    </main>
  );
}

export default RecipeDetails;
