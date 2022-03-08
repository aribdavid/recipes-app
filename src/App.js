import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login/Login';
import Foods from './pages/Foods/Foods';
import Drinks from './pages/Drinks/Drinks';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress/RecipeInProgress';
import Explore from './pages/Explore/Explore';
import ExploreRecipes from './pages/ExploreRecipes/ExploreRecipes';
import ExploreIngredients from './pages/ExploreIngredients/ExploreIngredients';
import ExploreNationalities from './pages/ExploreNationalities/ExploreNationalities';
import Profile from './pages/Profile/Profile';
import DoneRecipes from './pages/DoneRecipes/DoneRecipes';
import FavoritesRecipes from './pages/FavoritesRecipes/FavoritesRecipes';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/foods/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/foods/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreRecipes } />
      <Route exact path="/explore/drinks" component={ ExploreRecipes } />
      <Route exact path="/explore/foods/ingredients" component={ ExploreIngredients } />
      <Route exact path="/explore/drinks/ingredients" component={ ExploreIngredients } />

      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreNationalities }
      />

      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoritesRecipes } />
      <Route exact path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
