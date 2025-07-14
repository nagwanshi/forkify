import { API_URL } from './config';
import { getJson } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

// following function doesn't return anything just updates the state
export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.log(`${err} 🎉🎉🎉`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJson(`${API_URL}?search=${query}`);
    // console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    // console.log(state.search.results);
  } catch (err) {
    console.log(`${err} 🎉🎉🎉`);
    throw err;
  }
};

loadSearchResults('pizza');
