import * as model from './model';

import 'core-js/stable'; // poly fill evee=rything else
import regeneratorRuntime from 'regenerator-runtime'; // polyfilling async await

import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 1. load recipe data
    await model.loadRecipe(id);

    // 2. Render Reccipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1. get search query
    let query = searchView.getQuery();
    if (!query) return;

    // 2. Load search results
    await model.loadSearchResults(query);

    // 3. Render search results
    // console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

// showRecipe();
// window.addEventListener('hashchange', showRecipe);

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
