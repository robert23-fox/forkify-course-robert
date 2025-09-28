import { API_URL, KEY } from "./config.js";
import { AJAX } from "./helper.js";
import { RES_PER_PAGE } from "./config.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}`);
    state.recipe = createRecipeObject(data);

    // is it any of this recipe with this id in the bookmarks array? if so, state.recipe.bookmarked = true
    if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

    // console.log(state.recipe);
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};

export const loadSearchRecipes = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}?key=${KEY}`);
    // console.log(data.data);
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        imageUrl: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
        ...(rec.key && { key: rec.key }),
      };
    });
    // console.log(state.search.results);
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};

export const getSearchResultsPerPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resPerPage;
  const end = page * state.search.resPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  const initialServings = state.recipe.servings;
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / initialServings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add recipe to the bookmarks array
  state.bookmarks.push(recipe);
  // Mark recie as bookmarked;
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // Find the index of the current id
  const index = state.bookmarks.findIndex((bookmark) => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  // Mark recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        // const ingArr = ing[1].replaceAll(" ", "").split(",");
        const ingArr = ing[1].split(",").map((el) => el.trim());
        if (ingArr.length !== 3)
          throw new Error(
            "Wrong ingredient format! Please use the correct format"
          );

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.imageUrl,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe, "POST");

    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
