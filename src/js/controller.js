import * as model from './model';

import 'core-js/stable'; // poly fill evee=rything else
import regeneratorRuntime from 'regenerator-runtime'; // polyfilling async await

import recipeView from './views/recipeView';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    alert(err);
  }
};

// showRecipe();
// window.addEventListener('hashchange', showRecipe);

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
