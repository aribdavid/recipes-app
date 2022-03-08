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
import Header from './componets/Header/Header';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />

      <Route exact path="/foods">
        <Header title="foods" searchBtn />
        <Foods />
      </Route>

      <Route exact path="/drinks">
        <Header title="drinks" searchBtn />
        <Drinks />
      </Route>

      <Route exact path="/foods/:id" component={ RecipeDetails } />

      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/foods/:id/in-progress" component={ RecipeInProgress } />

      <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />

      <Route exact path="/explore">
        <Header title="Explore" />
        <Explore />
      </Route>

      <Route exact path="/explore/foods">
        <Header title="Explore Foods" />
        <ExploreRecipes />
      </Route>

      <Route exact path="/explore/drinks">
        <Header title="Explore Drinks" />
        <ExploreRecipes />
      </Route>

      <Route exact path="/explore/foods/ingredients">
        <Header title="Explore Ingredients" />
        <ExploreIngredients />
      </Route>

      <Route exact path="/explore/drinks/ingredients">
        <Header title="Explore Ingredients" />
        <ExploreIngredients />
      </Route>

      <Route exact path="/explore/foods/nationalities">
        <Header title="Explore Nationalities" searchBtn />
        <ExploreNationalities />
      </Route>

      <Route exact path="/profile">
        <Header title="Profile" />
        <Profile />
      </Route>

      <Route exact path="/done-recipes">
        <Header title="Done Recipes" />
        <DoneRecipes />
      </Route>

      <Route exact path="/favorite-recipes">
        <Header title="Favorite Recipes" />
        <FavoritesRecipes />
      </Route>
      <Route exact path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
