import * as model from './model';

import 'core-js/stable'; // poly fill evee=rything else
import regeneratorRuntime from 'regenerator-runtime'; // polyfilling async await

import recipeView from './views/recipeView';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

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
    await model.loadSearchResults('pizza');
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

controlSearchResults();

// showRecipe();
// window.addEventListener('hashchange', showRecipe);

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
